"use client";

import { useEffect, useRef, useState } from "react";
import { useHasFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * A bespoke two-part cursor: a precise inner dot and a soft trailing ring.
 * Both are eased inside a single rAF loop with direct transform writes (no
 * React re-render per frame). Hover state is detected via mouseover/mouseout
 * delegation — which fires only when crossing elements, keeping it smooth.
 */
export function CustomCursor() {
  const hasFinePointer = useHasFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState<"default" | "hover">("default");

  useEffect(() => {
    if (!hasFinePointer) return;

    document.documentElement.classList.add("cursor-none-desktop");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...pointer };
    const ring = { ...pointer };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const selector = "a, button, [data-cursor], input, textarea, select, label";
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(selector);
      if (target) {
        setVariant("hover");
        setLabel(target.getAttribute("data-cursor-label") ?? "");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(selector);
      const related = (e.relatedTarget as HTMLElement)?.closest?.(selector);
      if (target && !related) {
        setVariant("default");
        setLabel("");
      }
    };

    const render = () => {
      dot.x += (pointer.x - dot.x) * 0.5;
      dot.y += (pointer.y - dot.y) * 0.5;
      ring.x += (pointer.x - ring.x) * 0.18;
      ring.y += (pointer.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-graphite mix-blend-difference will-change-transform"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center will-change-transform"
        aria-hidden
      >
        <div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-graphite/60 transition-[width,height,background-color,border-color] duration-300 ease-luxe",
            variant === "hover"
              ? "h-16 w-16 border-transparent bg-graphite/90"
              : "h-9 w-9",
          )}
        >
          {label && (
            <span className="select-none text-[0.55rem] font-medium uppercase tracking-wide2 text-cream">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
