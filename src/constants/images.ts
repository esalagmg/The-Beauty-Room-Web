/**
 * Central image manifest — authentic photography only.
 *
 * Every image below is a real photo from The Beauty Room (served locally from
 * /public/images/brand). No stock or AI imagery is used.
 *
 * The project currently ships 9 brand photos, so some editorial "slots" reuse
 * the closest-matching photo. When you add more real photos (see the suggested
 * filenames in `futureSlots` below), drop them into /public/images/brand and
 * point the relevant slot here — components only consume `img.*`, so it's a
 * one-line change with no component edits.
 */

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

/**
 * Suggested additional photos to make the experience even richer. Add the file
 * to /public/images/brand, then replace the matching value in `img` below.
 */
export const futureSlots = {
  salonExterior: "salon-exterior.jpeg",
  reception: "reception.jpeg",
  hairStation: "hair-station.jpeg",
  treatmentRoom: "treatment-room.jpeg",
  productShelf: "products.jpeg",
  loungeArea: "lounge.jpeg",
} as const;

export const img = {
  // ── Hero / atmosphere ──────────────────────────────────────
  heroSalon: brand.bridalRoses,
  heroHair: brand.hairBlowout,
  heroClinic: brand.clinicFacial,

  // ── Salon imagery ──────────────────────────────────────────
  salonColor: brand.hairBlowout,
  salonCut: brand.hairSleek,
  salonStyling: brand.hairSleek,
  salonBridal: brand.bridalArch,
  makeupEditorial: brand.bridalRoses,
  makeupDetail: brand.bridalForest,
  nails: brand.bridalSaree,

  // ── Aesthetic clinic imagery ───────────────────────────────
  clinicSkin: brand.clinicFacial,
  clinicFacial: brand.clinicFacial,
  clinicTreatment: brand.founder,
  clinicProducts: brand.bridalForest,
  clinicGlow: brand.clinicFacial,

  // ── Interior (real spaces visible in our photography) ──────
  interiorReception: brand.founder,
  interiorLounge: brand.hairBlowout,
  interiorRoom: brand.clinicFacial,
  interiorSpa: brand.hairSleek,
  interiorProducts: brand.hairSleek,

  // ── Misc ───────────────────────────────────────────────────
  texture: brand.bridalForest,
} as const;

/** Instagram-style feed — all authentic photography. */
export const instagramFeed = [
  brand.bridalRoses,
  brand.hairSleek,
  brand.clinicFacial,
  brand.bridalArch,
  brand.hairBlowout,
  brand.bridalForest,
  brand.founder,
  brand.bridalSaree,
  brand.bridalRoses,
  brand.clinicFacial,
] as const;
