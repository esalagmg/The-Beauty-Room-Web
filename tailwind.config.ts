import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2.5rem", xl: "3.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // ── Primary: warm neutrals ──────────────────────────────
        cream: "#F7F3EC",
        pearl: "#FBF8F3",
        porcelain: "#FDFCFA",
        sand: "#EFE7DA",
        beige: "#E7DAC6",
        champagne: "#E3CDB0",
        stone: "#C9BBA8",
        taupe: "#A99A86",
        // ── Secondary: cool silvers ─────────────────────────────
        silver: "#D7D6D2",
        platinum: "#E9E8E4",
        steel: "#9DA0A2",
        // ── Typography / ink ────────────────────────────────────
        graphite: "#2B2824",
        ink: "#1A1815",
        charcoal: "#3A362F",
        // ── Accent: gold-bronze drawn from the logo ─────────────
        gold: {
          DEFAULT: "#B08A5B",
          light: "#C9A574",
          soft: "#D9BE96",
          deep: "#8C6A41",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        // fluid editorial scale
        "display-xl": ["clamp(3.5rem, 9vw, 11rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 6.5vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2.25rem, 4.5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.875rem, 3vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.16em",
      },
      borderRadius: {
        "4xl": "2.5rem",
        "5xl": "3.5rem",
      },
      boxShadow: {
        soft: "0 2px 30px -12px rgba(43, 40, 36, 0.12)",
        luxe: "0 30px 80px -32px rgba(43, 40, 36, 0.28)",
        glow: "0 0 60px -12px rgba(176, 138, 91, 0.35)",
        "inner-soft": "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        "champagne-gradient":
          "linear-gradient(135deg, #F7F3EC 0%, #E7DAC6 48%, #D9BE96 100%)",
        "pearl-gradient":
          "linear-gradient(160deg, #FDFCFA 0%, #EFE7DA 100%)",
        "clinic-gradient":
          "linear-gradient(160deg, #FDFCFA 0%, #E9E8E4 55%, #D7D6D2 100%)",
        "ink-gradient":
          "linear-gradient(165deg, #2B2824 0%, #1A1815 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #B08A5B, transparent)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
        "luxe-in": "cubic-bezier(0.62, 0, 0.36, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s var(--ease-luxe, cubic-bezier(0.22,1,0.36,1)) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        marquee: "marquee var(--marquee-duration, 32s) linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
