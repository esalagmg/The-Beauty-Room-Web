import type { Specialist } from "@/types";
import { brand } from "./images";

export const specialists: Specialist[] = [
  {
    id: "nilu",
    name: "Nilu",
    role: "Founder & Lead Artist",
    division: "both",
    experience: "28+ years",
    bio: "The founding eye and the hands behind The Beauty Room. Nilu blends couture hair and bridal artistry with clinical skin science, personally leading every signature look and treatment protocol.",
    expertise: [
      "Bridal Direction",
      "Couture Hair",
      "Aesthetic Treatments",
      "Skin Diagnostics",
    ],
    image: brand.founder,
    instagram: "@thebeautyroombynilu",
  },
];

export function getSpecialist(id: string | null) {
  return specialists.find((s) => s.id === id) ?? null;
}

/** Specialists available for a given division (includes 'both'). */
export function specialistsFor(division: "salon" | "clinic") {
  return specialists.filter((s) => s.division === division || s.division === "both");
}
