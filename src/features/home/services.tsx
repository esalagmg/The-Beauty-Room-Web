"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { Parallax } from "@/components/ui/parallax";
import { serviceCategories } from "@/constants/services";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" tone="cream">
      {/* header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>The Services</Eyebrow>
          <Reveal>
            <h2 className="mt-5 max-w-xl font-serif text-display-sm font-light leading-[1.04] text-graphite">
              A curated menu of{" "}
              <span className="italic text-gold-foil">signature rituals</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-charcoal/70">
            From the styling chair to the treatment suite, each service is an
            unhurried, considered experience designed around you.
          </p>
        </Reveal>
      </div>

      {/* alternating editorial rows */}
      <div className="mt-20 space-y-24 md:space-y-32">
        {serviceCategories.map((cat, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={cat.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* image */}
              <div className={cn("relative", reversed && "lg:order-2")}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-luxe">
                  <Parallax speed={0.1} className="h-[120%] w-full">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full"
                    >
                      <SmartImage
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        className="object-cover"
                        wrapperClassName="h-full w-full"
                      />
                    </motion.div>
                  </Parallax>
                  <span className="absolute left-6 top-6 rounded-full bg-cream/85 px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-graphite backdrop-blur">
                    {cat.division === "salon" ? "Salon" : "Aesthetic Clinic"}
                  </span>
                </div>
              </div>

              {/* content */}
              <div className={cn(reversed && "lg:order-1")}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl font-light italic text-gold/70 tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span className="h-px flex-1 bg-stone/60" />
                  <span className="font-sans text-[0.62rem] uppercase tracking-luxe text-taupe">
                    {cat.tagline}
                  </span>
                </div>

                <Reveal direction={reversed ? "left" : "right"}>
                  <h3 className="mt-5 font-serif text-4xl font-light text-graphite md:text-5xl">
                    {cat.name}
                  </h3>
                  <p className="mt-4 max-w-md text-pretty leading-relaxed text-charcoal/75">
                    {cat.description}
                  </p>
                </Reveal>

                {/* service list */}
                <ul className="mt-7 divide-y divide-stone/40 border-y border-stone/40">
                  {cat.services.slice(0, 3).map((s) => (
                    <li key={s.id} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span className="flex items-center gap-2.5">
                        {s.highlight && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                        )}
                        <span className="font-sans text-sm text-graphite">{s.name}</span>
                      </span>
                      <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe">
                        {s.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?division=${cat.division}&category=${cat.id}`}
                  data-cursor-label="Book"
                  className="group mt-7 inline-flex items-center gap-2.5 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite"
                >
                  <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-graphite">
                    Explore &amp; book {cat.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
