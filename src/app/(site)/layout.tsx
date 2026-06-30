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
      <LuxuryLoader />
      <CustomCursor />
      <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </SmoothScrollProvider>
    </>
  );
}
