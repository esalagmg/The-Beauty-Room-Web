export const siteConfig = {
  name: "The Beauty Room",
  fullName: "The Beauty Room by Nilu",
  tagline: "Premium Salon & Aesthetic Clinic",
  founder: "Nilu",
  description:
    "A premium salon and aesthetic clinic in Ratnapura, Sri Lanka where artistry, science and quiet luxury meet. Hair, bridal, skin and advanced aesthetic treatments, crafted for confidence.",
  url: "https://thebeautyroombynilu.lk",
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
    phone: "+94 77 245 6789",
    phoneHref: "tel:+94772456789",
    whatsapp: "+94 77 245 6789",
    whatsappHref:
      "https://wa.me/94772456789?text=Hello%20The%20Beauty%20Room%2C%20I%27d%20love%20to%20book%20an%20appointment.",
    email: "hello@thebeautyroombynilu.lk",
    emailHref: "mailto:hello@thebeautyroombynilu.lk",
  },
  social: {
    instagram: "https://instagram.com/thebeautyroombynilu",
    instagramHandle: "@thebeautyroombynilu",
    facebook: "https://facebook.com/thebeautyroombynilu",
    tiktok: "https://tiktok.com/@thebeautyroombynilu",
  },
  hours: [
    { day: "Monday to Friday", time: "9:00 - 19:00" },
    { day: "Saturday", time: "8:30 - 20:00" },
    { day: "Sunday", time: "By appointment" },
  ],
  stats: [
    { value: "12+", label: "Years of artistry" },
    { value: "8,000+", label: "Clients styled" },
    { value: "30+", label: "Signature treatments" },
    { value: "4.9", label: "Average rating" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
