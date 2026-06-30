"use client";

import { ArrowUpRight, BadgeCheck, PenLine, Quote, Star } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { getReviews, type Review } from "@/constants/reviews";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

/** The Google "G" mark. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.21-2.36H12v4.46h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.73z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.2 7.2 0 0 1-10.74-3.78H1.32v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.33 14.32a7.2 7.2 0 0 1 0-4.63v-3.1H1.32a12 12 0 0 0 0 10.83l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.32 6.59l4.01 3.1A7.2 7.2 0 0 1 12 4.77z"
      />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <div className={cn("flex gap-0.5 text-gold", className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i < filled ? "fill-current" : "fill-none text-cream/25")}
        />
      ))}
    </div>
  );
}

/** Prominent Google rating summary, used in the header. */
function GoogleRatingCard() {
  const { rating, reviewCount } = siteConfig.google;
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-cream/15 bg-white/[0.03] px-6 py-4 backdrop-blur">
      <GoogleG className="h-7 w-7 shrink-0" />
      <div className="text-left">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl leading-none text-cream">
            {rating.toFixed(1)}
          </span>
          <Stars rating={rating} />
        </div>
        <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/55">
          {reviewCount > 0 ? `${reviewCount} Google reviews` : "Rated on Google"}
        </p>
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="flex h-full w-[82vw] shrink-0 flex-col overflow-hidden rounded-[28px] border border-cream/10 bg-white/[0.04] p-7 backdrop-blur sm:w-[420px]">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-gold/40" />
        {r.googleVerified && (
          <span className="flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-cream/60">
            <GoogleG className="h-3 w-3" />
            <BadgeCheck className="h-3 w-3 text-gold-soft" />
            Verified
          </span>
        )}
      </div>
      <p className="mt-5 flex-1 text-pretty font-serif text-xl font-light leading-snug text-cream/90">
        {r.text}
      </p>
      <div className="mt-7 flex items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-cream/15 bg-white/5">
          {r.photo ? (
            <SmartImage
              src={r.photo}
              alt={r.name}
              fill
              sizes="48px"
              className="object-cover"
              wrapperClassName="h-full w-full"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-serif text-lg text-gold-soft">
              {r.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-serif text-lg text-cream">{r.name}</p>
          <Stars rating={r.rating} className="mt-0.5" />
        </div>
        <p className="self-start font-sans text-[0.58rem] uppercase tracking-wide2 text-cream/40">
          {r.date}
        </p>
      </div>
    </article>
  );
}

export function Reviews() {
  const reviews = getReviews();
  const g = siteConfig.google;

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink-gradient py-24 md:py-28">
      <div className="grain" />

      <div className="container relative z-10">
        {/* header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="light">In their words</Eyebrow>
            <Reveal>
              <h2 className="mt-5 max-w-xl font-serif text-display-sm font-light leading-[1.04] text-cream">
                Loved by our <span className="italic text-gold-foil-light">guests</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <GoogleRatingCard />
          </Reveal>
        </div>

        {/* reviews */}
        {reviews.length > 0 ? (
          <div className="mt-14 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="mx-auto max-w-2xl rounded-[32px] border border-cream/10 bg-white/[0.03] px-8 py-12 text-center backdrop-blur">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cream/15 px-4 py-2">
                <GoogleG className="h-4 w-4" />
                <span className="font-sans text-[0.62rem] uppercase tracking-wide2 text-cream/60">
                  Verified Google Business
                </span>
              </div>
              <p className="mx-auto mt-7 max-w-md text-pretty font-serif text-2xl font-light leading-snug text-cream/90">
                Our guests share their experiences on Google. Read genuine reviews
                from the people who know us best.
              </p>
            </div>
          </Reveal>
        )}

        {/* CTAs */}
        <Reveal delay={0.1} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={g.profileUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="Google"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-cream px-7 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite transition-colors duration-500 hover:bg-white"
          >
            <GoogleG className="h-4 w-4" />
            Read more reviews on Google
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={g.writeReviewUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="Review"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/25 px-7 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors duration-500 hover:bg-cream hover:text-graphite"
          >
            <PenLine className="h-4 w-4" />
            Write a review
          </a>
        </Reveal>
      </div>
    </section>
  );
}
