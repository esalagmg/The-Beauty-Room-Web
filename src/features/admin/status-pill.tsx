const MAP: Record<string, string> = {
  requested: "bg-gold/15 text-gold-deep",
  confirmed: "bg-green-100 text-green-700",
  reschedule_proposed: "bg-blue-100 text-blue-700",
  customer_requested_change: "bg-blue-100 text-blue-700",
  completed: "bg-stone/30 text-charcoal",
  cancelled: "bg-stone/20 text-taupe",
  declined: "bg-stone/20 text-taupe",
  no_show: "bg-red-100 text-red-700",
  expired: "bg-stone/20 text-taupe",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wide2 ${MAP[status] ?? "bg-stone/20 text-taupe"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

/** Convert a Sri Lankan phone number to a wa.me-friendly international form. */
export function waNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("94")) return digits;
  if (digits.startsWith("0")) return "94" + digits.slice(1);
  return digits;
}
