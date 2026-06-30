import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { upsertTreatment } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 font-sans text-sm text-graphite outline-none focus:border-gold";
const labelCls = "font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe";

interface Treatment {
  id: string;
  category_id: string | null;
  name: string;
  short_description: string | null;
  duration_minutes: number;
  price_amount: number | null;
  price_label: string | null;
  discounted_amount: number | null;
  image: string | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  online_booking_enabled: boolean;
}

export default async function TreatmentForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const supabase = await createServerSupabase();
  if (!supabase) return null;

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, division")
    .order("division")
    .order("display_order");

  let t: Partial<Treatment> = {
    duration_minutes: 60,
    display_order: 0,
    is_active: true,
    online_booking_enabled: true,
    is_featured: false,
  };
  if (!isNew) {
    const { data } = await supabase
      .from("treatments")
      .select(
        "id, category_id, name, short_description, duration_minutes, price_amount, price_label, discounted_amount, image, display_order, is_featured, is_active, online_booking_enabled",
      )
      .eq("id", id)
      .single();
    if (data) t = data as Treatment;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/treatments"
        className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-wide2 text-taupe hover:text-graphite"
      >
        <ArrowLeft className="h-4 w-4" /> Treatments
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-light text-graphite">
        {isNew ? "Add treatment" : "Edit treatment"}
      </h1>

      <form action={upsertTreatment} className="mt-7 space-y-5">
        {!isNew && <input type="hidden" name="id" value={t.id} />}

        <label className="block">
          <span className={labelCls}>Name</span>
          <input name="name" required defaultValue={t.name ?? ""} className={inputCls} />
        </label>

        <label className="block">
          <span className={labelCls}>Category</span>
          <select name="category_id" required defaultValue={t.category_id ?? ""} className={inputCls}>
            <option value="" disabled>
              Choose a category…
            </option>
            {(categories ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.division === "clinic" ? "Clinic" : "Salon"} — {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelCls}>Short description</span>
          <textarea
            name="short_description"
            rows={2}
            defaultValue={t.short_description ?? ""}
            className={`${inputCls} resize-none`}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Duration (minutes)</span>
            <input
              name="duration_minutes"
              type="number"
              min={5}
              step={5}
              defaultValue={t.duration_minutes ?? 60}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Display order</span>
            <input
              name="display_order"
              type="number"
              defaultValue={t.display_order ?? 0}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Price label (shown on site)</span>
            <input
              name="price_label"
              placeholder="from LKR 5,500"
              defaultValue={t.price_label ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Price amount (LKR, for reports)</span>
            <input
              name="price_amount"
              type="number"
              defaultValue={t.price_amount ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Discounted amount (optional)</span>
            <input
              name="discounted_amount"
              type="number"
              defaultValue={t.discounted_amount ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Image path or URL</span>
            <input
              name="image"
              placeholder="/images/brand/…"
              defaultValue={t.image ?? ""}
              className={inputCls}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-5 rounded-2xl border border-stone/40 bg-white/60 px-5 py-4">
          {[
            { name: "is_active", label: "Active (visible on site)", checked: t.is_active },
            { name: "online_booking_enabled", label: "Online booking", checked: t.online_booking_enabled },
            { name: "is_featured", label: "Featured", checked: t.is_featured },
          ].map((c) => (
            <label key={c.name} className="flex items-center gap-2 font-sans text-sm text-charcoal/80">
              <input type="checkbox" name={c.name} defaultChecked={c.checked} className="h-4 w-4 accent-graphite" />
              {c.label}
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-graphite px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-cream hover:bg-ink">
            {isNew ? "Create treatment" : "Save changes"}
          </button>
          <Link
            href="/admin/treatments"
            className="rounded-full border border-stone/60 px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-charcoal/70 hover:border-graphite"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
