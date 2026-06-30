import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { StatusPill } from "@/features/admin/status-pill";

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

interface RecentBooking {
  id: string;
  reference: string;
  status: string;
  starts_at: string;
  treatments: { name: string } | null;
  customers: { full_name: string; phone: string | null } | null;
}

export default async function AdminDashboard() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const nowIso = new Date().toISOString();
  const [pendingRes, confirmedRes, treatRes, recentRes] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "requested"),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed")
      .gte("starts_at", nowIso),
    supabase.from("treatments").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("bookings")
      .select("id, reference, status, starts_at, treatments(name), customers(full_name, phone)")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const recent = (recentRes.data ?? []) as unknown as RecentBooking[];

  const stats = [
    { label: "Pending requests", value: pendingRes.count ?? 0, href: "/admin/bookings?status=requested" },
    { label: "Upcoming confirmed", value: confirmedRes.count ?? 0, href: "/admin/bookings" },
    { label: "Active treatments", value: treatRes.count ?? 0, href: "/admin/treatments" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-graphite">Dashboard</h1>
      <p className="mt-1 font-sans text-sm text-taupe">
        A quick view of what needs your attention.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-[24px] border border-stone/40 bg-white/60 p-6 transition-colors hover:border-gold/50"
          >
            <p className="font-serif text-5xl font-light text-graphite">{s.value}</p>
            <p className="mt-2 flex items-center justify-between font-sans text-[0.65rem] uppercase tracking-wide2 text-taupe">
              {s.label}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-9">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-light text-graphite">Recent bookings</h2>
          <Link href="/admin/bookings" className="font-sans text-[0.68rem] uppercase tracking-wide2 text-gold-deep">
            View all
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-[24px] border border-stone/40 bg-white/60">
          {recent.length === 0 ? (
            <p className="p-8 text-center font-sans text-sm text-taupe">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-stone/30">
              {recent.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="font-serif text-lg text-graphite">
                      {b.customers?.full_name ?? "Guest"}
                    </p>
                    <p className="font-sans text-[0.7rem] text-taupe">
                      {b.treatments?.name ?? "—"} · {b.customers?.phone ?? ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-sans text-[0.7rem] text-charcoal/70">
                      <Clock className="h-3 w-3" /> {fmt(b.starts_at)}
                    </span>
                    <StatusPill status={b.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
