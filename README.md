# The Beauty Room by Nilu — Luxury Salon & Aesthetic Clinic

An award-worthy, cinematic digital experience for **The Beauty Room by Nilu**, a premium
salon and aesthetic clinic in Colombo, Sri Lanka. Built to feel like a luxury fashion
campaign crossed with a five-star spa — editorial, immersive and unmistakably premium.

![The Beauty Room](public/images/brand/logo.jpeg)

---

## ✦ Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) + **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v3** with a bespoke luxury design system |
| Animation | **Framer Motion** + **GSAP ScrollTrigger** |
| Smooth scroll | **Lenis** (synced to the GSAP ticker) |
| Forms | **React Hook Form** + **Zod** |
| Icons | **Lucide** |
| Fonts | **Cormorant Garamond** (display serif) + **Inter** (UI sans) via `next/font` |

---

## ✦ Experience Highlights

- **Cinematic hero** — pointer-reactive ambient glow, parallax image stack, kinetic
  headline reveal and an embedded floating booking widget.
- **Bespoke cursor**, **magnetic buttons**, **grain overlays**, **gold-foil typography**
  and **glassmorphism** throughout.
- **Choose Your Experience** — two immersive panels (warm Salon / clinical Clinic) that
  expand on hover.
- **Editorial services** with alternating timeline layouts, **specialist** magazine cards
  with hover bios, a **before/after** gallery with drag-to-reveal sliders and smooth
  category filtering.
- **Pinned horizontal-scroll testimonials** with a Google rating badge.
- **Interactive interior index** that crossfades immersive imagery.
- A luxury **multi-step booking wizard** (Division → Category → Service → Specialist →
  Date & Time → Details → Confirm) with a live floating summary and animated transitions.
- Distinct, fully-themed **/salon** and **/clinic** experience pages that share one
  brand identity.
- Fully responsive with a native-app-style **mobile booking bar** and drawer navigation.

---

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

---

## ✦ Project Structure

```
src/
├── app/                  # App Router routes (home, salon, clinic, booking) + SEO
├── components/
│   ├── layout/           # Navbar, Footer, mobile nav, loader, wordmark, booking bar
│   ├── providers/        # Lenis smooth scroll, custom cursor
│   └── ui/               # Reusable primitives (Button, Reveal, Magnetic, Marquee,
│                         #   SmartImage, BeforeAfterSlider, Section, Typography…)
├── features/
│   ├── home/             # Homepage sections
│   ├── booking/          # Booking wizard, calendar, summary
│   └── division/         # Shared salon/clinic experience template
├── constants/            # Site config + content (services, specialists, gallery…)
├── hooks/                # use-media-query, use-lenis
├── lib/                  # fonts, utils
└── types/                # Shared TypeScript types
```

---

## ✦ Imagery

Real brand photography lives in `public/images/brand/`. Supplementary luxury imagery is
pulled from Unsplash via a central manifest (`src/constants/images.ts`). Every image is
rendered through `SmartImage`, which fades in on load and **gracefully degrades to an
on-brand gradient** if a remote URL is ever unavailable — so the layout never breaks.

To swap any image, edit the single manifest in `src/constants/images.ts`.

---

## ✦ Design System

Defined in `tailwind.config.ts` + `src/app/globals.css`:

- **Palette** — cream, pearl, champagne, beige, stone, silver, platinum, graphite/ink,
  with a gold-bronze accent drawn from the logo. No saturated colours.
- **Type scale** — fluid `display-*` sizes for oversized editorial headlines.
- **Motion** — a shared `luxe` easing curve, plus shimmer, marquee, float and spin
  keyframes. All motion respects `prefers-reduced-motion`.

---

## ✦ Notes for Production

- Wire `ContactForm` and the booking wizard's confirm step to an API route / CRM.
- Replace placeholder contact details in `src/constants/site.ts`.
- Add real Instagram feed integration in `src/features/home/instagram.tsx`.
- Drop in `opengraph-image` assets for richer social sharing.

---

_Crafted with intention · Colombo, Sri Lanka._
