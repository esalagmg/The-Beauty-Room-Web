"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/use-lenis";

/**
 * Smooth scrolling for desktop (mouse-wheel) only.
 *
 * On touch devices we keep NATIVE scrolling — it's more reliable for initial
 * layout, gives correct momentum, and avoids the "content only settles after
 * the first scroll" bug caused by smooth-scroll libraries mis-measuring before
 * fonts/images load. We also force a ScrollTrigger/Framer re-measure once the
 * page has fully loaded so nothing depends on a scroll to render correctly.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    // Re-measure every scroll-driven animation once layout is stable.
    const refresh = () => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize")); // nudges Framer useScroll
    };
    if (document.readyState === "complete") requestAnimationFrame(refresh);
    else window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    let instance: Lenis | null = null;
    let update: ((time: number) => void) | null = null;

    if (!reduced && finePointer) {
      instance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      instance.on("scroll", ScrollTrigger.update);
      const inst = instance;
      update = (time: number) => inst.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    }

    return () => {
      window.removeEventListener("load", refresh);
      if (update) gsap.ticker.remove(update);
      if (instance) {
        instance.off("scroll", ScrollTrigger.update);
        instance.destroy();
      }
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
