"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Check } from "lucide-react";
import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * A single treatment for display. Sourced from the admin-managed catalog, so
 * `category`/`benefits` are optional (the database doesn't store them).
 */
export interface TreatmentDisplay {
  name: string;
  category?: string;
  description: string;
  duration: string;
  price: string;
  benefits?: string[];
}

/**
 * Editorial, expandable treatment menu. Each row reveals a full description,
 * duration, starting price, optional benefits and a direct booking CTA.
 * Content is driven by the admin panel (shown treatments + edited prices).
 */
export function TreatmentsList({ items }: { items: TreatmentDisplay[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-14 border-t border-stone/40">
      {items.map((t, i) => {
        const isOpen = open === i;
        const hasBenefits = !!t.benefits && t.benefits.length > 0;
        return (
          <div key={`${t.name}-${i}`} className="border-b border-stone/40">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-7"
            >
              <span className="font-serif text-sm italic tabular-nums text-gold/70 md:text-base">
                {pad(i + 1)}
              </span>
              <span className="flex-1">
                <span
                  className={cn(
                    "block font-serif text-xl font-light transition-all duration-500 ease-luxe md:text-3xl",
                    isOpen ? "text-graphite md:translate-x-2" : "text-graphite/55 group-hover:text-graphite/80",
                  )}
                >
                  {t.name}
                </span>
              </span>
              <span className="hidden shrink-0 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe sm:block">
                {t.price}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-luxe md:h-10 md:w-10",
                  isOpen
                    ? "rotate-45 border-gold bg-gold text-cream"
                    : "border-stone/60 text-graphite group-hover:border-graphite",
                )}
              >
                <span className="text-lg leading-none">+</span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "gap-8 pb-9 pl-9 md:pl-14 lg:gap-14",
                      hasBenefits ? "grid md:grid-cols-[1.4fr_1fr]" : "grid",
                    )}
                  >
                    <div>
                      {t.category && (
                        <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold-deep">
                          {t.category}
                        </p>
                      )}
                      {t.description && (
                        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-charcoal/80 md:text-base">
                          {t.description}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.72rem] uppercase tracking-wide2 text-taupe">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-gold-deep" />
                          {t.duration}
                        </span>
                        <span className="inline-flex items-center gap-2 text-graphite sm:hidden">
                          {t.price}
                        </span>
                      </div>
                      <Link
                        href="/booking?division=clinic"
                        data-cursor-label="Book"
                        className="group/link mt-7 inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-luxe text-graphite"
                      >
                        <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover/link:border-graphite">
                          Book this treatment
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </div>

                    {hasBenefits && (
                      <div className="rounded-3xl border border-stone/40 bg-white/50 p-6">
                        <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-taupe">
                          Key benefits
                        </p>
                        <ul className="mt-4 space-y-3">
                          {t.benefits!.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
