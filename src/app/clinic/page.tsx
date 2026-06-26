import type { Metadata } from "next";
import { DivisionExperience } from "@/features/division/division-experience";
import { divisionContent } from "@/constants/divisions";

export const metadata: Metadata = {
  title: "Aesthetic Clinic · Skin & Advanced Treatments",
  description:
    "A calm, clinically-precise sanctuary for science-led facials and advanced aesthetics at The Beauty Room by Nilu, Ratnapura.",
};

export default function ClinicPage() {
  return <DivisionExperience content={divisionContent.clinic} />;
}
