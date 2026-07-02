import type { Metadata } from "next";
import { Check, Clock, MessageCircle } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/constants/site";
import { respondToReschedule } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Confirm your appointment",
  robots: { index: false, follow: false },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const THANKYOU: Record<string, { title: string; body: string }> = {
  accept: { title: "Confirmed", body: "Your appointment is confirmed. We can’t wait to see you." },
  change: { title: "Noted", body: "Thanks, we’ll be in touch on WhatsApp to find a better time." },
  cancel: { title: "Cancelled", body: "Your appointment has been cancelled. We hope to see you another time." },
  expired: { title: "Link expired", body: "This link has expired or was already used. Please message us on WhatsApp." },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-champagne-gradient px-6 py-16">
      <div className="grain" />
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="flex justify-center text-graphite">
          <Wordmark href="/" size="md" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default async function ConfirmPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { token } = await params;
  const { r } = await searchParams;

  if (r && THANKYOU[r]) {
    const t = THANKYOU[r];
    return (
      <Shell>
        <div className="mt-10 rounded-[28px] border border-stone/40 bg-white/60 p-8 backdrop-blur">
          {r === "accept" && (
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-cream">
              <Check className="h-8 w-8" />
            </div>
          )}
          <h1 className="font-serif text-3xl font-light text-graphite">{t.title}</h1>
          <p className="mt-3 text-pretty text-charcoal/75">{t.body}</p>
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-graphite px-7 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-cream hover:bg-ink"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </Shell>
    );
  }

  const db = createAdminClient();
  const tk = db
    ? (
        await db
          .from("booking_tokens")
          .select("booking_id, used_at, expires_at")
          .eq("token", token)
          .maybeSingle()
      ).data
    : null;
  const valid = tk && !tk.used_at && new Date(tk.expires_at) > new Date();

  if (!valid || !db) {
    const t = THANKYOU.expired;
    return (
      <Shell>
        <div className="mt-10 rounded-[28px] border border-stone/40 bg-white/60 p-8 backdrop-blur">
          <h1 className="font-serif text-3xl font-light text-graphite">{t.title}</h1>
          <p className="mt-3 text-pretty text-charcoal/75">{t.body}</p>
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-graphite px-7 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-cream hover:bg-ink"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </Shell>
    );
  }

  const { data: booking } = await db
    .from("bookings")
    .select("reference, starts_at, division, treatments(name), customers(full_name)")
    .eq("id", tk.booking_id)
    .single();

  const treatment = (booking?.treatments as { name?: string } | null)?.name ?? "your appointment";
  const name = (booking?.customers as { full_name?: string } | null)?.full_name ?? "there";

  return (
    <Shell>
      <p className="mt-8 font-sans text-[0.62rem] uppercase tracking-luxe text-gold-deep">
        Proposed appointment
      </p>
      <div className="mt-4 rounded-[28px] border border-stone/40 bg-white/60 p-8 backdrop-blur">
        <p className="text-charcoal/75">Hi {name}, we’d love to see you for</p>
        <p className="mt-2 font-serif text-2xl font-light text-graphite">{treatment}</p>
        <p className="mt-4 flex items-center justify-center gap-2 font-serif text-xl italic text-gold-deep">
          <Clock className="h-4 w-4" /> {booking ? fmt(booking.starts_at) : ""}
        </p>

        <div className="mt-7 space-y-3">
          <form action={respondToReschedule}>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="decision" value="accept" />
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream hover:bg-gold-deep">
              <Check className="h-4 w-4" /> Accept this time
            </button>
          </form>
          <div className="flex gap-3">
            <form action={respondToReschedule} className="flex-1">
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="decision" value="change" />
              <button className="w-full rounded-full border border-graphite/30 py-3.5 font-sans text-[0.68rem] uppercase tracking-wide2 text-graphite hover:border-graphite">
                Another time
              </button>
            </form>
            <form action={respondToReschedule} className="flex-1">
              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="decision" value="cancel" />
              <button className="w-full rounded-full border border-graphite/30 py-3.5 font-sans text-[0.68rem] uppercase tracking-wide2 text-charcoal/70 hover:border-red-300 hover:text-red-600">
                Cancel
              </button>
            </form>
          </div>
        </div>
        <p className="mt-5 text-[0.65rem] text-taupe">Ref · {booking?.reference}</p>
      </div>
    </Shell>
  );
}
