import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { deleteTreatment, toggleTreatmentActive } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Row {
  id: string;
  name: string;
  price_label: string | null;
  price_amount: number | null;
  duration_minutes: number;
  is_featured: boolean;
  is_active: boolean;
  online_booking_enabled: boolean;
  categories: { name: string; division: string } | null;
}

export default async function TreatmentsPage() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("treatments")
    .select(
      "id, name, price_label, price_amount, duration_minutes, is_featured, is_active, online_booking_enabled, categories(name, division)",
    )
    .order("division")
    .order("display_order");

  const rows = (data ?? []) as unknown as Row[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-graphite">Treatments</h1>
          <p className="mt-1 font-sans text-sm text-taupe">
            Add, edit, price and hide treatments. Changes appear on the site within ~2 minutes.
          </p>
        </div>
        <Link
          href="/admin/treatments/new"
          className="flex items-center gap-2 rounded-full bg-graphite px-5 py-3 font-sans text-[0.68rem] uppercase tracking-wide2 text-cream hover:bg-ink"
        >
          <Plus className="h-4 w-4" /> Add
        </Link>
      </div>

      <div className="mt-7 overflow-hidden rounded-[24px] border border-stone/40 bg-white/60">
        {rows.length === 0 ? (
          <p className="p-8 text-center font-sans text-sm text-taupe">
            No treatments yet — add your first one.
          </p>
        ) : (
          <ul className="divide-y divide-stone/30">
            {rows.map((t) => (
              <li
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-serif text-lg text-graphite">
                    {t.is_featured && <Star className="h-3.5 w-3.5 fill-gold text-gold" />}
                    {t.name}
                    {!t.is_active && (
                      <span className="rounded-full bg-stone/30 px-2 py-0.5 font-sans text-[0.55rem] uppercase tracking-wide2 text-taupe">
                        hidden
                      </span>
                    )}
                  </p>
                  <p className="font-sans text-[0.72rem] text-taupe">
                    {t.categories?.name ?? "—"} ·{" "}
                    {t.categories?.division === "clinic" ? "Clinic" : "Salon"} ·{" "}
                    {t.duration_minutes} min ·{" "}
                    {t.price_label ?? (t.price_amount ? `LKR ${t.price_amount}` : "—")}
                    {!t.online_booking_enabled && " · booking off"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <form action={toggleTreatmentActive}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="active" value={(!t.is_active).toString()} />
                    <button className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite">
                      {t.is_active ? "Hide" : "Show"}
                    </button>
                  </form>
                  <Link
                    href={`/admin/treatments/${t.id}`}
                    className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite"
                  >
                    Edit
                  </Link>
                  <form action={deleteTreatment}>
                    <input type="hidden" name="id" value={t.id} />
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
