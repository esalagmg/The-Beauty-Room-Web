"use client";

import { motion } from "framer-motion";
import { Heart, Instagram as InstagramIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { instagramFeed } from "@/constants/images";
import { siteConfig } from "@/constants/site";

export function InstagramFeed() {
  return (
    <Section id="instagram" tone="cream">
      <div className="flex flex-col items-center text-center">
        <Eyebrow>Follow the atelier</Eyebrow>
        <Reveal>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="Follow"
            className="group mt-5 inline-flex items-center gap-3"
          >
            <h2 className="font-serif text-display-sm font-light leading-none text-graphite transition-colors group-hover:text-gold-deep">
              {siteConfig.social.instagramHandle}
            </h2>
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-charcoal/70">
            A living lookbook of our latest transformations, behind-the-scenes
            moments and the quiet rituals of the room.
          </p>
        </Reveal>
      </div>

      {/* masonry */}
      <div className="mt-12 columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-5">
        {instagramFeed.map((src, i) => (
          <motion.a
            key={i}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl"
            style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "1 / 1" : "4 / 5" }}
          >
            <SmartImage
              src={src}
              alt="Instagram post"
              fill
              sizes="(max-width: 768px) 45vw, 18vw"
              className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
              wrapperClassName="h-full w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
              <span className="flex items-center gap-2 text-cream">
                <Heart className="h-5 w-5 fill-current" />
                <InstagramIcon className="h-5 w-5" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
