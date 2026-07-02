import type { ServiceCategory } from "@/types";
import { brand, img } from "./images";

export const serviceCategories: ServiceCategory[] = [
  // ──────────────────────────── SALON ────────────────────────────
  {
    id: "hair",
    division: "salon",
    name: "Hair Atelier",
    tagline: "Cut · Colour · Care",
    description:
      "Precision cutting, dimensional colour and restorative rituals, engineered around the movement and architecture of your hair.",
    image: img.salonStyling,
    services: [
      {
        id: "signature-cut",
        name: "Signature Cut & Finish",
        description: "A bespoke consultation, precision cut and luxe blow-dry finish.",
        duration: "75 min",
        price: "from LKR 5,500",
        highlight: true,
      },
      {
        id: "dimensional-colour",
        name: "Dimensional Colour",
        description: "Hand-painted balayage and gloss for lived-in, luminous depth.",
        duration: "180 min",
        price: "from LKR 14,500",
      },
      {
        id: "keratin",
        name: "Keratin Smoothing Ritual",
        description: "Frizz-free, glass-like shine that lasts for months.",
        duration: "150 min",
        price: "from LKR 18,000",
      },
      {
        id: "scalp-ritual",
        name: "Scalp & Strand Therapy",
        description: "A restorative bond-building and scalp treatment.",
        duration: "60 min",
        price: "from LKR 6,500",
      },
    ],
  },
  {
    id: "bridal",
    division: "salon",
    name: "Bridal & Couture",
    tagline: "For the moments that matter",
    description:
      "Editorial bridal artistry: makeup, hair, draping and styling composed for a single, unforgettable day.",
    image: img.salonBridal,
    services: [
      {
        id: "bridal-signature",
        name: "Signature Bridal Look",
        description: "Full bridal makeup, hairstyling and saree draping with trial.",
        duration: "Full day",
        price: "from LKR 65,000",
        highlight: true,
      },
      {
        id: "bridal-trial",
        name: "Bridal Trial Session",
        description: "A complete preview look to perfect every detail before the day.",
        duration: "120 min",
        price: "from LKR 12,000",
      },
      {
        id: "occasion-glam",
        name: "Occasion Glam",
        description: "Soft-glam makeup and styling for engagements and galas.",
        duration: "90 min",
        price: "from LKR 9,500",
      },
    ],
  },
  {
    id: "makeup",
    division: "salon",
    name: "Makeup Studio",
    tagline: "Skin-first artistry",
    description:
      "Luminous, photograph-ready makeup built on a foundation of skin prep and timeless technique.",
    image: img.makeupEditorial,
    services: [
      {
        id: "soft-glam",
        name: "Soft Glam",
        description: "Effortless, radiant makeup for day or evening.",
        duration: "60 min",
        price: "from LKR 6,500",
      },
      {
        id: "editorial-makeup",
        name: "Editorial / Photoshoot",
        description: "High-definition artistry tailored for camera and lighting.",
        duration: "90 min",
        price: "from LKR 11,000",
      },
      {
        id: "lash-brow",
        name: "Lash & Brow Design",
        description: "Lash lift, tint and precision brow shaping.",
        duration: "45 min",
        price: "from LKR 4,500",
      },
    ],
  },
  // ─────────────────────── AESTHETIC CLINIC ───────────────────────
  {
    id: "skin",
    division: "clinic",
    name: "Skin Studio",
    tagline: "Science-led facials",
    description:
      "Result-driven facials that pair clinical actives with deeply restorative ritual, for visibly luminous skin.",
    image: img.clinicGlow,
    services: [
      {
        id: "hydrafacial",
        name: "HydraGlow Facial",
        description: "Deep cleanse, exfoliation, extraction and hydration in one ritual.",
        duration: "60 min",
        price: "from LKR 12,000",
        highlight: true,
      },
      {
        id: "signature-facial",
        name: "Signature Bespoke Facial",
        description: "A fully customised facial designed around your skin diagnostic.",
        duration: "75 min",
        price: "from LKR 9,500",
      },
      {
        id: "chemical-peel",
        name: "Resurfacing Peel",
        description: "Medical-grade peel to refine tone, texture and clarity.",
        duration: "45 min",
        price: "from LKR 11,000",
      },
    ],
  },
  {
    id: "advanced",
    division: "clinic",
    name: "Advanced Aesthetics",
    tagline: "Clinical, considered, refined",
    description:
      "Advanced, evidence-based treatments delivered with medical precision and an unwavering focus on natural results.",
    image: brand.clinicProcedure,
    services: [
      {
        id: "microneedling",
        name: "Collagen Microneedling",
        description: "Stimulates renewal to smooth texture, scars and fine lines.",
        duration: "75 min",
        price: "from LKR 16,000",
        highlight: true,
      },
      {
        id: "laser-rejuvenation",
        name: "Laser Rejuvenation",
        description: "Targets pigmentation and tone for a clear, even complexion.",
        duration: "60 min",
        price: "from LKR 18,000",
      },
      {
        id: "anti-aging",
        name: "Age-Defy Protocol",
        description: "A multi-step lifting and firming programme.",
        duration: "90 min",
        price: "from LKR 22,000",
      },
    ],
  },
  {
    id: "body",
    division: "clinic",
    name: "Body & Wellness",
    tagline: "Restore · Sculpt · Glow",
    description:
      "Holistic body therapies and contouring rituals to leave you renewed from head to toe.",
    image: img.clinicProducts,
    services: [
      {
        id: "body-contour",
        name: "Body Contour Therapy",
        description: "Non-invasive sculpting and lymphatic massage.",
        duration: "90 min",
        price: "from LKR 15,000",
      },
      {
        id: "glow-wrap",
        name: "Radiance Body Wrap",
        description: "Detoxifying, hydrating wrap for luminous skin.",
        duration: "60 min",
        price: "from LKR 10,000",
      },
    ],
  },
];

export const salonCategories = serviceCategories.filter((c) => c.division === "salon");
export const clinicCategories = serviceCategories.filter((c) => c.division === "clinic");

export function getCategory(id: string | null) {
  return serviceCategories.find((c) => c.id === id) ?? null;
}

export function getService(categoryId: string | null, serviceId: string | null) {
  const cat = getCategory(categoryId);
  return cat?.services.find((s) => s.id === serviceId) ?? null;
}
