"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { sendCustomerEmail } from "@/lib/notify";
import { siteConfig } from "@/constants/site";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function num(v: FormDataEntryValue | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Revalidate the public catalog pages after any catalog edit. */
function revalidatePublic() {
  ["/", "/salon", "/clinic", "/booking"].forEach((p) => revalidatePath(p));
}

export async function signOut() {
  const supabase = await createServerSupabase();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function upsertTreatment(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;

  const id = (formData.get("id") as string) || null;
  const categoryId = formData.get("category_id") as string;
  const name = String(formData.get("name") ?? "").trim();

  const { data: cat } = await supabase
    .from("categories")
    .select("division, branch_id")
    .eq("id", categoryId)
    .single();

  const row = {
    category_id: categoryId,
    division: cat?.division,
    branch_id: cat?.branch_id,
    name,
    short_description: String(formData.get("short_description") ?? "") || null,
    duration_minutes: num(formData.get("duration_minutes")) ?? 60,
    price_amount: num(formData.get("price_amount")),
    price_label: String(formData.get("price_label") ?? "") || null,
    discounted_amount: num(formData.get("discounted_amount")),
    image: String(formData.get("image") ?? "") || null,
    display_order: num(formData.get("display_order")) ?? 0,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on",
    online_booking_enabled: formData.get("online_booking_enabled") === "on",
  };

  if (id) {
    await supabase.from("treatments").update(row).eq("id", id);
  } else {
    await supabase
      .from("treatments")
      .insert({ ...row, slug: `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}` });
  }

  revalidatePublic();
  revalidatePath("/admin/treatments");
  redirect("/admin/treatments");
}

export async function deleteTreatment(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;
  const id = formData.get("id") as string;
  await supabase.from("treatments").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/treatments");
}

export async function toggleTreatmentActive(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;
  const id = formData.get("id") as string;
  const active = formData.get("active") === "true";
  await supabase.from("treatments").update({ is_active: active }).eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/treatments");
}

/* ── Staff / specialists ─────────────────────────────────────────── */

export async function upsertStaff(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;

  const id = (formData.get("id") as string) || null;
  const name = String(formData.get("name") ?? "").trim();

  const { data: branch } = await supabase.from("branches").select("id").limit(1).single();

  const specialties = String(formData.get("specialties") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const scope = String(formData.get("division_scope") ?? "both");

  const row = {
    branch_id: branch?.id,
    name,
    role: String(formData.get("role") ?? "") || null,
    bio: String(formData.get("bio") ?? "") || null,
    experience_label: String(formData.get("experience_label") ?? "") || null,
    image: String(formData.get("image") ?? "") || null,
    instagram: String(formData.get("instagram") ?? "") || null,
    specialties,
    division_scope: ["salon", "clinic", "both"].includes(scope) ? scope : "both",
    display_order: num(formData.get("display_order")) ?? 0,
    is_active: formData.get("is_active") === "on",
    online_booking_enabled: formData.get("online_booking_enabled") === "on",
  };

  if (id) {
    await supabase.from("staff").update(row).eq("id", id);
  } else {
    await supabase.from("staff").insert(row);
  }

  revalidatePublic();
  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function deleteStaff(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;
  const id = formData.get("id") as string;
  await supabase.from("staff").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/staff");
}

export async function toggleStaffActive(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;
  const id = formData.get("id") as string;
  const active = formData.get("active") === "true";
  await supabase.from("staff").update({ is_active: active }).eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/staff");
}

export async function upsertCategory(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;

  const id = (formData.get("id") as string) || null;
  const name = String(formData.get("name") ?? "").trim();

  // attach to the (single) branch
  const { data: branch } = await supabase.from("branches").select("id").limit(1).single();

  const row = {
    branch_id: branch?.id,
    division: formData.get("division") as string,
    name,
    tagline: String(formData.get("tagline") ?? "") || null,
    description: String(formData.get("description") ?? "") || null,
    image: String(formData.get("image") ?? "") || null,
    display_order: num(formData.get("display_order")) ?? 0,
    is_active: formData.get("is_active") === "on",
  };

  if (id) {
    await supabase.from("categories").update(row).eq("id", id);
  } else {
    await supabase.from("categories").insert({ ...row, slug: `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}` });
  }

  revalidatePublic();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

const SL_OFFSET = "+05:30";
function toRange(date: string, time: string, durationMin: number) {
  const [h, m] = time.split(":").map(Number);
  const start = new Date(
    `${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00${SL_OFFSET}`,
  );
  const end = new Date(start.getTime() + durationMin * 60000);
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

/** Owner proposes a new date/time; generates a customer confirmation token. */
export async function proposeReschedule(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;

  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const message = (formData.get("message") as string) || null;
  if (!id || !date || !time) return;

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, treatment_id, status")
    .eq("id", id)
    .single();

  let duration = 60;
  if (booking?.treatment_id) {
    const { data: tr } = await supabase
      .from("treatments")
      .select("duration_minutes")
      .eq("id", booking.treatment_id)
      .single();
    duration = tr?.duration_minutes ?? 60;
  }

  const { startsAt, endsAt } = toRange(date, time, duration);
  const token = crypto.randomUUID().replace(/-/g, "");
  const expires = new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString();

  const { error } = await supabase
    .from("bookings")
    .update({
      starts_at: startsAt,
      ends_at: endsAt,
      status: "reschedule_proposed",
      internal_notes: message,
    })
    .eq("id", id);
  if (error) return; // overlap or other issue — owner picks another slot

  // invalidate older tokens, issue a fresh one
  await supabase.from("booking_tokens").update({ used_at: new Date().toISOString() }).eq("booking_id", id).is("used_at", null);
  await supabase.from("booking_tokens").insert({
    booking_id: id,
    token,
    purpose: "reschedule",
    expires_at: expires,
  });
  await supabase.from("booking_events").insert({
    booking_id: id,
    from_status: booking?.status ?? null,
    to_status: "reschedule_proposed",
    actor: "owner",
    message: message ?? "Reschedule proposed",
  });

  revalidatePath("/admin/bookings");
}

export async function updateBooking(formData: FormData) {
  const supabase = await createServerSupabase();
  if (!supabase) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const message = (formData.get("message") as string) || null;

  const { data: current } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", id)
    .single();

  await supabase.from("bookings").update({ status }).eq("id", id);
  await supabase.from("booking_events").insert({
    booking_id: id,
    from_status: current?.status ?? null,
    to_status: status,
    actor: "owner",
    message,
  });

  // Email the customer when their appointment is confirmed.
  if (status === "confirmed") {
    const { data: b } = await supabase
      .from("bookings")
      .select("reference, starts_at, customers(full_name, email), treatments(name)")
      .eq("id", id)
      .single();
    const cust = b?.customers as { full_name?: string; email?: string } | null;
    if (b && cust?.email) {
      await sendCustomerEmail({
        to: cust.email,
        name: cust.full_name || "there",
        treatment:
          (b.treatments as { name?: string } | null)?.name || "your appointment",
        when: new Date(b.starts_at).toLocaleString("en-GB", {
          timeZone: "Asia/Colombo",
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        reference: b.reference,
        kind: "confirmed",
        whatsappHref: siteConfig.contact.whatsappHref,
      });
    }
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}
