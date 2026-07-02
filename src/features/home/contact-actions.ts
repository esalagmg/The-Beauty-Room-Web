"use server";

import { z } from "zod";
import { notifyOwnerMessage } from "@/lib/notify";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  interest: z.enum(["salon", "clinic", "bridal", "other"]),
  message: z.string().min(5).max(2000),
  // Honeypot — real users never fill this; bots often do. Accept any value
  // here (a `max(0)` would make a filled honeypot FAIL validation and return
  // an error — tipping off bots); the filled case is handled silently below.
  company: z.string().optional(),
});

export type InquiryResult = { ok: true } | { ok: false; error: string };

const INTEREST_LABEL: Record<string, string> = {
  salon: "Salon",
  clinic: "Aesthetic Clinic",
  bridal: "Bridal",
  other: "Other",
};

/** Handle a website enquiry: notify the owner by email + Telegram. */
export async function sendInquiry(raw: unknown): Promise<InquiryResult> {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }
  const d = parsed.data;

  // Honeypot filled → silently accept (don't tip off bots) but do nothing.
  if (d.company) return { ok: true };

  const subject = `New website enquiry — ${d.name} (${INTEREST_LABEL[d.interest]})`;
  const body =
    `Name: ${d.name}\n` +
    `Phone: ${d.phone}\n` +
    `Email: ${d.email}\n` +
    `Interested in: ${INTEREST_LABEL[d.interest]}\n\n` +
    `${d.message}`;

  try {
    await notifyOwnerMessage(subject, body);
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't send right now — please WhatsApp us." };
  }
}
