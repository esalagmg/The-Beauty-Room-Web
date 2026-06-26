"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { useIsDesktop } from "@/hooks/use-media-query";
import { brand, img } from "@/constants/images";
import { cn } from "@/lib/utils";

const panels = [
  {
    id: "salon",
    href: "/salon",
    label: "The Salon",
    title: "Warm. Fashion-led. Unmistakably you.",
    description:
      "Couture hair, bridal artistry and luminous makeup in a warm, editorial setting.",
    tags: ["Hair", "Bridal", "Makeup"],
    image: brand.hairBlowout,
    tone: "warm",
  },
  {
    id: "clinic",
    href: "/clinic",
    label: "Aesthetic Clinic",
    title: "Clinical. Considered. Quietly powerful.",
    description:
      "Science-led facials and advanced aesthetics delivered with medical precision.",
    tags: ["Skin", "Advanced", "Wellness"],
    image: img.clinicGlow,
    tone: "cool",
  },
] as const;

export function ExperienceSelector() {
  const [active, setActive] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  return (
    <section className="relative bg-ink-gradient py-24 md:py-28">
      <div className="grain" />
      <div className="container relative z-10 mb-12 flex flex-col items-center text-center">
        <Eyebrow tone="light">Two worlds, one standard</Eyebrow>
        <Reveal>
          <h2 className="mt-5 max-w-2xl font-serif text-display-sm font-light leading-[1.05] text-cream">
            Choose your <span className="italic text-gold-foil-light">experience</span>
          </h2>
        </Reveal>
      </div>

      {/* Panels */}
      <div className="container relative z-10 flex flex-col gap-4 lg:h-[560px] lg:flex-row">
        {panels.map((panel) => {
          const isActive = active === panel.id;
          const isDimmed = active !== null && !isActive;
          // On touch/mobile there is no hover — always reveal the description.
          const expanded = !isDesktop || isActive;
          return (
            <motion.div
              key={panel.id}
              onMouseEnter={() => isDesktop && setActive(panel.id)}
              onMouseLeave={() => isDesktop && setActive(null)}
              animate={{ flexGrow: isDesktop ? (isActive ? 1.6 : isDimmed ? 0.7 : 1) : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[440px] flex-1 overflow-hidden rounded-[32px] sm:h-[420px] lg:h-full"
            >
              <Link href={panel.href} data-cursor-label="Enter" className="block h-full w-full">
                {/* image */}
                <motion.div
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={panel.image}
                    alt={panel.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    wrapperClassName="h-full w-full"
                  />
                </motion.div>

                {/* tint */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    panel.tone === "warm"
                      ? "bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
                      : "bg-gradient-to-t from-graphite/75 via-graphite/20 to-transparent",
                  )}
                />

                {/* content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-gold-soft/70" />
                    <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-soft">
                      {panel.label}
                    </span>
                  </div>
                  <h3 className="mt-4 max-w-sm font-serif text-3xl font-light leading-snug text-cream md:text-4xl">
                    {panel.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expanded ? "auto" : 0,
                      opacity: expanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
                      {panel.description}
                    </p>
                  </motion.div>

                  <div className="mt-5 flex items-center gap-3">
                    {panel.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream/25 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-luxe text-cream">
                    Enter experience
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
