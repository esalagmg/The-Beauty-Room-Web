import type { Division } from "@/types";
import { brand, img } from "./images";

/* ────────────────────────────────────────────────────────────────
 * Rich, editorial content for the dedicated /salon and /clinic pages.
 * Each division has its own personality (warm & fashion-led vs. light &
 * clinical) while sharing the brand's typography, colour and motion system.
 * ──────────────────────────────────────────────────────────────── */

export type IconKey =
  | "scissors"
  | "gem"
  | "sparkles"
  | "leaf"
  | "shield"
  | "hands"
  | "award"
  | "users"
  | "microscope"
  | "flask"
  | "syringe"
  | "droplet"
  | "stethoscope"
  | "wand"
  | "clock"
  | "heart";

export interface DivisionStat {
  value: string;
  label: string;
}

export interface DivisionFeature {
  icon: IconKey;
  title: string;
  description: string;
}

export interface DivisionProcessStep {
  title: string;
  description: string;
}

export interface DivisionTreatment {
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  benefits: string[];
}

export interface DivisionFaq {
  q: string;
  a: string;
}

export interface DivisionContent {
  division: Division;

  // Hero
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heroImage: string;
  heroSecondary: string;
  heroTertiary: string;
  heroScrollLabel: string;

  // About
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    image: string;
    imageSecondary: string;
    stats: DivisionStat[];
  };

  // Why choose / features
  features: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: DivisionFeature[];
  };

  // Signature experience
  signature: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    points: string[];
    /** Optional quick-facts shown on the decorative (non-photo) panel variant. */
    stats?: DivisionStat[];
  };

  // Process journey
  process: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    steps: DivisionProcessStep[];
  };

  // Booking experience
  booking: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    steps: DivisionProcessStep[];
  };

  // Clinic-only editorial sections (optional on salon)
  treatments?: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    intro: string;
    items: DivisionTreatment[];
  };
  technology?: {
    eyebrow: string;
    title: string;
    body: string[];
    image: string;
    highlights: DivisionFeature[];
  };
  safety?: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    image: string;
    items: DivisionFeature[];
  };
  faqs?: {
    eyebrow: string;
    title: string;
    items: DivisionFaq[];
  };

  // Visual personality tokens
  theme: {
    heroBg: string;
    pageTone: "cream" | "pearl" | "clinic";
    altTone: "cream" | "pearl" | "clinic";
  };
}

