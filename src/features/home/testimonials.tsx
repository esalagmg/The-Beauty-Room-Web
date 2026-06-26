"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play, Quote, Star } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow } from "@/components/ui/typography";
import { testimonials } from "@/constants/testimonials";
import type { Testimonial } from "@/types";
import { useIsDesktop } from "@/hooks/use-media-query";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <article className="relative flex h-full w-[82vw] shrink-0 flex-col overflow-hidden rounded-[28px] border border-cream/10 bg-white/[0.04] p-7 backdrop-blur sm:w-[440px]">
      <Quote className="h-8 w-8 text-gold/40" />
      <p className="mt-5 flex-1 text-pretty font-serif text-2xl font-light leading-snug text-cream/90">
        {t.quote}
      </p>

      <div className="mt-7 flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <SmartImage
            src={t.image ?? ""}
            alt={t.name}
            fill
            sizes="56px"
            className="object-cover"
            wrapperClassName="h-full w-full"
          />
          {t.isVideo && (
            <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <Play className="h-4 w-4 fill-cream text-cream" />
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-serif text-lg text-cream">{t.name}</p>
          <p className="font-sans text-[0.62rem] uppercase tracking-wide2 text-gold-soft">
            {t.service}
          </p>
        </div>
        <div className="text-right">
          <Stars n={t.rating} />
          <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/40">
            {t.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  const header = (
    <div className="flex items-end justify-between gap-6">
      <div>
        <Eyebrow tone="light">In their words</Eyebrow>
        <h2 className="mt-5 font-serif text-display-sm font-light leading-[1.04] text-cream">
          Loved, <span className="italic text-gold-foil-light">unanimously</span>
        </h2>
      </div>
      <div className="hidden shrink-0 items-center gap-3 rounded-full border border-cream/15 px-5 py-3 sm:flex">
        <div className="text-right">
          <p className="font-serif text-2xl text-cream">4.9</p>
          <Stars n={5} />
        </div>
        <div className="h-8 w-px bg-cream/15" />
        <p className="max-w-[7rem] font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/50">
          Across Google &amp; Instagram
        </p>
      </div>
    </div>
  );

  // On desktop: pinned horizontal scroll. On mobile: native horizontal swipe.
  if (!isDesktop) {
    return (
      <section className="relative overflow-hidden bg-ink-gradient py-24">
        <div className="grain" />
        <div className="container relative z-10">{header}</div>
        <div className="mt-12 flex gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-ink-gradient">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="grain" />
        <div className="container relative z-10">{header}</div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-10 mt-14 flex h-[340px] gap-6 pl-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))]"
        >
          {testimonials.map((t) => (
            <Card key={t.id} t={t} />
          ))}
          {/* tail CTA card */}
          <div className="flex h-full w-[360px] shrink-0 flex-col items-start justify-center rounded-[28px] border border-dashed border-cream/20 p-8">
            <p className="font-serif text-3xl font-light text-cream">
              Your story <span className="italic text-gold-soft">next.</span>
            </p>
            <p className="mt-3 text-sm text-cream/60">
              Join thousands who found their confidence with us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
