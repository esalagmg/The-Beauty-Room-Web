import type { Metadata } from "next";
import { SalonExperience } from "@/features/division/salon-experience";
import { getCategoriesByDivision, getSpecialists } from "@/lib/data/catalog";
import { getDivisionSchema } from "@/lib/structured-data";
import { serviceCategories } from "@/constants/services";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Luxury Hair, Bridal & Makeup Salon in Ratnapura",
  description:
    "The Salon at The Beauty Room by Nilu: a warm, fashion-led atelier in Ratnapura for couture hair, cut & colour, bridal artistry and luminous makeup. Established 1998, 28+ years of beauty excellence.",
  keywords: [
    "luxury salon Ratnapura",
    "hair salon Ratnapura",
    "bridal makeup Sri Lanka",
    "wedding hair and makeup Ratnapura",
    "balayage colour Sri Lanka",
    "keratin treatment Ratnapura",
    "The Beauty Room by Nilu salon",
  ],
  alternates: { canonical: "/salon" },
  openGraph: {
    type: "website",
    title: "The Salon · Hair, Bridal & Makeup · The Beauty Room by Nilu",
    description:
      "A warm, fashion-led atelier for couture hair, bridal artistry and luminous makeup in Ratnapura, Sri Lanka.",
    url: "/salon",
    images: [{ url: "/images/brand/salon-hair-blowout.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Salon · The Beauty Room by Nilu",
    description:
      "Couture hair, bridal artistry and luminous makeup in Ratnapura, Sri Lanka.",
  },
};

export default async function SalonPage() {
  const [categories, specialists] = await Promise.all([
    getCategoriesByDivision("salon"),
    getSpecialists(),
  ]);

  const offerings = (categories.length ? categories : serviceCategories)
    .flatMap((c) => c.services.map((s) => s.name))
    .slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getDivisionSchema("salon", offerings)),
        }}
      />
      <SalonExperience categories={categories} artist={specialists[0]} />
    </>
  );
}
