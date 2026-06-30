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
    logo: `${url}/icon.svg`,
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
