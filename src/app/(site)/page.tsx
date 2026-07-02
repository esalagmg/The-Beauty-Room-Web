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
import { getServiceCategories, getSpecialists } from "@/lib/data/catalog";

// Revalidate the static page periodically so catalog edits appear automatically.
export const revalidate = 120;

export default async function HomePage() {
  const [categories, specialists] = await Promise.all([
    getServiceCategories(),
    getSpecialists(),
  ]);

  return (
    <>
      <Hero />
      <PillarsBand />
      <BrandStory />
      <ExperienceSelector />
      <Services categories={categories} />
      <Specialists specialists={specialists} />
      <BeforeAfter />
      <Reviews />
      <Interior />
      <InstagramFeed />
      <Contact />
    </>
  );
}
