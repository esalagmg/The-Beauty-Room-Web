import Link from "next/link";
import { Plus } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { deleteStaff, toggleStaffActive } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Row {
  id: string;
  name: string;
  role: string | null;
  division_scope?: string | null;
  is_active: boolean;
  online_booking_enabled: boolean;
  display_order: number;
}

function scopeLabel(scope?: string | null) {
  if (scope === "salon") return "Salon";
  if (scope === "clinic") return "Clinic";
  return "Salon & Clinic";
}

export default async function StaffPage() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  // select("*") is resilient if the `division_scope` column isn't added yet.
  const { data } = await supabase.from("staff").select("*").order("display_order");
  const rows = (data ?? []) as unknown as Row[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-graphite">Specialists</h1>
          <p className="mt-1 font-sans text-sm text-taupe">
            Add, edit and hide the team members customers can book. Changes appear on the site within ~2 minutes.
          </p>
        </div>
        <Link
          href="/admin/staff/new"
          className="flex items-center gap-2 rounded-full bg-graphite px-5 py-3 font-sans text-[0.68rem] uppercase tracking-wide2 text-cream hover:bg-ink"
        >
          <Plus className="h-4 w-4" /> Add
        </Link>
      </div>

      <div className="mt-7 overflow-hidden rounded-[24px] border border-stone/40 bg-white/60">
        {rows.length === 0 ? (
          <p className="p-8 text-center font-sans text-sm text-taupe">
            No specialists yet — add your first one.
          </p>
        ) : (
          <ul className="divide-y divide-stone/30">
            {rows.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-serif text-lg text-graphite">
                    {s.name}
                    {!s.is_active && (
                      <span className="rounded-full bg-stone/30 px-2 py-0.5 font-sans text-[0.55rem] uppercase tracking-wide2 text-taupe">
                        hidden
                      </span>
                    )}
                  </p>
                  <p className="font-sans text-[0.72rem] text-taupe">
                    {s.role ?? "—"} · {scopeLabel(s.division_scope)}
                    {!s.online_booking_enabled && " · booking off"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <form action={toggleStaffActive}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="active" value={(!s.is_active).toString()} />
                    <button className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite">
                      {s.is_active ? "Hide" : "Show"}
                    </button>
                  </form>
                  <Link
                    href={`/admin/staff/${s.id}`}
                    className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite"
                  >
                    Edit
                  </Link>
                  <form action={deleteStaff}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-red-300 hover:text-red-600">
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
