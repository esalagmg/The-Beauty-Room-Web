import { CalendarClock, MessageCircle, Send } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/supabase/config";
import { StatusPill, waNumber } from "@/features/admin/status-pill";
import { proposeReschedule, updateBooking } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Booking {
  id: string;
  reference: string;
  status: string;
  starts_at: string;
  customer_notes: string | null;
  price_label: string | null;
  treatments: { name: string } | null;
  staff: { name: string } | null;
  customers: { full_name: string; phone: string | null } | null;
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "requested", label: "Requests" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function ActionButton({
  id,
  status,
  label,
  tone = "default",
}: {
  id: string;
  status: string;
  label: string;
  tone?: "default" | "primary" | "danger";
}) {
  const cls =
    tone === "primary"
      ? "bg-graphite text-cream hover:bg-ink"
      : tone === "danger"
        ? "border border-stone/60 text-charcoal/70 hover:border-red-300 hover:text-red-600"
        : "border border-stone/60 text-charcoal/70 hover:border-graphite";
  return (
    <form action={updateBooking}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        className={`rounded-full px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 transition-colors ${cls}`}
      >
        {label}
      </button>
    </form>
  );
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status ?? "all";

  const supabase = await createServerSupabase();
  if (!supabase) return null;

  let query = supabase
    .from("bookings")
    .select(
      "id, reference, status, starts_at, customer_notes, price_label, treatments(name), staff(name), customers(full_name, phone)",
    );

  if (filter !== "all") query = query.eq("status", filter);

  const { data } = await query.order("starts_at", { ascending: true });
  const bookings = (data ?? []) as unknown as Booking[];

  // confirmation tokens for any reschedule-proposed bookings
  const proposedIds = bookings
    .filter((b) => b.status === "reschedule_proposed")
    .map((b) => b.id);
  const tokenMap = new Map<string, string>();
  if (proposedIds.length) {
    const { data: toks } = await supabase
      .from("booking_tokens")
      .select("booking_id, token")
      .in("booking_id", proposedIds)
      .is("used_at", null);
    (toks ?? []).forEach((t: { booking_id: string; token: string }) =>
      tokenMap.set(t.booking_id, t.token),
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-graphite">Bookings</h1>
      <p className="mt-1 font-sans text-sm text-taupe">
        Accept, decline or reschedule appointment requests.
      </p>

      {/* filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <a
            key={f.key}
            href={f.key === "all" ? "/admin/bookings" : `/admin/bookings?status=${f.key}`}
            className={`rounded-full px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 transition-colors ${
              filter === f.key
                ? "bg-graphite text-cream"
                : "border border-stone/60 text-charcoal/70 hover:border-graphite"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {bookings.length === 0 ? (
          <p className="rounded-[24px] border border-stone/40 bg-white/60 p-8 text-center font-sans text-sm text-taupe">
            No bookings here yet.
          </p>
        ) : (
          bookings.map((b) => {
            const wa = waNumber(b.customers?.phone);
            return (
              <div
                key={b.id}
                className="rounded-[24px] border border-stone/40 bg-white/60 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-serif text-xl text-graphite">
                        {b.customers?.full_name ?? "Guest"}
                      </p>
                      <StatusPill status={b.status} />
                    </div>
                    <p className="mt-1 font-sans text-sm text-charcoal/75">
                      {b.treatments?.name ?? "—"}
                      {b.price_label ? ` · ${b.price_label}` : ""}
                    </p>
                    <p className="mt-0.5 font-sans text-[0.72rem] text-taupe">
                      {fmt(b.starts_at)} · {b.staff?.name ?? "Any specialist"} ·{" "}
                      {b.reference}
                    </p>
                    {b.customer_notes && (
                      <p className="mt-2 rounded-xl bg-cream px-3 py-2 font-sans text-[0.72rem] text-charcoal/70">
                        “{b.customer_notes}”
                      </p>
                    )}
                  </div>

                  {wa && (
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-graphite px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-cream"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  )}
                </div>

                {/* actions */}
                <div className="mt-4 flex flex-wrap gap-2 border-t border-stone/30 pt-4">
                  {(b.status === "requested" ||
                    b.status === "reschedule_proposed") && (
                    <>
                      <ActionButton id={b.id} status="confirmed" label="Accept" tone="primary" />
                      <ActionButton id={b.id} status="declined" label="Decline" tone="danger" />
                    </>
                  )}
                  {b.status === "confirmed" && (
                    <>
                      <ActionButton id={b.id} status="completed" label="Mark completed" tone="primary" />
                      <ActionButton id={b.id} status="no_show" label="No-show" />
                      <ActionButton id={b.id} status="cancelled" label="Cancel" tone="danger" />
                    </>
                  )}
                  {(b.status === "completed" ||
                    b.status === "cancelled" ||
                    b.status === "declined" ||
                    b.status === "no_show") && (
                    <ActionButton id={b.id} status="confirmed" label="Reopen" />
                  )}

                  {/* Reschedule proposal */}
                  {(b.status === "requested" ||
                    b.status === "confirmed" ||
                    b.status === "reschedule_proposed") && (
                    <details className="w-full">
                      <summary className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-stone/60 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite">
                        <CalendarClock className="h-3.5 w-3.5" /> Reschedule
                      </summary>
                      <form
                        action={proposeReschedule}
                        className="mt-3 flex flex-wrap items-end gap-2"
                      >
                        <input type="hidden" name="id" value={b.id} />
                        <input
                          name="date"
                          type="date"
                          required
                          className="rounded-xl border border-stone/50 bg-white px-3 py-2 font-sans text-sm text-graphite outline-none focus:border-gold"
                        />
                        <input
                          name="time"
                          type="time"
                          required
                          className="rounded-xl border border-stone/50 bg-white px-3 py-2 font-sans text-sm text-graphite outline-none focus:border-gold"
                        />
                        <input
                          name="message"
                          placeholder="Optional note"
                          className="min-w-[140px] flex-1 rounded-xl border border-stone/50 bg-white px-3 py-2 font-sans text-sm text-graphite outline-none focus:border-gold"
                        />
                        <button className="rounded-full bg-graphite px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-cream hover:bg-ink">
                          Propose
                        </button>
                      </form>
                    </details>
                  )}

                  {b.status === "reschedule_proposed" &&
                    tokenMap.get(b.id) &&
                    wa && (
                      <a
                        href={`https://wa.me/${wa}?text=${encodeURIComponent(
                          `Hi ${b.customers?.full_name ?? ""}, we'd like to propose ${fmt(b.starts_at)} for your ${b.treatments?.name ?? "appointment"}. Please confirm here: ${siteUrl}/b/${tokenMap.get(b.id)}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-cream hover:bg-gold-deep"
                      >
                        <Send className="h-3.5 w-3.5" /> Send confirmation link
                      </a>
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
