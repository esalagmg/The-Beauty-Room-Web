"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";

/**
 * Wraps content so it's gently pulled toward the cursor on hover — the
 * "magnetic button" effect. No-op on touch devices.
 */
export function Magnetic({
  children,
  strength = 0.35,
  max,
  className,
}: {
  children: ReactNode;
  strength?: number;
  /** Clamp the pull to ±max px on each axis so the element can't drift into a
   *  neighbour (useful for side-by-side buttons with a small gap). */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useHasFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const clamp = (v: number) =>
    max == null ? v : Math.max(-max, Math.min(max, v));

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hasFinePointer) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(clamp(relX * strength));
    y.set(clamp(relY * strength));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
