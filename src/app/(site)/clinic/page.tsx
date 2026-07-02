import type { Metadata } from "next";
import { ClinicExperience } from "@/features/division/clinic-experience";
import type { TreatmentDisplay } from "@/features/division/treatments-list";
import { getDivisionSchema, getFaqSchema } from "@/lib/structured-data";
import { getCategoriesByDivision, getSpecialists } from "@/lib/data/catalog";
import { divisionContent } from "@/constants/divisions";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Aesthetic Clinic · Advanced Skin Treatments in Ratnapura",
  description:
    "The Aesthetic Clinic at The Beauty Room by Nilu: a calm, clinically-precise sanctuary in Ratnapura for HydraGlow facials, skin rejuvenation, pigmentation, chemical peels, laser, microneedling, PRP and anti-ageing treatments.",
  keywords: [
    "aesthetic clinic Ratnapura",
    "skin clinic Sri Lanka",
    "HydraFacial Ratnapura",
    "chemical peel Sri Lanka",
    "microneedling Ratnapura",
    "pigmentation treatment Sri Lanka",
    "laser skin treatment Ratnapura",
    "anti-ageing clinic Sri Lanka",
    "The Beauty Room by Nilu clinic",
  ],
  alternates: { canonical: "/clinic" },
  openGraph: {
    type: "website",
    title: "Aesthetic Clinic · Advanced Skin Treatments · The Beauty Room by Nilu",
    description:
      "A calm, clinically-precise sanctuary for science-led facials and advanced aesthetics in Ratnapura, Sri Lanka.",
    url: "/clinic",
    images: [{ url: "/images/brand/clinic-facial.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetic Clinic · The Beauty Room by Nilu",
    description:
      "Science-led facials and advanced aesthetics in Ratnapura, Sri Lanka.",
  },
};

export default async function ClinicPage() {
  // Live catalog — only treatments marked "shown" in the admin panel, with
  // their current (edited) prices, durations and descriptions.
  const [categories, allSpecialists] = await Promise.all([
    getCategoriesByDivision("clinic"),
    getSpecialists(),
  ]);
  const specialists = allSpecialists.filter(
    (s) => s.division === "clinic" || s.division === "both",
  );
  const treatments: TreatmentDisplay[] = categories.flatMap((c) =>
    c.services.map((s) => ({
      name: s.name,
      category: c.name,
      description: s.description,
      duration: s.duration,
      price: s.price,
    })),
  );

  const offerings = treatments.map((t) => t.name).slice(0, 12);
  const faqs = divisionContent.clinic.faqs?.items ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getDivisionSchema("clinic", offerings)),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFaqSchema(faqs)),
          }}
        />
      )}
      <ClinicExperience treatments={treatments} specialists={specialists} />
    </>
  );
}
