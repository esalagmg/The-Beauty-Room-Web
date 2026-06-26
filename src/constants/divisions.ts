import type { Division } from "@/types";
import { brand, img } from "./images";

export interface DivisionProcessStep {
  title: string;
  description: string;
}

export interface DivisionContent {
  division: Division;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heroImage: string;
  heroSecondary: string;
  philosophyTitle: string;
  philosophyBody: string[];
  philosophyImage: string;
  signature: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
  };
  process: DivisionProcessStep[];
  /** Visual personality tokens. */
  theme: {
    heroBg: string;
    pageTone: "cream" | "pearl" | "clinic";
    altTone: "cream" | "pearl" | "clinic";
  };
}

export const divisionContent: Record<Division, DivisionContent> = {
  salon: {
    division: "salon",
    eyebrow: "The Salon · Hair · Bridal · Makeup",
    title: "Where style becomes",
    titleAccent: "self-expression.",
    intro:
      "A warm, fashion-led atelier for couture hair, unforgettable bridal artistry and luminous makeup, crafted by a stylist who treats every chair as a canvas.",
    heroImage: brand.hairBlowout,
    heroSecondary: brand.bridalArch,
    philosophyTitle: "Editorial by instinct, warm by nature.",
    philosophyBody: [
      "The salon is the beating heart of The Beauty Room: a space designed to feel less like an appointment and more like an afternoon with someone who simply gets you.",
      "From a precision cut to a full bridal trousseau, every service begins with listening. Because the most beautiful results are the ones that look unmistakably like you.",
    ],
    philosophyImage: brand.hairSleek,
    signature: {
      eyebrow: "Signature Experience",
      title: "The Bridal Atelier",
      body: "An unhurried, full-day ritual of makeup, hairstyling and draping, with a dedicated trial to perfect every detail long before the moment arrives.",
      image: brand.bridalRoses,
    },
    process: [
      { title: "Consult", description: "We listen, study your features and shape a vision together." },
      { title: "Craft", description: "Your artist works with couture technique and the finest products." },
      { title: "Reveal", description: "The moment of transformation, refined until it feels right." },
      { title: "Care", description: "You leave with rituals to keep the result alive at home." },
    ],
    theme: {
      heroBg: "bg-champagne-gradient",
      pageTone: "cream",
      altTone: "pearl",
    },
  },
  clinic: {
    division: "clinic",
    eyebrow: "Aesthetic Clinic · Skin · Advanced · Wellness",
    title: "Where science meets",
    titleAccent: "serenity.",
    intro:
      "A calm, clinically-precise sanctuary for result-driven facials and advanced aesthetics, delivered with medical rigour and an unwavering focus on natural results.",
    heroImage: img.clinicGlow,
    heroSecondary: brand.clinicFacial,
    philosophyTitle: "Considered. Clinical. Quietly powerful.",
    philosophyBody: [
      "Our aesthetic clinic brings advanced, evidence-based treatments together with the serenity of a five-star spa: minimal, white, and reassuringly precise.",
      "Every protocol begins with a thorough skin diagnostic, so your treatment plan is built on data and dermatological insight, never guesswork.",
    ],
    philosophyImage: img.clinicSkin,
    signature: {
      eyebrow: "Signature Treatment",
      title: "HydraGlow Facial",
      body: "A deeply restorative ritual of cleansing, gentle resurfacing, painless extraction and intense hydration, for visibly luminous, camera-ready skin.",
      image: img.clinicTreatment,
    },
    process: [
      { title: "Diagnose", description: "An in-depth skin analysis maps your needs and goals." },
      { title: "Prescribe", description: "A tailored, medical-grade protocol designed around your skin." },
      { title: "Treat", description: "Advanced treatments delivered in private, clinically-calm suites." },
      { title: "Sustain", description: "A home-care regimen to protect and prolong your results." },
    ],
    theme: {
      heroBg: "bg-clinic-gradient",
      pageTone: "clinic",
      altTone: "pearl",
    },
  },
};
