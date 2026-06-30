"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyOwnerMessage } from "@/lib/notify";

const DECISIONS: Record<string, { status: string; label: string }> = {
  accept: { status: "confirmed", label: "accepted the new time" },
  change: { status: "customer_requested_change", label: "asked for a different time" },
  cancel: { status: "cancelled", label: "cancelled the appointment" },
};

export async function respondToReschedule(formData: FormData) {
  const token = formData.get("token") as string;
  const decision = formData.get("decision") as string;
  const choice = DECISIONS[decision];
  if (!token || !choice) return;

  const db = createAdminClient();
  if (!db) return;

  const { data: tk } = await db
    .from("booking_tokens")
    .select("id, booking_id, used_at, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (!tk || tk.used_at || new Date(tk.expires_at) < new Date()) {
    redirect(`/b/${token}?r=expired`);
  }

  const { data: current } = await db
    .from("bookings")
    .select("status, customers(full_name)")
    .eq("id", tk.booking_id)
    .single();

  await db.from("bookings").update({ status: choice.status }).eq("id", tk.booking_id);
  await db.from("booking_tokens").update({ used_at: new Date().toISOString() }).eq("id", tk.id);
  await db.from("booking_events").insert({
    booking_id: tk.booking_id,
    from_status: current?.status ?? null,
    to_status: choice.status,
    actor: "customer",
    message: `Customer ${choice.label}`,
  });

  const name =
    (current?.customers as { full_name?: string } | null)?.full_name ?? "A customer";
  await notifyOwnerMessage(
    `Booking update — ${name}`,
    `${name} ${choice.label}.`,
  );

  redirect(`/b/${token}?r=${decision}`);
}
