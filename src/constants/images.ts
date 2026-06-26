/**
 * Central image manifest.
 *
 * `brand.*`  — real photography from The Beauty Room (served locally).
 * `u(...)`   — curated luxury imagery from Unsplash; every <SmartImage>
 *              falls back to an on-brand gradient if a remote URL ever fails,
 *              so the layout never breaks.
 */

const U = "https://images.unsplash.com/photo-";
const q = "?auto=format&fit=crop&w=1400&q=80";

/** Build an Unsplash URL with an optional width override. */
export function u(id: string, w = 1400) {
  return `${U}${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const brand = {
  logo: "/images/brand/logo.jpeg",
  founder: "/images/brand/founder-nilu.jpeg",
  hairSleek: "/images/brand/salon-hair-sleek.jpeg",
  hairBlowout: "/images/brand/salon-hair-blowout.jpeg",
  bridalRoses: "/images/brand/bridal-roses-closeup.jpeg",
  bridalForest: "/images/brand/bridal-forest.jpeg",
  bridalArch: "/images/brand/bridal-arch.jpeg",
  bridalSaree: "/images/brand/bridal-saree.jpeg",
  clinicFacial: "/images/brand/clinic-facial.jpeg",
} as const;

export const img = {
  // ── Hero / atmosphere ──────────────────────────────────────
  heroSalon: brand.bridalRoses,
  heroHair: brand.hairBlowout,
  heroClinic: u("1570172619644-dfd03ed5d881"),

  // ── Salon imagery ──────────────────────────────────────────
  salonColor: u("1560066984-138dadb4c035"),
  salonCut: u("1522337360788-8b13dee7a37e"),
  salonStyling: brand.hairSleek,
  salonBridal: brand.bridalArch,
  makeupEditorial: u("1487412947147-5cebf100ffc2"),
  makeupDetail: u("1457972729786-0411a3b2b626"),
  nails: u("1604654894610-df63bc536371"),

  // ── Aesthetic clinic imagery ───────────────────────────────
  clinicSkin: u("1596462502278-27bfdc403348"),
  clinicFacial: brand.clinicFacial,
  clinicTreatment: u("1620331311520-246422fd82f9"),
  clinicProducts: u("1633681926022-84c23e8cb2d6"),
  clinicGlow: u("1516975080664-ed2fc6a32937"),

  // ── Interior ───────────────────────────────────────────────
  interiorReception: u("1633681926035-ec1ac984418a"),
  interiorLounge: u("1522335789203-aabd1fc54bc9"),
  interiorRoom: u("1540555700478-4be289fbecef"),
  interiorSpa: u("1512496015851-a90fb38ba796"),
  interiorProducts: u("1556228720-195a672e8a03"),

  // ── Misc ───────────────────────────────────────────────────
  texture: u("1615874959474-d609969a20ed"),
} as const;

/** Instagram-style feed (reuses curated imagery). */
export const instagramFeed = [
  brand.bridalRoses,
  img.salonColor,
  brand.hairSleek,
  brand.clinicFacial,
  brand.bridalSaree,
  img.makeupEditorial,
  brand.bridalForest,
  img.clinicSkin,
  brand.hairBlowout,
  img.nails,
] as const;

export { q };
