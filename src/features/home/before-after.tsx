"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { SmartImage } from "@/components/ui/smart-image";
import { gallery, galleryCategories } from "@/constants/gallery";
import { cn } from "@/lib/utils";

export function BeforeAfter() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <Section id="gallery" tone="cream">
      <div className="flex flex-col items-center text-center">
        <Eyebrow>The Transformations</Eyebrow>
        <Reveal>
          <h2 className="mt-5 max-w-2xl font-serif text-display-sm font-light leading-[1.04] text-graphite">
            Real results, <span className="italic text-gold-foil">revealed</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-charcoal/70">
            Drag to reveal the before. Every result is the work of our own
            artistry, with no filters and no retouching.
          </p>
        </Reveal>
      </div>

      {/* filters */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-5 py-2.5 font-sans text-[0.68rem] uppercase tracking-wide2 transition-all duration-400 ease-luxe",
              filter === cat
                ? "bg-graphite text-cream"
                : "border border-stone/60 text-charcoal/70 hover:border-graphite hover:text-graphite",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* grid */}
      <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                // create a touch of masonry rhythm
                item.id === "g1" || item.id === "g4" ? "lg:row-span-1" : "",
              )}
            >
              {item.composite ? (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-luxe">
                  <SmartImage
                    src={item.composite}
                    alt={`${item.title}, before and after`}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover"
                    wrapperClassName="h-full w-full"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-graphite/70 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-cream backdrop-blur">
                    Before &amp; After
                  </span>
                </div>
              ) : (
                <BeforeAfterSlider
                  before={item.before ?? ""}
                  after={item.after ?? ""}
                  alt={item.title}
                  className="aspect-[4/5]"
                />
              )}
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="font-serif text-lg italic text-graphite">{item.title}</p>
                <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
