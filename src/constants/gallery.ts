import type { GalleryItem, InteriorSpace } from "@/types";
import { brand, img } from "./images";

export const galleryCategories = [
  "All",
  "Bridal",
  "Hair",
  "Skin",
  "Makeup",
] as const;

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    category: "Bridal",
    division: "salon",
    title: "Garden Bridal",
    before: img.makeupDetail,
    after: brand.bridalArch,
  },
  {
    id: "g2",
    category: "Hair",
    division: "salon",
    title: "Dimensional Colour",
    before: img.salonCut,
    after: brand.hairBlowout,
  },
  {
    id: "g3",
    category: "Skin",
    division: "clinic",
    title: "HydraGlow Transformation",
    before: img.clinicTreatment,
    after: img.clinicSkin,
  },
  {
    id: "g4",
    category: "Makeup",
    division: "salon",
    title: "Soft Editorial Glam",
    before: img.makeupDetail,
    after: brand.bridalRoses,
  },
  {
    id: "g5",
    category: "Hair",
    division: "salon",
    title: "Sleek & Smooth",
    before: img.salonColor,
    after: brand.hairSleek,
  },
  {
    id: "g6",
    category: "Skin",
    division: "clinic",
    title: "Resurfacing Glow",
    before: img.clinicProducts,
    after: img.clinicGlow,
  },
];

export const interiorSpaces: InteriorSpace[] = [
  {
    id: "reception",
    name: "The Reception",
    description:
      "A hushed, light-filled welcome where champagne neutrals and fresh blooms set the tone for the experience to come.",
    image: img.interiorReception,
  },
  {
    id: "salon-floor",
    name: "The Salon Floor",
    description:
      "Warm, fashion-inspired styling stations designed for comfort, conversation and the craft of transformation.",
    image: brand.hairSleek,
  },
  {
    id: "treatment-rooms",
    name: "Treatment Suites",
    description:
      "Private, clinically-calm rooms where advanced aesthetics unfold in complete serenity.",
    image: img.interiorRoom,
  },
  {
    id: "lounge",
    name: "The Coffee Lounge",
    description:
      "Linger a little. A considered lounge for slow mornings, fresh coffee and quiet moments between treatments.",
    image: img.interiorLounge,
  },
  {
    id: "dispensary",
    name: "The Dispensary",
    description:
      "A curated wall of professional-grade products and rituals to continue your care at home.",
    image: img.interiorProducts,
  },
];
