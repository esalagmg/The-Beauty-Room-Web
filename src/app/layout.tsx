import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/constants/site";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/providers/custom-cursor";
import { LuxuryLoader } from "@/components/layout/luxury-loader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBookingBar } from "@/components/layout/mobile-booking-bar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  keywords: [
    "luxury salon Sri Lanka",
    "aesthetic clinic Ratnapura",
    "bridal makeup Sri Lanka",
    "premium hair salon",
    "skin clinic Ratnapura",
    "The Beauty Room by Nilu",
  ],
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${siteConfig.fullName} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="overflow-x-hidden bg-cream antialiased">
        <LuxuryLoader />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBookingBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
