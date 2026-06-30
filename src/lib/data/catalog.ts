import "server-only";

import type { ServiceCategory, Service, Specialist, Division } from "@/types";
import { serviceCategories as staticCategories } from "@/constants/services";
import { specialists as staticSpecialists } from "@/constants/specialists";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Catalog data access.
 *
 * Every function returns the SAME shape the UI already consumes. When Supabase
 * is configured it reads live data; otherwise it returns the built-in content
 * from `src/constants`, so the public site is always functional.
 */

function formatDuration(minutes: number): string {
  if (minutes % 60 === 0) return `${minutes / 60} hr`;
  if (minutes < 60) return `${minutes} min`;
  return `${minutes} min`;
}

function priceText(label: string | null, amount: number | null): string {
  if (label) return label;
  if (amount != null) return `from LKR ${amount.toLocaleString("en-LK")}`;
  return "On request";
}

interface DbCategory {
  id: string;
  division: Division;
  name: string;
  tagline: string | null;
  description: string | null;
  image: string | null;
  display_order: number;
}
interface DbTreatment {
  id: string;
  category_id: string | null;
  name: string;
  short_description: string | null;
  description: string | null;
  duration_minutes: number;
  price_label: string | null;
  price_amount: number | null;
  is_featured: boolean;
  display_order: number;
}

/** Service categories with their treatments, ready for the UI. */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  if (!isSupabaseConfigured) return staticCategories;

  const supabase = createPublicClient();
  if (!supabase) return staticCategories;

  const [{ data: cats }, { data: treats }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, division, name, tagline, description, image, display_order")
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("treatments")
      .select(
        "id, category_id, name, short_description, description, duration_minutes, price_label, price_amount, is_featured, display_order",
      )
      .eq("is_active", true)
      .order("display_order"),
  ]);

  if (!cats || cats.length === 0) return staticCategories;

  return (cats as DbCategory[]).map((c) => {
    const services: Service[] = (treats as DbTreatment[] | null ?? [])
      .filter((t) => t.category_id === c.id)
      .map((t) => ({
        id: t.id,
        name: t.name,
        description: t.short_description ?? t.description ?? "",
        duration: formatDuration(t.duration_minutes),
        price: priceText(t.price_label, t.price_amount),
        highlight: t.is_featured,
      }));

    return {
      id: c.id,
      division: c.division,
      name: c.name,
      tagline: c.tagline ?? "",
      description: c.description ?? "",
      image: c.image ?? "",
      services,
    };
  });
}

export async function getCategoriesByDivision(
  division: Division,
): Promise<ServiceCategory[]> {
  const all = await getServiceCategories();
  return all.filter((c) => c.division === division);
}

interface DbStaff {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  experience_label: string | null;
  image: string | null;
  instagram: string | null;
  specialties: string[] | null;
}

/** Specialists, ready for the UI. */
export async function getSpecialists(): Promise<Specialist[]> {
  if (!isSupabaseConfigured) return staticSpecialists;

  const supabase = createPublicClient();
  if (!supabase) return staticSpecialists;

  const { data } = await supabase
    .from("staff")
    .select("id, name, role, bio, experience_label, image, instagram, specialties")
    .eq("is_active", true)
    .order("display_order");

  if (!data || data.length === 0) return staticSpecialists;

  return (data as DbStaff[]).map((s) => ({
    id: s.id,
    name: s.name,
    role: s.role ?? "",
    division: "both",
    experience: s.experience_label ?? "",
    bio: s.bio ?? "",
    expertise: s.specialties ?? [],
    image: s.image ?? "",
    instagram: s.instagram ?? undefined,
  }));
}
