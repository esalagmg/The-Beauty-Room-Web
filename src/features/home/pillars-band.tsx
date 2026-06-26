import { Marquee } from "@/components/ui/marquee";

const pillars = [
  "Couture Hair",
  "Bridal Artistry",
  "Advanced Skin",
  "Quiet Luxury",
  "Science-led Care",
  "Editorial Makeup",
  "Five-star Service",
];

/** A slim editorial band of brand pillars that drifts across the screen. */
export function PillarsBand() {
  return (
    <div className="border-y border-stone/40 bg-cream py-6">
      <Marquee duration={34} className="text-graphite">
        {pillars.map((p) => (
          <span key={p} className="flex items-center">
            <span className="px-8 font-serif text-3xl font-light italic md:text-4xl">
              {p}
            </span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
