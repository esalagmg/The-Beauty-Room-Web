import { siteConfig } from "./site";

export interface Review {
  id: string;
  /** Customer name as shown on the review. */
  name: string;
  /** Star rating, 1–5. */
  rating: number;
  /** The review body. */
  text: string;
  /** Display date, e.g. "March 2026". */
  date: string;
  /** Optional customer photo / avatar URL. */
  photo?: string;
  /** True for reviews verified through Google. */
  googleVerified?: boolean;
  /** Where the review came from. */
  source?: "google" | "facebook" | "instagram" | "direct";
}

/**
 * Real customer reviews.
 *
 * This array is intentionally empty — no placeholder/fake reviews are shipped.
 * Paste genuine reviews here (e.g. copied from your Google Business profile)
 * and each one renders as a luxury review card automatically. Example shape:
 *
 *   {
 *     id: "r1",
 *     name: "Sa.....",
 *     rating: 5,
 *     text: "Absolutely loved my bridal trial …",
 *     date: "May 2026",
 *     googleVerified: true,
 *     source: "google",
 *   }
 */
export const reviews: Review[] = [];

/**
 * Single source for reviews used by the UI.
 *
 * Today it returns the static `reviews` above. To go live with Google later,
 * implement a cached server fetch against the Google Places API and map the
 * result here — the UI needs no changes:
 *
 *   const res = await fetch(
 *     "https://maps.googleapis.com/maps/api/place/details/json" +
 *       `?place_id=${siteConfig.google.placeId}` +
 *       "&fields=reviews,rating,user_ratings_total" +
 *       `&key=${process.env.GOOGLE_PLACES_API_KEY}`,
 *     { next: { revalidate: 86400 } },
 *   );
 *   const data = await res.json();
 *   return (data.result?.reviews ?? []).map(mapGoogleReview);
 */
export function getReviews(): Review[] {
  return reviews;
}

/** Convenience accessor for the Google Business summary. */
export const googleBusiness = siteConfig.google;
