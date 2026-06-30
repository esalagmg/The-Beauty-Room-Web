import { Hero } from "@/features/home/hero";
import { PillarsBand } from "@/features/home/pillars-band";
import { BrandStory } from "@/features/home/brand-story";
import { ExperienceSelector } from "@/features/home/experience-selector";
import { Services } from "@/features/home/services";
import { Specialists } from "@/features/home/specialists";
import { BeforeAfter } from "@/features/home/before-after";
import { Reviews } from "@/features/home/reviews";
import { Interior } from "@/features/home/interior";
import { InstagramFeed } from "@/features/home/instagram";
import { Contact } from "@/features/home/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsBand />
      <BrandStory />
      <ExperienceSelector />
      <Services />
      <Specialists />
      <BeforeAfter />
      <Reviews />
      <Interior />
      <InstagramFeed />
      <Contact />
    </>
  );
}
