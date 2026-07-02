import { DivisionHero } from "./division-hero";
import {
  AboutSection,
  FeatureGrid,
  ServicesMenu,
  SignatureSection,
  ProcessRow,
  TeamSection,
  BookingSection,
  CtaBand,
} from "./division-sections";
import { divisionContent } from "@/constants/divisions";
import { serviceCategories } from "@/constants/services";
import { specialistsFor } from "@/constants/specialists";
import type { ServiceCategory, Specialist } from "@/types";

const content = divisionContent.salon;

/**
 * The dedicated /salon experience — a warm, fashion-led editorial journey that
 * guides visitors from discovery to booking. Server-rendered; interactivity is
 * isolated to the hero and section-level reveal components.
 */
export function SalonExperience({
  categories: categoriesProp,
  artist: artistProp,
}: {
  categories?: ServiceCategory[];
  artist?: Specialist;
}) {
  const categories =
    categoriesProp ?? serviceCategories.filter((c) => c.division === "salon");
  const artist = artistProp ?? specialistsFor("salon")[0];

  return (
    <>
      <DivisionHero content={content} />
      <AboutSection content={content} showSecondary={false} />
      <FeatureGrid content={content} />
      <ServicesMenu content={content} categories={categories} />
      <SignatureSection content={content} />
      <ProcessRow content={content} />
      {artist && <TeamSection content={content} artist={artist} />}
      <BookingSection content={content} />
      <CtaBand content={content} />
    </>
  );
}
