import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * Couture display & body serif.
 * Cormorant Garamond carries the editorial, high-fashion voice of the brand —
 * delicate, high-contrast, and timeless. Used for all headlines.
 */
export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

/**
 * Modern UI sans. Inter handles the functional layer — navigation, labels,
 * buttons, body microcopy — with quiet, premium precision.
 */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const fontVariables = `${serif.variable} ${sans.variable}`;
