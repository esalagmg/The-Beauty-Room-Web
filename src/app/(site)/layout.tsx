import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/providers/custom-cursor";
import { LuxuryLoader } from "@/components/layout/luxury-loader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBookingBar } from "@/components/layout/mobile-booking-bar";

/**
 * Public marketing-site shell: smooth scroll, custom cursor, intro loader,
 * floating nav, footer and the mobile booking bar. The admin panel and the
 * customer confirmation page deliberately sit OUTSIDE this group so they don't
 * inherit any of this chrome.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[10001] -translate-y-24 rounded-full bg-graphite px-6 py-3 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <LuxuryLoader />
      <CustomCursor />
      <SmoothScrollProvider>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookingBar />
      </SmoothScrollProvider>
    </>
  );
}