export const divisionContent: Record<Division, DivisionContent> = {
  /* ═══════════════════════════ SALON ═══════════════════════════ */
  salon: {
    division: "salon",
    eyebrow: "The Salon · Hair · Bridal · Makeup",
    title: "Where style becomes",
    titleAccent: "self-expression.",
    intro:
      "A warm, fashion-led atelier for couture hair, unforgettable bridal artistry and luminous makeup, crafted by an artist who treats every chair as a canvas.",
    heroImage: brand.hairBlowout,
    heroSecondary: brand.bridalArch,
    heroTertiary: brand.hairSleek,
    heroScrollLabel: "Discover the salon",

    about: {
      eyebrow: "The House",
      title: "Twenty-eight years of quiet, couture beauty.",
      body: [
        "Since 1998, The Beauty Room has been Ratnapura's address for hair and bridal artistry that feels less like an appointment and more like an afternoon with someone who simply understands you.",
        "Every visit is unhurried and personal. From a precision cut to a full bridal trousseau, the work begins with listening, because the most beautiful results are the ones that look unmistakably like you.",
      ],
      image: brand.hairSleek,
      imageSecondary: brand.bridalRoses,
      stats: [
        { value: "1998", label: "Established" },
        { value: "28+", label: "Years of excellence" },
        { value: "10k+", label: "Looks created" },
        { value: "5.0", label: "Guest rating" },
      ],
    },

    features: {
      eyebrow: "Why The Beauty Room",
      title: "The difference is in the",
      titleAccent: "details.",
      items: [
        {
          icon: "scissors",
          title: "Experienced stylists",
          description:
            "Couture-trained hands led personally by Nilu, with nearly three decades of cutting, colour and bridal mastery.",
        },
        {
          icon: "gem",
          title: "Premium products",
          description:
            "Only professional, salon-grade colour and care, chosen to protect the integrity and shine of your hair.",
        },
        {
          icon: "leaf",
          title: "Hygienic environment",
          description:
            "Tools sterilised between every guest and a serene, spotless space designed for complete peace of mind.",
        },
        {
          icon: "hands",
          title: "Personalised consultations",
          description:
            "Every service opens with a considered consultation, so the result is shaped entirely around you.",
        },
        {
          icon: "sparkles",
          title: "Modern techniques",
          description:
            "Balayage, keratin, editorial makeup and the latest styling craft, continually refined and up to date.",
        },
        {
          icon: "award",
          title: "A trusted name",
          description:
            "Generations of brides and regulars who return, because trust is the truest measure of luxury.",
        },
      ],
    },

    signature: {
      eyebrow: "Signature Experience",
      title: "The Bridal Atelier",
      body: "An unhurried, full-day ritual of makeup, hairstyling and draping, with a dedicated trial to perfect every detail long before the moment arrives.",
      image: brand.bridalRoses,
      points: [
        "Personal bridal trial & mood consultation",
        "Full makeup, hair & saree draping on the day",
        "Touch-up kit and on-call support",
      ],
    },

    process: {
      eyebrow: "The Experience",
      title: "Four steps to",
      titleAccent: "transformation.",
      steps: [
        { title: "Consult", description: "We listen, study your features and shape a vision together." },
        { title: "Craft", description: "Your artist works with couture technique and the finest products." },
        { title: "Reveal", description: "The moment of transformation, refined until it feels right." },
        { title: "Care", description: "You leave with rituals to keep the result alive at home." },
      ],
    },

    booking: {
      eyebrow: "Booking Experience",
      title: "Reserving your chair is",
      titleAccent: "effortless.",
      body: "Choose your service and time online in under a minute. We confirm every appointment personally over WhatsApp, so you always speak to a real person.",
      steps: [
        { title: "Choose", description: "Pick your service, artist and a time that suits you." },
        { title: "Confirm", description: "We reach out on WhatsApp to personally confirm the details." },
        { title: "Relax", description: "Arrive to a prepared chair and a team expecting you by name." },
      ],
    },

    theme: {
      heroBg: "bg-champagne-gradient",
      pageTone: "cream",
      altTone: "pearl",
    },
  },

  /* ═══════════════════════════ CLINIC ═══════════════════════════ */
  clinic: {
    division: "clinic",
    eyebrow: "Aesthetic Clinic · Skin · Advanced · Wellness",
    title: "Where science meets",
    titleAccent: "serenity.",
    intro:
      "A calm, clinically-precise sanctuary for result-driven facials and advanced aesthetics, delivered with medical rigour and an unwavering focus on natural results.",
    heroImage: brand.clinicProcedure,
    heroSecondary: brand.clinicLaser,
    heroTertiary: brand.clinicFacial,
    heroScrollLabel: "Explore treatments",

    about: {
      eyebrow: "The Clinic",
      title: "Advanced skin care, delivered with medical calm.",
      body: [
        "Our aesthetic clinic brings evidence-based treatments together with the serenity of a five-star spa, minimal, light and reassuringly precise.",
        "Every protocol begins with a thorough skin diagnostic, so your plan is built on data and dermatological insight, never guesswork. The result: visible, natural change and skin that looks like the healthiest version of your own.",
      ],
      image: brand.clinicFacial,
      imageSecondary: brand.clinicProcedure,
      stats: [
        { value: "12+", label: "Advanced protocols" },
        { value: "100%", label: "Consultation-first" },
        { value: "5.0", label: "Guest rating" },
      ],
    },

    features: {
      eyebrow: "The Standard",
      title: "Clinical care, held to a",
      titleAccent: "higher standard.",
      items: [
        {
          icon: "stethoscope",
          title: "Professional care",
          description:
            "Treatments led with medical discipline and a genuine duty of care for your skin's long-term health.",
        },
        {
          icon: "flask",
          title: "Advanced treatments",
          description:
            "Result-driven technologies and medical-grade actives, matched precisely to your skin's needs.",
        },
        {
          icon: "shield",
          title: "Safety first",
          description:
            "Sterile protocols, patch testing and honest guidance on what is, and isn't, right for you.",
        },
        {
          icon: "microscope",
          title: "Skin diagnostics",
          description:
            "Every plan starts with an in-depth analysis, so decisions are made on data, not guesswork.",
        },
      ],
    },

    signature: {
      eyebrow: "Signature Treatment",
      title: "HydraGlow Facial",
      body: "A deeply restorative ritual of cleansing, gentle resurfacing, painless extraction and intense hydration, for visibly luminous, camera-ready skin with zero downtime.",
      image: img.clinicTreatment,
      points: [
        "Painless deep-cleanse & extraction",
        "Medical-grade hydration & serums",
        "Immediate glow, no downtime",
      ],
      stats: [
        { value: "60 min", label: "Per session" },
        { value: "Zero", label: "Downtime" },
        { value: "Instant", label: "Visible glow" },
      ],
    },

    process: {
      eyebrow: "The Journey",
      title: "Your treatment,",
      titleAccent: "step by step.",
      steps: [
        { title: "Consultation", description: "We understand your concerns, history and goals in a private sitting." },
        { title: "Assessment", description: "An in-depth skin analysis maps your needs and builds a tailored plan." },
        { title: "Treatment", description: "Advanced protocols delivered in clinically-calm, private suites." },
        { title: "Aftercare", description: "A home-care regimen to protect, soothe and prolong your results." },
        { title: "Follow-up", description: "We review your progress and refine the plan as your skin evolves." },
      ],
    },

    booking: {
      eyebrow: "Booking Experience",
      title: "Begin with a",
      titleAccent: "consultation.",
      body: "Reserve online in under a minute. Every aesthetic journey opens with a consultation, and we confirm your appointment personally over WhatsApp, so your questions are answered before you arrive.",
      steps: [
        { title: "Request", description: "Choose a treatment or a consultation and a time that suits you." },
        { title: "Confirm", description: "We reach out on WhatsApp to confirm details and answer questions." },
        { title: "Arrive", description: "Step into a calm, private suite, fully prepared for your visit." },
      ],
    },

    treatments: {
      eyebrow: "The Treatments",
      title: "Editorial skin science,",
      titleAccent: "tailored to you.",
      intro:
        "A curated menu of advanced aesthetic treatments. Every protocol is personalised at consultation, prices shown are a starting guide.",
      items: [
        {
          name: "Skin Rejuvenation",
          tagline: "Glow & renewal",
          description:
            "A bespoke resurfacing facial that revives dull, tired skin, restoring clarity, softness and a lit-from-within glow.",
          duration: "60 min",
          price: "from LKR 9,500",
          benefits: ["Brighter, even tone", "Smoother texture", "Zero downtime"],
        },
        {
          name: "HydraGlow Facial",
          tagline: "Deep hydration",
          description:
            "Cleansing, gentle exfoliation, painless extraction and intense hydration in one restorative, camera-ready ritual.",
          duration: "60 min",
          price: "from LKR 12,000",
          benefits: ["Instant luminosity", "Painless extraction", "Plump, hydrated skin"],
        },
        {
          name: "Acne Treatments",
          tagline: "Clarity & control",
          description:
            "A targeted, medical-grade programme to calm active breakouts, decongest pores and bring lasting balance to the skin.",
          duration: "45–60 min",
          price: "from LKR 8,500",
          benefits: ["Calms breakouts", "Reduces congestion", "Long-term control"],
        },
        {
          name: "Pigmentation Correction",
          tagline: "Even, clear tone",
          description:
            "Advanced brightening protocols that fade dark spots, melasma and sun damage for a visibly more even complexion.",
          duration: "45 min",
          price: "from LKR 11,000",
          benefits: ["Fades dark spots", "Evens tone", "Restores clarity"],
        },
        {
          name: "Chemical Peels",
          tagline: "Resurface & refine",
          description:
            "Medical-grade peels tailored in strength to refine tone, texture and clarity while stimulating fresh cell renewal.",
          duration: "45 min",
          price: "from LKR 11,000",
          benefits: ["Refined texture", "Renewed clarity", "Controlled strength"],
        },
        {
          name: "Laser Rejuvenation",
          tagline: "Precision correction",
          description:
            "Targeted laser therapy that addresses pigmentation and uneven tone for a clearer, brighter, more uniform complexion.",
          duration: "60 min",
          price: "from LKR 18,000",
          benefits: ["Targets pigment", "Even complexion", "Collagen boost"],
        },
        {
          name: "Collagen Microneedling",
          tagline: "Rebuild & smooth",
          description:
            "Controlled micro-stimulation that kick-starts natural renewal to soften scars, texture and fine lines over time.",
          duration: "75 min",
          price: "from LKR 16,000",
          benefits: ["Softens scars", "Smooths lines", "Firmer skin"],
        },
        {
          name: "PRP Skin Therapy",
          tagline: "Natural regeneration",
          description:
            "Your own growth factors, applied to accelerate renewal and restore firmness, tone and a healthy, natural glow.",
          duration: "75 min",
          price: "from LKR 20,000",
          benefits: ["Natural, from you", "Boosts firmness", "Healthy radiance"],
        },
        {
          name: "Anti-Ageing Protocol",
          tagline: "Lift & firm",
          description:
            "A multi-step lifting and firming programme that visibly restores definition, bounce and youthful luminosity.",
          duration: "90 min",
          price: "from LKR 22,000",
          benefits: ["Visible lift", "Firmer contours", "Restored glow"],
        },
      ],
    },

    technology: {
      eyebrow: "Technology & Equipment",
      title: "Modern equipment, in expert hands.",
      body: [
        "The clinic is equipped with advanced, well-maintained aesthetic technology, because precise results begin with precise tools.",
        "Every device is operated to protocol by trained hands and paired with medical-grade products, so each treatment is as safe as it is effective.",
      ],
      image: brand.clinicLaser,
      highlights: [
        {
          icon: "wand",
          title: "Advanced devices",
          description: "Modern laser, microneedling and resurfacing technology, maintained to standard.",
        },
        {
          icon: "flask",
          title: "Medical-grade actives",
          description: "Professional formulations and serums selected for proven, visible results.",
        },
        {
          icon: "droplet",
          title: "Precision protocols",
          description: "Every setting matched to your skin type, concern and treatment plan.",
        },
      ],
    },

    safety: {
      eyebrow: "Safety & Expertise",
      title: "Your skin, in",
      titleAccent: "safe hands.",
      image: brand.clinicProcedure,
      items: [
        {
          icon: "award",
          title: "Certified professionals",
          description: "Treatments delivered by trained, experienced hands with a deep respect for skin health.",
        },
        {
          icon: "shield",
          title: "Sterile environment",
          description: "Single-use consumables and rigorous sterilisation between every single guest.",
        },
        {
          icon: "flask",
          title: "Medical-grade products",
          description: "Only professional, clinically-backed formulations touch your skin.",
        },
        {
          icon: "stethoscope",
          title: "Consultation-first",
          description: "Nothing begins without an honest assessment of what's right for you.",
        },
      ],
    },

    faqs: {
      eyebrow: "Good to Know",
      title: "Your questions, answered.",
      items: [
        {
          q: "Do I need a consultation before a treatment?",
          a: "Yes, every aesthetic journey begins with a consultation and skin assessment. It lets us understand your concerns, check suitability and build a plan that's genuinely right for your skin.",
        },
        {
          q: "Are the treatments painful? Is there downtime?",
          a: "Most facials and skin treatments are comfortable with little to no downtime. For advanced protocols like microneedling or laser, we explain exactly what to expect and how to care for your skin afterwards.",
        },
        {
          q: "How soon will I see results?",
          a: "Facials such as HydraGlow give an immediate glow, while treatments like microneedling, peels and pigmentation correction build progressively over a short course for lasting change.",
        },
        {
          q: "Are the treatments safe for my skin type?",
          a: "Safety is our first priority. We assess your skin type and history, patch-test where needed, and only ever recommend treatments we're confident are suitable for you.",
        },
        {
          q: "How do I prepare for my appointment?",
          a: "Arrive with clean skin where possible and let us know about any products, medication or recent treatments. We'll share any specific guidance when we confirm your booking on WhatsApp.",
        },
        {
          q: "How do I book?",
          a: "Reserve online in under a minute, or message us on WhatsApp. We personally confirm every appointment, so you always speak to a real person before your visit.",
        },
      ],
    },

    theme: {
      heroBg: "bg-clinic-gradient",
      pageTone: "clinic",
      altTone: "pearl",
    },
  },
};
