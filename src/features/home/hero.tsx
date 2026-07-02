"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, Scissors, Sparkles, Star } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Magnetic } from "@/components/ui/magnetic";
import { FloatingBookingWidget } from "./floating-booking-widget";
import { brand, img } from "@/constants/images";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

const headlineLines = [
  [{ text: "Luxury Begins", gold: false }],
  [{ text: "With ", gold: false }, { text: "Confidence.", gold: true }],
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineVariant: Variants = {
  // Start well below the (descender-padded) mask so no glyph peeks pre-reveal.
  hidden: { y: "140%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.5 + i * 0.12 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // The line-reveal needs `overflow-hidden` to mask each line as it slides up,
  // but that same clip cuts the descenders (the tails of "g"/"y") once settled.
  // So we only clip during the animation and release it the moment the last
  // line finishes — giving a clean reveal AND full descenders with tight leading.
  const [revealed, setRevealed] = useState(false);

  // Pointer-reactive ambient glow — moved with a GPU transform (cheap) rather
  // than repainting a full-screen radial gradient every frame.
  const mx = useSpring(0.5, { stiffness: 50, damping: 22 });
  const my = useSpring(0.5, { stiffness: 50, damping: 22 });
  const glowX = useTransform(mx, [0, 1], ["-30%", "30%"]);
  const glowY = useTransform(my, [0, 1], ["-30%", "30%"]);

  // parallax on the floating images, tied to a subtle pointer tilt
  const tiltX = useTransform(mx, [0, 1], [10, -10]);
  const tiltY = useTransform(my, [0, 1], [8, -8]);

  // scroll dissolve
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex w-full items-center overflow-hidden bg-champagne-gradient pb-20 pt-28 lg:min-h-[100svh] lg:pb-0 lg:pt-24"
    >
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-champagne/40 blur-[110px] will-change-transform"
        />
      </div>
      <div className="grain" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-white/25 blur-[120px]" />

      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        {/* ── Content ─────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-7"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-sans text-[0.7rem] uppercase tracking-luxe text-gold-deep">
              {siteConfig.tagline} · Ratnapura
            </span>
          </motion.div>

          <h1 className="mt-6 font-serif font-light leading-[1.02] text-graphite">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className={cn(
                  "block pb-[0.14em]",
                  !revealed && "overflow-hidden",
                )}
              >
                <motion.span
                  className="block text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02]"
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="show"
                  onAnimationComplete={() => {
                    if (i === headlineLines.length - 1) setRevealed(true);
                  }}
                >
                  {line.map((part, j) => (
                    <span
                      key={j}
                      className={part.gold ? "italic text-gold-foil" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-7 max-w-md text-pretty text-base leading-relaxed text-charcoal/80"
          >
            Sri Lanka&apos;s destination for couture hair, bridal artistry and
            science-led aesthetics, where every detail is composed to make you
            feel unmistakably yourself.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Magnetic strength={0.18} max={12} className="w-full sm:w-auto">
              <Link
                href="/booking?division=salon"
                data-cursor-label="Salon"
                className="group flex h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-graphite px-8 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors duration-500 hover:bg-ink sm:w-auto"
              >
                <Scissors className="h-4 w-4" />
                Book Salon
              </Link>
            </Magnetic>
            <Magnetic strength={0.18} max={12} className="w-full sm:w-auto">
              <Link
                href="/booking?division=clinic"
                data-cursor-label="Clinic"
                className="group flex h-[56px] w-full items-center justify-center gap-2.5 rounded-full border border-graphite/30 px-8 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite transition-colors duration-500 hover:border-graphite hover:bg-white/40 sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />
                Book Aesthetic Clinic
              </Link>
            </Magnetic>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex">
              {[brand.bridalRoses, brand.hairSleek, brand.clinicFacial].map((src, i) => (
                <span
                  key={i}
                  className="relative -ml-3 h-10 w-10 overflow-hidden rounded-full border-2 border-cream first:ml-0"
                >
                  <SmartImage src={src} alt="Client" fill className="object-cover" wrapperClassName="h-full w-full" sizes="40px" />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wide2 text-taupe">
                {siteConfig.experienceLabel}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Visual stack ────────────────────────────────────── */}
        <div className="relative lg:col-span-5">
          <motion.div
            style={{ rotateX: tiltY, rotateY: tiltX }}
            className="perspective relative mx-auto aspect-[3/4] w-full max-w-sm preserve-3d"
          >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <SmartImage
                src={img.heroSalon}
                alt="Bridal beauty by The Beauty Room"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 36vw"
                className="object-cover"
                wrapperClassName="h-full w-full rounded-[32px] shadow-luxe"
              />
            </motion.div>

            {/* floating secondary image */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-8 hidden h-40 w-32 overflow-hidden rounded-3xl border-4 border-cream shadow-luxe sm:block"
            >
              <SmartImage
                src={img.heroHair}
                alt="Hair styling"
                fill
                sizes="128px"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </motion.div>

            {/* rotating seal */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute -left-7 top-10 hidden h-24 w-24 lg:block"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="seal" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-graphite/70 font-sans text-[8.5px] uppercase tracking-[0.32em]">
                  <textPath href="#seal">
                    Est. 1998 · Quiet Luxury · The Beauty Room ·
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating booking widget */}
          <div className="mt-8 flex justify-center lg:absolute lg:-bottom-10 lg:-left-12 lg:mt-0 lg:justify-start">
            <FloatingBookingWidget />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-taupe">
          Scroll
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
