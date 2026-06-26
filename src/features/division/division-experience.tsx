"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { Parallax } from "@/components/ui/parallax";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { serviceCategories } from "@/constants/services";
import { specialistsFor } from "@/constants/specialists";
import type { DivisionContent } from "@/constants/divisions";
import { pad } from "@/lib/utils";

export function DivisionExperience({ content }: { content: DivisionContent }) {
  const categories = serviceCategories.filter((c) => c.division === content.division);
  const artist = specialistsFor(content.division)[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className={`relative flex min-h-[92svh] items-center overflow-hidden ${content.theme.heroBg} pt-28`}
      >
        <div className="grain" />
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal direction="up">
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="mt-6 font-serif text-[clamp(2.75rem,6vw,6rem)] font-light leading-[0.98] text-graphite">
              <TextReveal text={content.title} />{" "}
              <span className="italic text-gold-foil">
                <TextReveal text={content.titleAccent} delay={0.15} />
              </span>
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md text-pretty leading-relaxed text-charcoal/80">
                {content.intro}
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <Link
                  href={`/booking?division=${content.division}`}
                  data-cursor-label="Book"
                  className="flex h-[56px] items-center justify-center gap-2.5 rounded-full bg-graphite px-8 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors duration-500 hover:bg-ink"
                >
                  Book {content.division === "salon" ? "the salon" : "a treatment"}
                </Link>
              </Magnetic>
              <Button href="/#contact" variant="outline" magnetic>
                Enquire
              </Button>
            </Reveal>
          </div>

          {/* hero visual stack */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[34px] shadow-luxe">
              <Parallax speed={0.1} className="h-[116%] w-full">
                <SmartImage
                  src={content.heroImage}
                  alt={content.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </Parallax>
            </div>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-6 hidden h-44 w-36 overflow-hidden rounded-3xl border-4 border-cream shadow-luxe sm:block"
            >
              <SmartImage
                src={content.heroSecondary}
                alt=""
                fill
                sizes="144px"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Philosophy split ─────────────────────────────────── */}
      <Section tone={content.theme.pageTone}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[34px] shadow-luxe">
              <Parallax speed={0.12} className="h-[118%] w-full">
                <SmartImage
                  src={content.philosophyImage}
                  alt={content.philosophyTitle}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </Parallax>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>The Philosophy</Eyebrow>
            <Reveal>
              <h2 className="mt-6 font-serif text-display-sm font-light leading-[1.05] text-graphite">
                {content.philosophyTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-7 space-y-5 text-pretty leading-relaxed text-charcoal/80">
              {content.philosophyBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────── */}
      <Section tone="ink" className="overflow-hidden">
        <div className="text-center">
          <Eyebrow tone="light">The Experience</Eyebrow>
          <Reveal>
            <h2 className="mt-5 font-serif text-display-sm font-light text-cream">
              Four steps to{" "}
              <span className="italic text-gold-foil-light">
                {content.division === "salon" ? "transformation" : "radiance"}
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="relative">
              <span className="font-serif text-5xl font-light text-gold/50 tabular-nums">
                {pad(i + 1)}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-light text-cream">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{step.description}</p>
              {i < content.process.length - 1 && (
                <span className="absolute right-0 top-6 hidden h-px w-12 bg-cream/15 lg:block" />
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Services menu ────────────────────────────────────── */}
      <Section tone={content.theme.altTone}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The Menu</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-serif text-display-sm font-light text-graphite">
                Services &amp; rituals
              </h2>
            </Reveal>
          </div>
          <Button href={`/booking?division=${content.division}`} variant="outline" withArrow>
            Book any service
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Reveal key={cat.id} className="flex flex-col overflow-hidden rounded-[28px] border border-stone/40 bg-white/50">
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  wrapperClassName="h-full w-full"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl font-light text-graphite">{cat.name}</h3>
                <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe">
                  {cat.tagline}
                </p>
                <ul className="mt-5 flex-1 space-y-3 border-t border-stone/40 pt-4">
                  {cat.services.map((s) => (
                    <li key={s.id} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-graphite">{s.name}</span>
                      <span className="flex items-center gap-2 whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-wide2 text-taupe">
                        <Clock className="h-3 w-3" />
                        {s.duration}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/booking?division=${content.division}&category=${cat.id}`}
                  className="group mt-5 inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-luxe text-gold-deep"
                >
                  Book {cat.name}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Signature ────────────────────────────────────────── */}
      <Section tone={content.theme.pageTone} className="overflow-hidden">
        <div className="grid items-stretch gap-10 overflow-hidden rounded-[40px] bg-ink-gradient lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <SmartImage
              src={content.signature.image}
              alt={content.signature.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              wrapperClassName="h-full w-full"
            />
          </div>
          <div className="flex flex-col justify-center p-9 md:p-14">
            <Eyebrow tone="light">{content.signature.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-display-sm font-light text-cream">
              {content.signature.title}
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-cream/70">
              {content.signature.body}
            </p>
            <div className="mt-8">
              <Button href={`/booking?division=${content.division}`} variant="light" withArrow cursorLabel="Book">
                Reserve this experience
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── The Artist ───────────────────────────────────────── */}
      {artist && (
        <Section tone={content.theme.altTone} className="overflow-hidden">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-1">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[32px] shadow-luxe">
                <SmartImage
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover object-top"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </div>
            <div className="order-2">
              <Eyebrow>The Artist</Eyebrow>
              <Reveal>
                <h2 className="mt-5 font-serif text-display-sm font-light text-graphite">
                  In {artist.name}&apos;s{" "}
                  <span className="italic text-gold-foil">hands</span>
                </h2>
                <p className="mt-2 font-sans text-[0.7rem] uppercase tracking-luxe text-gold-deep">
                  {artist.role} · {artist.experience}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-charcoal/80">
                  {artist.bio}
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2.5">
                {artist.expertise.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-stone/60 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-charcoal/70"
                  >
                    {e}
                  </span>
                ))}
              </Reveal>
              <Reveal delay={0.2} className="mt-9">
                <Button href={`/booking?division=${content.division}`} withArrow cursorLabel="Book">
                  Book with {artist.name}
                </Button>
              </Reveal>
            </div>
          </div>
        </Section>
      )}

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-gradient py-24 text-center">
        <div className="grain" />
        <div className="container relative z-10">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-display-md font-light text-cream">
              Ready to feel{" "}
              <span className="italic text-gold-foil-light">unmistakably you?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={`/booking?division=${content.division}`} variant="light" withArrow cursorLabel="Book">
              Book your appointment
            </Button>
            <Button
              href={content.division === "salon" ? "/clinic" : "/salon"}
              variant="dark"
            >
              Explore the {content.division === "salon" ? "clinic" : "salon"}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
