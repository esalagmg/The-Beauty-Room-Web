export const siteConfig = {
  name: "The Beauty Room",
  fullName: "The Beauty Room by Nilu",
  tagline: "Premium Salon & Aesthetic Clinic",
  founder: "Nilu",
  description:
    "Established in 1998, The Beauty Room by Nilu is a premium salon and aesthetic clinic in Ratnapura, Sri Lanka where artistry, science and quiet luxury meet. Hair, bridal, skin and advanced aesthetic treatments, crafted for confidence.",
  url: "https://thebeautyroombynilu.lk",

  // ── Heritage ─────────────────────────────────────────────────
  established: 1998,
  establishedLabel: "Established in 1998",
  yearsLabel: "28+ Years",
  experienceLabel: "28+ Years of Beauty Excellence",

  location: {
    line1: "The Beauty Room by Nilu",
    line2: "Ratnapura",
    city: "Ratnapura",
    country: "Sri Lanka",
    mapQuery: "The Beauty Room by Nilu, Ratnapura",
    lat: 6.7277518,
    lng: 80.3794613,
    mapEmbed:
      "https://www.google.com/maps?q=6.7277518,80.3794613&z=16&hl=en&output=embed",
    mapLink: "https://maps.app.goo.gl/6m8aEL4vbUf5HoZS7",
  },
  contact: {
    phone: "077 585 4977",
    phoneHref: "tel:+94775854977",
    whatsapp: "077 585 4977",
    whatsappHref:
      "https://wa.me/94775854977?text=Hello%20The%20Beauty%20Room%2C%20I%27d%20love%20to%20book%20an%20appointment.",
    email: "hello@thebeautyroombynilu.lk",
    emailHref: "mailto:hello@thebeautyroombynilu.lk",
  },
  social: {
    instagram: "https://instagram.com/thebeautyroombynilu",
    instagramHandle: "@thebeautyroombynilu",
    facebook: "https://www.facebook.com/TheBeautyRoom.ByNilu",
    tiktok: "https://tiktok.com/@thebeautyroombynilu",
  },

  /**
   * Google Business Profile.
   * Google does not allow scraping reviews — update `rating` and `reviewCount`
   * with your live numbers (a 1-minute edit), or wire the Places API later via
   * `placeId`. See `src/constants/reviews.ts` for the data + API integration
   * point. When `reviewCount` is 0 the numeric count is hidden gracefully.
   */
  google: {
    rating: 5,
    reviewCount: 0,
    profileUrl: "https://share.google/yfXnFbWWrEifO1PjM",
    writeReviewUrl: "https://share.google/yfXnFbWWrEifO1PjM",
    placeId: "",
  },

  hours: [
    { day: "Monday to Friday", time: "9:00 - 19:00" },
    { day: "Saturday", time: "8:30 - 20:00" },
    { day: "Sunday", time: "By appointment" },
  ],
  stats: [
    { value: "1998", label: "Established" },
    { value: "28+", label: "Years of excellence" },
    { value: "30+", label: "Signature treatments" },
    { value: "2", label: "Salon & clinic divisions" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
