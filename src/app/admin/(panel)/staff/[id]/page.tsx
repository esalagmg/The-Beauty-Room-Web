import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { upsertStaff } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-2xl border border-stone/50 bg-white px-4 py-3 font-sans text-sm text-graphite outline-none focus:border-gold";
const labelCls = "font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe";

interface Staff {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  experience_label: string | null;
  image: string | null;
  instagram: string | null;
  specialties: string[] | null;
  division_scope?: string | null;
  display_order: number;
  is_active: boolean;
  online_booking_enabled: boolean;
}

export default async function StaffForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const supabase = await createServerSupabase();
  if (!supabase) return null;

  let s: Partial<Staff> = {
    display_order: 0,
    is_active: true,
    online_booking_enabled: true,
    division_scope: "clinic",
  };
  if (!isNew) {
    // select("*") is resilient if `division_scope` isn't added yet.
    const { data } = await supabase.from("staff").select("*").eq("id", id).single();
    if (data) s = data as Staff;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/staff"
        className="inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-wide2 text-taupe hover:text-graphite"
      >
        <ArrowLeft className="h-4 w-4" /> Specialists
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-light text-graphite">
        {isNew ? "Add specialist" : "Edit specialist"}
      </h1>

      <form action={upsertStaff} className="mt-7 space-y-5">
        {!isNew && <input type="hidden" name="id" value={s.id} />}

        <label className="block">
          <span className={labelCls}>Name</span>
          <input name="name" required defaultValue={s.name ?? ""} className={inputCls} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Role / title</span>
            <input
              name="role"
              placeholder="Clinical Cosmetologist"
              defaultValue={s.role ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Credential / experience</span>
            <input
              name="experience_label"
              placeholder="MBBS (Colombo) · 10+ years"
              defaultValue={s.experience_label ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Works in</span>
            <select
              name="division_scope"
              defaultValue={s.division_scope ?? "clinic"}
              className={inputCls}
            >
              <option value="clinic">Clinic only</option>
              <option value="salon">Salon only</option>
              <option value="both">Salon &amp; Clinic</option>
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Display order</span>
            <input
              name="display_order"
              type="number"
              defaultValue={s.display_order ?? 0}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Image path or URL</span>
            <input
              name="image"
              placeholder="/images/brand/…"
              defaultValue={s.image ?? ""}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Instagram (optional)</span>
            <input
              name="instagram"
              placeholder="@handle"
              defaultValue={s.instagram ?? ""}
              className={inputCls}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelCls}>Short bio</span>
          <textarea
            name="bio"
            rows={3}
            defaultValue={s.bio ?? ""}
            className={`${inputCls} resize-none`}
          />
        </label>

        <label className="block">
          <span className={labelCls}>Specialties (comma-separated)</span>
          <input
            name="specialties"
            placeholder="Medical Aesthetics, Skin Diagnostics, Laser & Peels"
            defaultValue={(s.specialties ?? []).join(", ")}
            className={inputCls}
          />
        </label>

        <div className="flex flex-wrap gap-5 rounded-2xl border border-stone/40 bg-white/60 px-5 py-4">
          {[
            { name: "is_active", label: "Active (visible on site)", checked: s.is_active },
            { name: "online_booking_enabled", label: "Bookable online", checked: s.online_booking_enabled },
          ].map((c) => (
            <label key={c.name} className="flex items-center gap-2 font-sans text-sm text-charcoal/80">
              <input type="checkbox" name={c.name} defaultChecked={c.checked} className="h-4 w-4 accent-graphite" />
              {c.label}
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-graphite px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-cream hover:bg-ink">
            {isNew ? "Create specialist" : "Save changes"}
          </button>
          <Link
            href="/admin/staff"
            className="rounded-full border border-stone/60 px-8 py-3.5 font-sans text-[0.7rem] uppercase tracking-luxe text-charcoal/70 hover:border-graphite"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
