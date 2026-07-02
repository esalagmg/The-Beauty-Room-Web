import { siteConfig } from "@/constants/site";

/**
 * JSON-LD for the business. Models a beauty salon + aesthetic clinic with the
 * founding year, phone, location and social profiles. The Google aggregate
 * rating is included only when a real review count is configured, so the
 * markup never advertises fabricated numbers.
 */
export function getLocalBusinessSchema() {
  const { google, contact, location, social, url } = siteConfig;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "HealthAndBeautyBusiness"],
    "@id": `${url}/#business`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.emailHref.replace("mailto:", ""),
    foundingDate: String(siteConfig.established),
    priceRange: "$$",
    image: [`${url}/images/brand/founder-nilu.jpeg`],
    logo: `${url}/images/brand/logo-emblem.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: "Sabaragamuwa",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    areaServed: { "@type": "City", name: location.city },
    sameAs: [social.instagram, social.facebook],
    knowsAbout: [
      "Hair Salon",
      "Bridal Makeup",
      "Hair Colour",
      "Skin Care",
      "Aesthetic Clinic",
      "Facial Treatments",
      "Advanced Aesthetics",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:30",
        closes: "20:00",
      },
    ],
  };

  if (google.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: google.rating,
      reviewCount: google.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * FAQPage JSON-LD — mirrors the FAQ accordion rendered on the page, making
 * the questions eligible for FAQ rich results.
 */
export function getFaqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Per-page JSON-LD for the /salon and /clinic pages: a Service tied to the
 * business, an OfferCatalog of its treatments, and breadcrumbs. Improves the
 * chance of rich results for division-specific searches.
 */
export function getDivisionSchema(
  division: "salon" | "clinic",
  offerings: string[],
) {
  const { url, location } = siteConfig;
  const isSalon = division === "salon";
  const name = isSalon ? "The Salon" : "Aesthetic Clinic";
  const path = `${url}/${division}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${path}#service`,
        name: `${name} · ${siteConfig.fullName}`,
        serviceType: isSalon
          ? "Hair salon, bridal & makeup services"
          : "Aesthetic clinic & advanced skin treatments",
        provider: { "@id": `${url}/#business` },
        areaServed: { "@type": "City", name: location.city },
        url: path,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${name} treatments`,
          itemListElement: offerings.map((title) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: title },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: url },
          { "@type": "ListItem", position: 2, name, item: path },
        ],
      },
    ],
  };
}
