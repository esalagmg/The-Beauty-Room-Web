import { DivisionHero } from "./division-hero";
import { TreatmentsList, type TreatmentDisplay } from "./treatments-list";
import { FaqAccordion } from "./faq-accordion";
import {
  AboutSection,
  FeatureGrid,
  SignatureSection,
  ProcessVertical,
  TechnologySection,
  SafetySection,
  PractitionersSection,
  BookingSection,
  FaqHeading,
  CtaBand,
} from "./division-sections";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { divisionContent } from "@/constants/divisions";
import type { Specialist } from "@/types";

const content = divisionContent.clinic;

/**
 * The dedicated /clinic experience — a light, clinical, trustworthy journey.
 * Lighter visual identity than the salon, with an editorial treatment menu,
 * a step-by-step process, technology, safety credentials and FAQs.
 */
export function ClinicExperience({
  treatments: treatmentsProp,
  specialists = [],
}: {
  /** Live, admin-managed treatments (shown-only, with edited prices). */
  treatments?: TreatmentDisplay[];
  /** Clinic practitioners (from the admin-managed staff / static fallback). */
  specialists?: Specialist[];
}) {
  const treatments = content.treatments;
  const faqs = content.faqs;

  // Prefer the admin catalog; fall back to the editorial defaults offline.
  const treatmentItems: TreatmentDisplay[] =
    treatmentsProp && treatmentsProp.length > 0
      ? treatmentsProp
      : (treatments?.items ?? []).map((t) => ({
          name: t.name,
          category: t.tagline,
          description: t.description,
          duration: t.duration,
          price: t.price,
          benefits: t.benefits,
        }));

  return (
    <>
      <DivisionHero content={content} />
      <AboutSection content={content} showSecondary={false} />
      <FeatureGrid content={content} />

      {/* Editorial treatment menu — driven by the admin panel */}
      {treatments && treatmentItems.length > 0 && (
        <Section tone={content.theme.pageTone}>
          <div className="max-w-2xl">
            <Eyebrow>{treatments.eyebrow}</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif text-display-sm font-light leading-[1.05] text-graphite">
                {treatments.title}{" "}
                <span className="italic text-gold-foil">{treatments.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-pretty leading-relaxed text-charcoal/75">
                {treatments.intro}
              </p>
            </Reveal>
          </div>
          <TreatmentsList items={treatmentItems} />
        </Section>
      )}

      <SignatureSection content={content} variant="panel" />
      <ProcessVertical content={content} />
      <TechnologySection content={content} />
      <SafetySection content={content} />
      <PractitionersSection content={content} specialists={specialists} />

      {/* FAQs */}
      {faqs && (
        <Section tone={content.theme.pageTone}>
          <FaqHeading content={content} />
          <FaqAccordion items={faqs.items} />
        </Section>
      )}

      <BookingSection content={content} />
      <CtaBand content={content} />
    </>
  );
}
