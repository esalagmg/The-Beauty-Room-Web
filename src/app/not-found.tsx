import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-champagne-gradient px-6 text-center">
      <div className="grain" />
      <div className="relative z-10">
        <Wordmark href={null} size="md" className="text-graphite" />
        <p className="mt-12 font-serif text-[clamp(5rem,18vw,12rem)] font-light leading-none text-graphite/15">
          404
        </p>
        <h1 className="-mt-6 font-serif text-4xl font-light text-graphite">
          This page has stepped <span className="italic text-gold-foil">out.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-charcoal/70">
          The page you&apos;re looking for can&apos;t be found, but your next
          appointment is only a click away.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-graphite px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors hover:bg-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Return home
        </Link>
      </div>
    </div>
  );
}
