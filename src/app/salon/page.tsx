import type { Metadata } from "next";
import { DivisionExperience } from "@/features/division/division-experience";
import { divisionContent } from "@/constants/divisions";

export const metadata: Metadata = {
  title: "The Salon · Hair, Bridal & Makeup",
  description:
    "A warm, fashion-led atelier for couture hair, bridal artistry and luminous makeup at The Beauty Room by Nilu, Ratnapura.",
};

export default function SalonPage() {
  return <DivisionExperience content={divisionContent.salon} />;
}
