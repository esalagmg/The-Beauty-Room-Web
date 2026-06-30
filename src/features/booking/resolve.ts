import type { ServiceCategory, Service, Specialist } from "@/types";

/** Resolve catalog entities from in-memory arrays (DB- or constants-sourced). */
export function findCategory(
  categories: ServiceCategory[],
  id: string | null,
): ServiceCategory | null {
  return categories.find((c) => c.id === id) ?? null;
}

export function findService(
  categories: ServiceCategory[],
  categoryId: string | null,
  serviceId: string | null,
): Service | null {
  const cat = findCategory(categories, categoryId);
  return cat?.services.find((s) => s.id === serviceId) ?? null;
}

export function findSpecialist(
  specialists: Specialist[],
  id: string | null,
): Specialist | null {
  return specialists.find((s) => s.id === id) ?? null;
}

export function specialistsForDivision(
  specialists: Specialist[],
  division: "salon" | "clinic" | null,
): Specialist[] {
  if (!division) return [];
  return specialists.filter(
    (s) => s.division === division || s.division === "both",
  );
}
