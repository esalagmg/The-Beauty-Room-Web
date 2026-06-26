"use client";

import { ArrowUpRight, Instagram } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { specialists } from "@/constants/specialists";
import { siteConfig } from "@/constants/site";

export function Specialists() {
  const nilu = specialists[0];

  return (
    <Section id="specialists" tone="pearl" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* portrait */}
        <div className="relative order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[36px] shadow-luxe">
            <Parallax speed={0.1} className="h-[118%] w-full">
              <SmartImage
                src={nilu.image}
                alt={nilu.name}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover object-top"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>

          {/* floating experience card */}
          <Reveal
            delay={0.15}
            className="glass absolute -bottom-6 right-2 w-44 rounded-3xl p-5 shadow-luxe sm:right-6 lg:-right-4"
          >
            <p className="font-serif text-4xl font-light text-graphite">
              {nilu.experience}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-wide2 text-taupe">
              Of hands-on artistry
            </p>
          </Reveal>
        </div>

        {/* bio */}
        <div className="order-2">
          <Eyebrow>The Artist</Eyebrow>
          <Reveal>
            <h2 className="mt-5 font-serif text-display-sm font-light leading-[1.02] text-graphite">
              Meet <span className="italic text-gold-foil">Nilu</span>
            </h2>
            <p className="mt-2 font-sans text-[0.7rem] uppercase tracking-luxe text-gold-deep">
              {nilu.role}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-charcoal/80">
              {nilu.bio}
            </p>
          </Reveal>

          {/* expertise */}
          <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2.5">
            {nilu.expertise.map((e) => (
              <span
                key={e}
                className="rounded-full border border-stone/60 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-charcoal/70"
              >
                {e}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/booking" withArrow cursorLabel="Book">
              Book with Nilu
            </Button>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-wide2 text-charcoal/70 transition-colors hover:text-gold-deep"
            >
              <Instagram className="h-4 w-4" />
              {nilu.instagram}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
