import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookingWizard } from "@/features/booking/booking-wizard";
import { getServiceCategories, getSpecialists } from "@/lib/data/catalog";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Reserve your salon or aesthetic clinic appointment at The Beauty Room by Nilu, a calm and considered booking experience.",
};

export default async function BookingPage() {
  const [categories, specialists] = await Promise.all([
    getServiceCategories(),
    getSpecialists(),
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-pearl-gradient pb-28 pt-28 lg:pt-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-champagne/30 blur-[130px]" />
      <div className="container relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-luxe text-taupe transition-colors hover:text-graphite"
        >
          <ArrowLeft className="h-4 w-4" /> The Beauty Room
        </Link>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center">
                <span className="font-serif text-2xl italic text-taupe">
                  Preparing your experience…
                </span>
              </div>
            }
          >
            <BookingWizard
              allCategories={categories}
              allSpecialists={specialists}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
