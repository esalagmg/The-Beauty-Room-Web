import type { Metadata } from "next";
import { DivisionExperience } from "@/features/division/division-experience";
import { divisionContent } from "@/constants/divisions";
import { getCategoriesByDivision, getSpecialists } from "@/lib/data/catalog";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "The Salon · Hair, Bridal & Makeup",
  description:
    "A warm, fashion-led atelier for couture hair, bridal artistry and luminous makeup at The Beauty Room by Nilu, Ratnapura.",
};

export default async function SalonPage() {
  const [categories, specialists] = await Promise.all([
    getCategoriesByDivision("salon"),
    getSpecialists(),
  ]);

  return (
    <DivisionExperience
      content={divisionContent.salon}
      categories={categories}
      artist={specialists[0]}
    />
  );
}
