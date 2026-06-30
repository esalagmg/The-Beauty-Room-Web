import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { upsertCategory } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 font-sans text-sm text-graphite outline-none focus:border-gold";
const labelCls = "font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe";

interface Cat {
  id: string;
  name: string;
  division: string;
  tagline: string | null;
  display_order: number;
  is_active: boolean;
}

export default async function CategoriesPage() {
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("categories")
    .select("id, name, division, tagline, display_order, is_active")
    .order("division")
    .order("display_order");
  const cats = (data ?? []) as Cat[];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-graphite">Categories</h1>
      <p className="mt-1 font-sans text-sm text-taupe">
        Group treatments into menus for the salon and clinic.
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* list */}
        <div className="overflow-hidden rounded-[24px] border border-stone/40 bg-white/60">
          {cats.length === 0 ? (
            <p className="p-8 text-center font-sans text-sm text-taupe">No categories yet.</p>
          ) : (
            <ul className="divide-y divide-stone/30">
              {cats.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-serif text-lg text-graphite">
                      {c.name}
                      {!c.is_active && (
                        <span className="ml-2 rounded-full bg-stone/30 px-2 py-0.5 font-sans text-[0.55rem] uppercase tracking-wide2 text-taupe">
                          hidden
                        </span>
                      )}
                    </p>
                    <p className="font-sans text-[0.7rem] text-taupe">
                      {c.division === "clinic" ? "Clinic" : "Salon"} · order {c.display_order}
                      {c.tagline ? ` · ${c.tagline}` : ""}
                    </p>
                  </div>
                  <Link
                    href={`/admin/categories/${c.id}`}
                    className="rounded-full border border-stone/60 px-3.5 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-charcoal/70 hover:border-graphite"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* add form */}
        <form
          action={upsertCategory}
          className="h-fit rounded-[24px] border border-stone/40 bg-white/60 p-5"
        >
          <h2 className="font-serif text-lg text-graphite">Add category</h2>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className={labelCls}>Name</span>
              <input name="name" required className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Division</span>
              <select name="division" required defaultValue="salon" className={inputCls}>
                <option value="salon">Salon</option>
                <option value="clinic">Aesthetic Clinic</option>
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Tagline</span>
              <input name="tagline" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Display order</span>
              <input name="display_order" type="number" defaultValue={0} className={inputCls} />
            </label>
            <label className="flex items-center gap-2 font-sans text-sm text-charcoal/80">
              <input type="checkbox" name="is_active" defaultChecked className="h-4 w-4 accent-graphite" />
              Active
            </label>
            <button className="w-full rounded-full bg-graphite py-3 font-sans text-[0.68rem] uppercase tracking-luxe text-cream hover:bg-ink">
              Add category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
