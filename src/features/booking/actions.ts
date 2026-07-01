"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { notifyOwnerNewBooking, sendCustomerEmail } from "@/lib/notify";
import { siteConfig } from "@/constants/site";

const schema = z.object({
  division: z.enum(["salon", "clinic"]),
  treatmentId: z.string().min(1),
  specialistId: z.string().nullish(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{1,2}:\d{2}$/),
  firstName: z.string().min(1).max(80),
  lastName: z.string().max(80).optional().default(""),
  email: z.string().email().or(z.literal("")).optional(),
  phone: z.string().min(6).max(30),
  notes: z.string().max(1000).optional().default(""),
});

export type BookingInput = z.infer<typeof schema>;

export type BookingResult =
  | { ok: true; reference: string }
  | { ok: false; reason: "slot_taken" | "invalid" | "error"; message: string };

const SL_OFFSET = "+05:30"; // Sri Lanka, no DST

function toRange(date: string, time: string, durationMin: number) {
  const [h, m] = time.split(":").map(Number);
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const start = new Date(`${date}T${hh}:${mm}:00${SL_OFFSET}`);
  const end = new Date(start.getTime() + durationMin * 60000);
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

export async function submitBooking(raw: BookingInput): Promise<BookingResult> {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, reason: "invalid", message: "Please check your details." };
  }
  const input = parsed.data;

  // Demo mode (no database configured) — let the wizard complete gracefully.
  if (!isSupabaseConfigured) {
    return { ok: true, reference: "DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase() };
  }

  const db = createAdminClient();
  if (!db) return { ok: false, reason: "error", message: "Booking is temporarily unavailable." };

  // 1. Resolve the treatment (duration + price snapshot + branch).
  const { data: treatment } = await db
    .from("treatments")
    .select("id, branch_id, division, name, duration_minutes, price_label, price_amount, online_booking_enabled, is_active")
    .eq("id", input.treatmentId)
    .maybeSingle();

  if (!treatment || !treatment.is_active || !treatment.online_booking_enabled) {
    return { ok: false, reason: "invalid", message: "That treatment isn't available to book online." };
  }

  // 2. Assign a staff member (keeps the double-booking guard active).
  let staffId = input.specialistId && input.specialistId !== "any" ? input.specialistId : null;
  if (!staffId) {
    const { data: link } = await db
      .from("treatment_specialists")
      .select("staff_id")
      .eq("treatment_id", treatment.id)
      .limit(1)
      .maybeSingle();
    staffId = link?.staff_id ?? null;
    if (!staffId) {
      const { data: anyStaff } = await db
        .from("staff")
        .select("id")
        .eq("branch_id", treatment.branch_id)
        .eq("is_active", true)
        .order("display_order")
        .limit(1)
        .maybeSingle();
      staffId = anyStaff?.id ?? null;
    }
  }

  const { startsAt, endsAt } = toRange(input.date, input.time, treatment.duration_minutes);

  // 3. Save the customer.
  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const { data: customer } = await db
    .from("customers")
    .insert({
      branch_id: treatment.branch_id,
      full_name: fullName,
      phone: input.phone,
      whatsapp: input.phone,
      email: input.email || null,
      notes: input.notes || null,
    })
    .select("id")
    .single();

  // 4. Create the booking (exclusion constraint blocks overlaps atomically).
  const { data: booking, error } = await db
    .from("bookings")
    .insert({
      branch_id: treatment.branch_id,
      customer_id: customer?.id ?? null,
      treatment_id: treatment.id,
      staff_id: staffId,
      division: input.division,
      starts_at: startsAt,
      ends_at: endsAt,
      status: "requested",
      channel: "website",
      price_label: treatment.price_label,
      price_amount: treatment.price_amount,
      customer_notes: input.notes || null,
    })
    .select("id, reference")
    .single();

  if (error) {
    // 23P01 = exclusion_violation (slot already taken for that staff member)
    if ((error as { code?: string }).code === "23P01") {
      return { ok: false, reason: "slot_taken", message: "That time was just taken — please choose another." };
    }
    return { ok: false, reason: "error", message: "Something went wrong. Please try again or WhatsApp us." };
  }

  // 5. Audit event (best-effort).
  await db.from("booking_events").insert({
    booking_id: booking.id,
    to_status: "requested",
    actor: "customer",
    message: "Booking requested via website",
  });

  // 6. Notify the owner (best-effort, non-blocking).
  const whenLabel = new Date(startsAt).toLocaleString("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  await notifyOwnerNewBooking({
    reference: booking.reference,
    customerName: fullName,
    phone: input.phone,
    treatment: treatment.name,
    division: input.division === "salon" ? "Salon" : "Aesthetic Clinic",
    when: whenLabel,
    specialist: staffId ? undefined : "Any",
    notes: input.notes || undefined,
  });

  // 7. Confirmation email to the customer (best-effort, only if they gave one).
  if (input.email) {
    await sendCustomerEmail({
      to: input.email,
      name: input.firstName || "there",
      treatment: treatment.name,
      when: whenLabel,
      reference: booking.reference,
      kind: "requested",
      whatsappHref: siteConfig.contact.whatsappHref,
    });
  }

  return { ok: true, reference: booking.reference };
}
