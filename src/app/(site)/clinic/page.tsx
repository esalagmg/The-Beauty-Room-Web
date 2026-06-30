import type { Metadata } from "next";
import { DivisionExperience } from "@/features/division/division-experience";
import { divisionContent } from "@/constants/divisions";
import { getCategoriesByDivision, getSpecialists } from "@/lib/data/catalog";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Aesthetic Clinic · Skin & Advanced Treatments",
  description:
    "A calm, clinically-precise sanctuary for science-led facials and advanced aesthetics at The Beauty Room by Nilu, Ratnapura.",
};

export default async function ClinicPage() {
  const [categories, specialists] = await Promise.all([
    getCategoriesByDivision("clinic"),
    getSpecialists(),
  ]);

  return (
    <DivisionExperience
      content={divisionContent.clinic}
      categories={categories}
      artist={specialists[0]}
    />
  );
}
