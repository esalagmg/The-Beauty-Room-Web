import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { upsertCategory } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 font-sans text-sm text-graphite outline-none focus:border-gold";
const labelCls = "font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe";

export default async function CategoryEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const { data: c } = await supabase
    .from("categories")
    .select("id, name, division, tagline, description, image, display_order, is_active")
    .eq("id", id)
    .single();

  if (!c) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-wide2 text-taupe hover:text-graphite"
      >
        <ArrowLeft className="h-4 w-4" /> Categories
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-light text-graphite">Edit category</h1>

      <form action={upsertCategory} className="mt-7 space-y-5">
        <input type="hidden" name="id" value={c.id} />
        <label className="block">
          <span className={labelCls}>Name</span>
          <input name="name" required defaultValue={c.name} className={inputCls} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Division</span>
            <select name="division" defaultValue={c.division} className={inputCls}>
              <option value="salon">Salon</option>
              <option value="clinic">Aesthetic Clinic</option>
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Display order</span>
            <input name="display_order" type="number" defaultValue={c.display_order} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Tagline</span>
            <input name="tagline" defaultValue={c.tagline ?? ""} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Image path or URL</span>
            <input name="image" defaultValue={c.image ?? ""} className={inputCls} />
          </label>
        </div>
        <label className="block">
          <span className={labelCls}>Description</span>
          <textarea name="description" rows={3} defaultValue={c.description ?? ""} className={`${inputCls} resize-none`} />
        </label>
        <label className="flex items-center gap-2 font-sans text-sm text-charcoal/80">
          <input type="checkbox" name="is_active" defaultChecked={c.is_active} className="h-4 w-4 accent-graphite" />
          Active (visible on site)
        </label>
        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-graphite px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-cream hover:bg-ink">
            Save changes
          </button>
          <Link
            href="/admin/categories"
            className="rounded-full border border-stone/60 px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-charcoal/70 hover:border-graphite"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
