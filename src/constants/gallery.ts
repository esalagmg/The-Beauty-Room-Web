import type { GalleryItem, InteriorSpace } from "@/types";
import { brand, img } from "./images";

export const galleryCategories = [
  "All",
  "Bridal",
  "Hair",
  "Skin",
  "Makeup",
] as const;

/**
 * Featured work. Each item is a draggable before/after of authentic brand
 * photography. For genuine client transformations, replace `before`/`after`
 * with matched photo pairs (same client, before & after) in /public/images.
 */
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    category: "Bridal",
    division: "salon",
    title: "Garden Bridal",
    before: brand.bridalSaree,
    after: brand.bridalArch,
  },
  {
    id: "g2",
    category: "Hair",
    division: "salon",
    title: "Dimensional Colour",
    before: brand.hairBlowout,
    after: brand.hairSleek,
  },
  {
    id: "g3",
    category: "Skin",
    division: "clinic",
    title: "Radiant Skin",
    before: brand.clinicFacial,
    after: brand.bridalForest,
  },
  {
    id: "g4",
    category: "Makeup",
    division: "salon",
    title: "Soft Editorial Glam",
    before: brand.bridalForest,
    after: brand.bridalRoses,
  },
  {
    id: "g5",
    category: "Hair",
    division: "salon",
    title: "Sleek & Smooth",
    before: brand.hairSleek,
    after: brand.hairBlowout,
  },
  {
    id: "g6",
    category: "Skin",
    division: "clinic",
    title: "Bridal Glow",
    before: brand.bridalRoses,
    after: brand.clinicFacial,
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
