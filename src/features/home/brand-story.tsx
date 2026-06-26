"use client";

import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { brand } from "@/constants/images";
import { siteConfig } from "@/constants/site";

export function BrandStory() {
  return (
    <Section id="story" tone="cream" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ── Imagery ──────────────────────────────────────────── */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[36px] shadow-luxe lg:ml-6">
            <Parallax speed={0.12} className="h-[118%] w-full">
              <SmartImage
                src={brand.founder}
                alt="Nilu, Founder & Creative Director of The Beauty Room"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
          </div>

          {/* floating stat card */}
          <Reveal
            direction="up"
            delay={0.2}
            className="glass absolute -bottom-8 -right-2 w-52 rounded-3xl p-5 shadow-luxe sm:right-6 lg:-right-6"
          >
            <p className="font-serif text-5xl font-light text-graphite">12+</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-wide2 text-taupe">
              Years perfecting the craft of beauty
            </p>
          </Reveal>

          {/* vertical accent */}
          <span className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 font-sans text-[0.6rem] uppercase tracking-luxe text-taupe lg:block">
            The Founder
          </span>
        </div>

        {/* ── Story ────────────────────────────────────────────── */}
        <div>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-6 font-serif text-display-sm font-light leading-[1.05] text-graphite">
            <TextReveal text="A sanctuary built on artistry," />{" "}
            <span className="italic text-gold-foil">
              <TextReveal text="science & quiet luxury." delay={0.2} />
            </span>
          </h2>

          <Reveal delay={0.1} className="mt-7 space-y-5 text-pretty leading-relaxed text-charcoal/80">
            <p>
              The Beauty Room began with a single conviction: that beauty is not
              about transformation, but revelation. Founded by {siteConfig.founder},
              a master artist with over a decade behind the chair and in the
              treatment room, it has become Ratnapura&apos;s quietly-celebrated address
              for those who expect more.
            </p>
            <p>
              Under one roof we bring together a fashion-led hair &amp; bridal salon
              and an advanced aesthetic clinic; two distinct worlds, one obsessive
              standard of care.
            </p>
          </Reveal>

          {/* signature */}
          <Reveal delay={0.2} className="mt-8 flex items-center gap-5">
            <div>
              <p className="font-serif text-3xl italic text-gold-deep">Nilu</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wide2 text-taupe">
                Founder &amp; Creative Director
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-9">
            <Button href="/salon" variant="outline" withArrow cursorLabel="Explore">
              Discover the experience
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
