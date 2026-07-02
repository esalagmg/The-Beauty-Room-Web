"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Parallax } from "@/components/ui/parallax";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import type { DivisionContent } from "@/constants/divisions";
import { cn } from "@/lib/utils";

/**
 * Immersive, cinematic hero for the /salon and /clinic pages. Kinetic headline,
 * layered editorial image stack, ambient glow, floating CTA and a scroll cue.
 */
export function DivisionHero({ content }: { content: DivisionContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const isSalon = content.division === "salon";

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 lg:pb-16",
        content.theme.heroBg,
      )}
    >
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -right-32 top-1/4 h-[520px] w-[520px] rounded-full blur-[130px]",
            isSalon ? "bg-champagne/40" : "bg-platinum/60",
          )}
        />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-white/30 blur-[120px]" />
      </div>
      <div className="grain" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-8"
      >
        {/* ── Copy ─────────────────────────────────────────── */}
        <div className="lg:col-span-6">
          <Reveal direction="up">
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>

          <h1 className="mt-6 font-serif text-[clamp(2.75rem,6.4vw,6rem)] font-light leading-[0.98] text-graphite">
            <span className="block overflow-hidden pb-[0.12em]">
              <TextReveal text={content.title} />
            </span>
            <span className="block overflow-hidden pb-[0.12em] italic text-gold-foil">
              <TextReveal text={content.titleAccent} delay={0.12} />
            </span>
          </h1>

          <Reveal delay={0.25}>
            <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-charcoal/80 md:text-lg">
              {content.intro}
            </p>
          </Reveal>

          <Reveal delay={0.35} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Magnetic strength={0.18} max={12} className="w-full sm:w-auto">
              <Link
                href={`/booking?division=${content.division}`}
                data-cursor-label="Book"
                className="flex h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-graphite px-8 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors duration-500 hover:bg-ink sm:w-auto"
              >
                Book {isSalon ? "the Salon" : "a Treatment"}
              </Link>
            </Magnetic>
            <Button
              href="/#contact"
              variant="outline"
              className="h-[56px] w-full sm:w-auto"
            >
              Enquire
            </Button>
          </Reveal>
        </div>

        {/* ── Editorial image stack ────────────────────────── */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md sm:max-w-lg"
          >
            {/* main frame */}
            <div className="absolute inset-0 overflow-hidden rounded-[36px] shadow-luxe">
              <Parallax speed={0.12} className="h-[118%] w-full">
                <SmartImage
                  src={content.heroImage}
                  alt={`${content.title} ${content.titleAccent}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </Parallax>
            </div>

            {/* floating secondary */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-6 h-40 w-32 overflow-hidden rounded-3xl border-4 border-cream shadow-luxe sm:h-52 sm:w-40"
            >
              <SmartImage
                src={content.heroSecondary}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </motion.div>

            {/* floating tertiary (desktop) */}
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-10 hidden h-36 w-28 overflow-hidden rounded-3xl border-4 border-cream shadow-luxe md:block"
            >
              <SmartImage
                src={content.heroTertiary}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </motion.div>

            {/* est. badge — heritage marker (salon only) */}
            {isSalon && (
              <div className="absolute -right-4 -top-5 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-graphite text-center text-cream shadow-luxe sm:h-24 sm:w-24">
                <span className="font-serif text-lg font-light leading-none sm:text-xl">1998</span>
                <span className="mt-1 font-sans text-[0.42rem] uppercase tracking-wide2 text-cream/60">
                  Established
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-taupe">
          {content.heroScrollLabel}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-gold-deep" />
        </motion.span>
      </motion.div>
    </section>
  );
}
