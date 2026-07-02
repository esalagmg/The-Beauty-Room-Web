"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { DivisionFaq } from "@/constants/divisions";
import { cn } from "@/lib/utils";

/** Interactive, single-open accordion for the clinic FAQs. */
export function FaqAccordion({ items }: { items: DivisionFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-stone/40 border-y border-stone/40">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "font-serif text-lg font-light transition-colors md:text-xl",
                  isOpen ? "text-graphite" : "text-graphite/70 group-hover:text-graphite",
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-luxe",
                  isOpen
                    ? "rotate-45 border-gold bg-gold text-cream"
                    : "border-stone/60 text-graphite group-hover:border-graphite",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-14 text-pretty text-sm leading-relaxed text-charcoal/75 md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
