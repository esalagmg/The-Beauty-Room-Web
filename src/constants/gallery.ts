import type { GalleryItem, InteriorSpace } from "@/types";
import { brand, img } from "./images";

export const galleryCategories = [
  "All",
  "Skin",
  "Hair",
  "Makeup",
] as const;

/**
 * Featured work — genuine client transformations photographed in-house.
 * Each item is a draggable before/after pair, except `composite` items which
 * are a single pre-composed before|after image rendered static. Source files
 * live in /public/images/gallery.
 */
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    category: "Skin",
    division: "clinic",
    title: "HydraFacial",
    before: "/images/gallery/hydrafacial-before.jpeg",
    after: "/images/gallery/hydrafacial-after.jpeg",
  },
  {
    id: "g2",
    category: "Skin",
    division: "clinic",
    title: "Carbon Laser Peel",
    before: "/images/gallery/carbon-laser-before.jpeg",
    after: "/images/gallery/carbon-laser-after.jpeg",
  },
  {
    id: "g3",
    category: "Hair",
    division: "salon",
    title: "Hair Smoothing",
    before: "/images/gallery/hair-before.jpeg",
    after: "/images/gallery/hair-after.jpeg",
  },
  {
    id: "g4",
    category: "Makeup",
    division: "salon",
    title: "Bridal Makeup",
    before: "/images/gallery/makeup-before.jpeg",
    after: "/images/gallery/makeup-after.jpeg",
  },
  {
    id: "g5",
    category: "Skin",
    division: "clinic",
    title: "Microdermabrasion Facial",
    before: "/images/gallery/microdermabrasion-before.jpeg",
    after: "/images/gallery/microdermabrasion-after.jpeg",
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
];
