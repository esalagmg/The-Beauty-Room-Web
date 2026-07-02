import Link from "next/link";
import { ArrowUpRight, Check, Clock, MessageCircle, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { Parallax } from "@/components/ui/parallax";
import { Button } from "@/components/ui/button";
import { iconMap } from "./icon-map";
import type { DivisionContent } from "@/constants/divisions";
import type { ServiceCategory, Specialist } from "@/types";
import { siteConfig } from "@/constants/site";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

/* ── About: editorial split with overlapping images + stats ─────── */
export function AboutSection({
  content,
  showSecondary = true,
}: {
  content: DivisionContent;
  showSecondary?: boolean;
}) {
  const a = content.about;
  return (
    <Section tone={content.theme.pageTone} className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* image collage */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[34px] shadow-luxe">
            <Parallax speed={0.12} className="h-[118%] w-full">
              <SmartImage
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
          </div>
          {showSecondary && (
            <div className="absolute -bottom-8 -right-2 hidden h-48 w-40 overflow-hidden rounded-3xl border-4 border-cream shadow-luxe sm:block lg:-right-8">
              <SmartImage
                src={a.imageSecondary}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </div>
          )}
        </div>

        {/* copy + stats */}
        <div className="order-1 lg:order-2">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <Reveal>
            <h2 className="mt-6 max-w-lg font-serif text-display-sm font-light leading-[1.05] text-graphite">
              {a.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-7 space-y-5 text-pretty leading-relaxed text-charcoal/80">
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <div
            className={cn(
              "mt-10 grid gap-px overflow-hidden rounded-3xl border border-stone/40 bg-stone/30",
              a.stats.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4",
            )}
          >
            {a.stats.map((s) => (
              <div key={s.label} className="bg-white/60 p-5 text-center">
                <div className="font-serif text-3xl font-light text-graphite md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 font-sans text-[0.56rem] uppercase tracking-wide2 text-taupe">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Feature cards: "Why choose us" / "The standard" ────────────── */
export function FeatureGrid({ content }: { content: DivisionContent }) {
  const f = content.features;
  const cols = f.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <Section tone={content.theme.altTone}>
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">{f.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="mt-5 font-serif text-display-sm font-light leading-[1.05] text-graphite">
            {f.title}{" "}
            <span className="italic text-gold-foil">{f.titleAccent}</span>
          </h2>
        </Reveal>
      </div>

      <div className={cn("mt-16 grid gap-6 sm:grid-cols-2", cols)}>
        {f.items.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.08}
              className="group flex flex-col rounded-[28px] border border-stone/40 bg-white/55 p-8 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-graphite/5 text-gold-deep transition-colors duration-500 group-hover:bg-gold group-hover:text-cream">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-serif text-xl font-light text-graphite">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-charcoal/70">
                {item.description}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Signature experience: full-bleed dark split ────────────────── */
export function SignatureSection({
  content,
  flip = false,
  variant = "image",
}: {
  content: DivisionContent;
  flip?: boolean;
  /** "image" = photo panel; "panel" = decorative (non-photo) facts panel. */
  variant?: "image" | "panel";
}) {
  const s = content.signature;

  const contentBlock = (
    <div
      className={cn(
        "flex flex-col justify-center p-9 md:p-14",
        variant === "image" && flip && "lg:order-1",
      )}
    >
      <Eyebrow tone="light">{s.eyebrow}</Eyebrow>
      <Reveal>
        <h2 className="mt-5 font-serif text-display-sm font-light text-cream">
          {s.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-cream/70">
          {s.body}
        </p>
      </Reveal>
      <ul className="mt-7 space-y-3">
        {s.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm text-cream/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-9">
        <Button
          href={`/booking?division=${content.division}`}
          variant="light"
          withArrow
          cursorLabel="Book"
        >
          Reserve this experience
        </Button>
      </div>
    </div>
  );

  return (
    <Section tone={content.theme.pageTone} className="overflow-hidden">
      <div className="grid items-stretch overflow-hidden rounded-[40px] bg-ink-gradient lg:grid-cols-2">
        {variant === "panel" ? (
          <>
            {contentBlock}
            {/* decorative facts panel (no photo) */}
            <div className="relative flex min-h-[280px] flex-col justify-center overflow-hidden border-t border-cream/10 p-9 md:p-14 lg:min-h-[500px] lg:border-l lg:border-t-0">
              <div className="grain" />
              <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-gold/20 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-gold/10 blur-[90px]" />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold-soft">
                  <Sparkles className="h-6 w-6" />
                </span>
                <div className="mt-8 border-y border-cream/10">
                  {(s.stats ?? []).map((st) => (
                    <div
                      key={st.label}
                      className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-5 last:border-b-0"
                    >
                      <span className="font-serif text-3xl font-light text-cream md:text-4xl">
                        {st.value}
                      </span>
                      <span className="text-right font-sans text-[0.58rem] uppercase tracking-luxe text-cream/50">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 font-sans text-[0.58rem] uppercase tracking-luxe text-cream/40">
                  {siteConfig.fullName} · {siteConfig.location.city}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={cn("relative min-h-[320px] lg:min-h-[520px]", flip && "lg:order-2")}>
              <SmartImage
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-r" />
            </div>
            {contentBlock}
          </>
        )}
      </div>
    </Section>
  );
}

/* ── Process: horizontal steps (salon) ──────────────────────────── */
export function ProcessRow({ content }: { content: DivisionContent }) {
  const p = content.process;
  return (
    <Section tone="ink" className="overflow-hidden">
      <div className="text-center">
        <Eyebrow tone="light" className="justify-center">
          {p.eyebrow}
        </Eyebrow>
        <Reveal>
          <h2 className="mt-5 font-serif text-display-sm font-light text-cream">
            {p.title}{" "}
            <span className="italic text-gold-foil-light">{p.titleAccent}</span>
          </h2>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {p.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08} className="relative">
            <span className="font-serif text-5xl font-light text-gold/50 tabular-nums">
              {pad(i + 1)}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-light text-cream">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">
              {step.description}
            </p>
            {i < p.steps.length - 1 && (
              <span className="absolute right-0 top-6 hidden h-px w-10 bg-cream/15 lg:block" />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Process: vertical journey (clinic) ─────────────────────────── */
export function ProcessVertical({ content }: { content: DivisionContent }) {
  const p = content.process;
  return (
    <Section tone="ink" className="overflow-hidden">
      <div className="text-center">
        <Eyebrow tone="light" className="justify-center">
          {p.eyebrow}
        </Eyebrow>
        <Reveal>
          <h2 className="mt-5 font-serif text-display-sm font-light text-cream">
            {p.title}{" "}
            <span className="italic text-gold-foil-light">{p.titleAccent}</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        {p.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-lg font-light text-gold-soft">
                  {pad(i + 1)}
                </span>
                {i < p.steps.length - 1 && (
                  <span className="my-2 h-16 w-px bg-gradient-to-b from-gold/40 to-transparent" />
                )}
              </div>
              <div className={cn(i < p.steps.length - 1 ? "pb-4" : "", "pt-2.5")}>
                <h3 className="font-serif text-2xl font-light text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Salon services menu (category cards) ───────────────────────── */
export function ServicesMenu({
  content,
  categories,
}: {
  content: DivisionContent;
  categories: ServiceCategory[];
}) {
  return (
    <Section tone={content.theme.pageTone}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>The Menu</Eyebrow>
          <Reveal>
            <h2 className="mt-5 font-serif text-display-sm font-light text-graphite">
              Services &amp; rituals
            </h2>
          </Reveal>
        </div>
        <Button
          href={`/booking?division=${content.division}`}
          variant="outline"
          withArrow
        >
          Book any service
        </Button>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal
            key={cat.id}
            delay={(i % 3) * 0.08}
            className="group flex flex-col overflow-hidden rounded-[28px] border border-stone/40 bg-white/50"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <SmartImage
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 90vw, 30vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                wrapperClassName="h-full w-full"
              />
              <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3.5 py-1.5 font-sans text-[0.55rem] uppercase tracking-wide2 text-graphite backdrop-blur">
                {cat.tagline}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-2xl font-light text-graphite">
                {cat.name}
              </h3>
              <ul className="mt-5 flex-1 space-y-3 border-t border-stone/40 pt-4">
                {cat.services.slice(0, 4).map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-graphite">{s.name}</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe">
                      <Clock className="h-3 w-3" />
                      {s.duration}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/booking?division=${content.division}&category=${cat.id}`}
                className="group/link mt-6 inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-luxe text-gold-deep"
              >
                Book {cat.name}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Team / lead artist (salon) ─────────────────────────────────── */
export function TeamSection({
  content,
  artist,
}: {
  content: DivisionContent;
  artist: Specialist;
}) {
  return (
    <Section tone={content.theme.altTone} className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[32px] shadow-luxe">
            <Parallax speed={0.1} className="h-[116%] w-full">
              <SmartImage
                src={artist.image}
                alt={artist.name}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover object-top"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
          </div>
        </div>
        <div className="order-2">
          <Eyebrow>Meet the Team</Eyebrow>
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
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-charcoal/60">
              Alongside Nilu, a small, hand-picked team of specialists shares the
              same standard of care, so you&apos;re in expert hands from the
              moment you arrive.
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
            <Button
              href={`/booking?division=${content.division}`}
              withArrow
              cursorLabel="Book"
            >
              Book with {artist.name}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ── Practitioners (clinic team) ────────────────────────────────── */
function bookLabel(name: string) {
  return name.startsWith("Dr")
    ? name.split(" ").slice(0, 2).join(" ")
    : name.split(" ")[0];
}

export function PractitionersSection({
  content,
  specialists,
}: {
  content: DivisionContent;
  specialists: Specialist[];
}) {
  if (!specialists.length) return null;
  return (
    <Section tone={content.theme.altTone} className="overflow-hidden">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">The Practitioners</Eyebrow>
        <Reveal>
          <h2 className="mt-5 font-serif text-display-sm font-light leading-[1.05] text-graphite">
            Care led by{" "}
            <span className="italic text-gold-foil">qualified hands.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-pretty leading-relaxed text-charcoal/75">
            Your treatments are performed by experienced, qualified specialists —
            each treatment begins with a personal consultation.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
        {specialists.map((sp, i) => (
          <Reveal
            key={sp.id}
            delay={i * 0.08}
            className="flex flex-col overflow-hidden rounded-[28px] border border-stone/40 bg-white/60 sm:flex-row"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-44">
              <SmartImage
                src={sp.image}
                alt={sp.name}
                fill
                sizes="(max-width: 640px) 90vw, 200px"
                className="object-cover object-top"
                wrapperClassName="h-full w-full"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-2xl font-light text-graphite">
                {sp.name}
              </h3>
              <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-gold-deep">
                {sp.role}
              </p>
              {sp.experience && (
                <p className="mt-0.5 font-sans text-[0.58rem] uppercase tracking-wide2 text-taupe">
                  {sp.experience}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                {sp.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sp.expertise.slice(0, 4).map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-stone/50 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-charcoal/70"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Button
                  href={`/booking?division=${content.division}&specialist=${sp.id}`}
                  variant="outline"
                  size="sm"
                  withArrow
                  cursorLabel="Book"
                >
                  Book with {bookLabel(sp.name)}
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Technology & equipment (clinic) ────────────────────────────── */
export function TechnologySection({ content }: { content: DivisionContent }) {
  const t = content.technology;
  if (!t) return null;
  return (
    <Section tone={content.theme.pageTone} className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[34px] shadow-luxe">
            <Parallax speed={0.1} className="h-[116%] w-full">
              <SmartImage
                src={t.image}
                alt={t.title}
                fill
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
          </div>
        </div>
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <Reveal>
            <h2 className="mt-6 max-w-md font-serif text-display-sm font-light leading-[1.05] text-graphite">
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-pretty leading-relaxed text-charcoal/80">
            {t.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <div className="mt-9 space-y-4">
            {t.highlights.map((h) => {
              const Icon = iconMap[h.icon];
              return (
                <div key={h.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-graphite/5 text-gold-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-light text-graphite">
                      {h.title}
                    </h3>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-charcoal/70">
                      {h.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Safety & expertise (clinic) ────────────────────────────────── */
export function SafetySection({ content }: { content: DivisionContent }) {
  const s = content.safety;
  if (!s) return null;
  return (
    <Section tone={content.theme.altTone} className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Reveal>
            <h2 className="mt-5 max-w-md font-serif text-display-sm font-light leading-[1.05] text-graphite">
              {s.title}{" "}
              <span className="italic text-gold-foil">{s.titleAccent}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {s.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.title}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-graphite/5 text-gold-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-light text-graphite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative order-first lg:order-last">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[34px] shadow-luxe lg:ml-auto">
            <Parallax speed={0.12} className="h-[118%] w-full">
              <SmartImage
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Booking experience: copy + appointment card ────────────────── */
export function BookingSection({ content }: { content: DivisionContent }) {
  const b = content.booking;
  return (
    <Section tone={content.theme.pageTone} className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <Reveal>
            <h2 className="mt-5 max-w-md font-serif text-display-sm font-light leading-[1.05] text-graphite">
              {b.title}{" "}
              <span className="italic text-gold-foil">{b.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-charcoal/80">
              {b.body}
            </p>
          </Reveal>
          <div className="mt-9 space-y-6">
            {b.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} className="flex items-start gap-5">
                <span className="font-serif text-2xl font-light italic text-gold/70 tabular-nums">
                  {pad(i + 1)}
                </span>
                <div className="border-l border-stone/40 pl-5">
                  <h3 className="font-serif text-lg font-light text-graphite">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-charcoal/70">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* appointment card */}
        <Reveal direction="up" className="lg:pl-6">
          <div className="relative overflow-hidden rounded-[36px] border border-stone/40 bg-white/70 p-8 shadow-luxe backdrop-blur md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-champagne/30 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold-deep">
                  {content.division === "salon" ? "The Salon" : "Aesthetic Clinic"}
                </span>
                <span className="rounded-full bg-graphite/5 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-taupe">
                  {siteConfig.location.city}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-3xl font-light text-graphite">
                Reserve your visit
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Book online in under a minute. We personally confirm every
                appointment over WhatsApp.
              </p>

              <ul className="mt-7 space-y-3 border-y border-stone/40 py-6">
                {[
                  ["Opening hours", siteConfig.hours[0].time],
                  ["Saturday", siteConfig.hours[1].time],
                  ["Call & WhatsApp", siteConfig.contact.whatsapp],
                ].map(([label, value]) => (
                  <li key={label} className="flex items-center justify-between text-sm">
                    <span className="text-taupe">{label}</span>
                    <span className="font-medium text-graphite">{value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <Button
                  href={`/booking?division=${content.division}`}
                  withArrow
                  cursorLabel="Book"
                  className="w-full"
                >
                  Book online
                </Button>
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border border-graphite/25 font-sans text-[0.7rem] font-medium uppercase tracking-wide2 text-graphite transition-colors duration-500 hover:border-graphite hover:bg-white/60"
                >
                  <MessageCircle className="h-4 w-4 text-gold-deep" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── FAQ heading wrapper (list rendered by client component) ────── */
export function FaqHeading({ content }: { content: DivisionContent }) {
  if (!content.faqs) return null;
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <Eyebrow className="justify-center">{content.faqs.eyebrow}</Eyebrow>
      <Reveal>
        <h2 className="mt-5 font-serif text-display-sm font-light text-graphite">
          {content.faqs.title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ── Final CTA band (cross-link between divisions) ──────────────── */
export function CtaBand({ content }: { content: DivisionContent }) {
  const isSalon = content.division === "salon";
  return (
    <section className="relative overflow-hidden bg-ink-gradient py-24 text-center md:py-32">
      <div className="grain" />
      <div className="container relative z-10">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-serif text-display-md font-light text-cream">
            Ready to feel{" "}
            <span className="italic text-gold-foil-light">
              <TextReveal text="unmistakably you?" />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={`/booking?division=${content.division}`}
            variant="light"
            withArrow
            cursorLabel="Book"
          >
            Book your appointment
          </Button>
          <Button href={isSalon ? "/clinic" : "/salon"} variant="dark">
            Explore the {isSalon ? "clinic" : "salon"}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
