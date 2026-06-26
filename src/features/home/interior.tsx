"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { interiorSpaces } from "@/constants/gallery";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Interior() {
  const [active, setActive] = useState(0);
  const space = interiorSpaces[active];

  return (
    <Section id="interior" tone="pearl">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>The Space</Eyebrow>
          <Reveal>
            <h2 className="mt-5 max-w-xl font-serif text-display-sm font-light leading-[1.04] text-graphite">
              A world designed to{" "}
              <span className="italic text-gold-foil">slow you down</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-charcoal/70">
            Every corner, from the reception to the treatment suites, is composed
            to feel like an escape from the town beyond the door.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* index */}
        <ul className="order-2 flex flex-col lg:order-1 lg:justify-center">
          {interiorSpaces.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full border-t border-stone/50 py-5 text-left last:border-b"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-serif text-sm italic tabular-nums transition-colors",
                        isActive ? "text-gold-deep" : "text-taupe",
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-2xl font-light transition-all duration-500 ease-luxe md:text-3xl",
                        isActive
                          ? "translate-x-2 text-graphite"
                          : "text-graphite/45 group-hover:text-graphite/70",
                      )}
                    >
                      {s.name}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pl-10 text-pretty text-sm leading-relaxed text-charcoal/70"
                      >
                        <span className="block pt-3">{s.description}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>

        {/* visual */}
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[36px] shadow-luxe lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={space.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <SmartImage
                src={space.image}
                alt={space.name}
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-3xl font-light text-cream">{space.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
