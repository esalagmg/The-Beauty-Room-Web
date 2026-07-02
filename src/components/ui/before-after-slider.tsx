"use client";

import { useCallback, useRef, useState } from "react";
import { SmartImage } from "./smart-image";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after comparison. Pointer + keyboard accessible.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  className,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, next)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        // touch-pan-y: let vertical page scrolling through, but keep horizontal
        // drags for the slider (otherwise touch drags scroll the page and the
        // handle only jumps to the initial tap).
        "group relative touch-pan-y select-none overflow-hidden rounded-[28px] shadow-luxe",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        ref.current?.setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={(e) => {
        dragging.current = false;
        ref.current?.releasePointerCapture?.(e.pointerId);
      }}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* after (full) */}
      <SmartImage
        src={after}
        alt={`${alt}, after`}
        fill
        sizes="(max-width: 768px) 90vw, 45vw"
        className="object-cover"
        wrapperClassName="h-full w-full"
      />

      {/* before (clipped) */}
      <div
        className="absolute inset-0 h-full"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <SmartImage
          src={before}
          alt={`${alt}, before`}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-cover"
          wrapperClassName="h-full w-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-graphite/70 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-cream backdrop-blur">
          Before
        </span>
      </div>
      <span className="absolute right-4 top-4 rounded-full bg-cream/80 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 text-graphite backdrop-blur">
        After
      </span>

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10 flex w-px cursor-ew-resize items-center justify-center bg-cream"
        style={{ left: `${pos}%` }}
        role="slider"
        aria-label={`${alt} comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
        }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-graphite/10 bg-cream shadow-luxe">
          <span className="flex gap-0.5 text-graphite">
            <ChevronGlyph dir="left" />
            <ChevronGlyph dir="right" />
          </span>
        </span>
      </div>
    </div>
  );
}

function ChevronGlyph({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      className={dir === "right" ? "rotate-180" : ""}
    >
      <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
