"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Depth parallax on the Y axis — DESKTOP ONLY.
 *
 * On touch devices it renders as a plain, full-height container with no
 * transform. This avoids the scroll-measurement offset that made images sit
 * slightly wrong until the first scroll, and keeps mobile scrolling smooth.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`],
  );

  return (
    <div ref={ref} className={cn(className, !finePointer && "h-full")}>
      <motion.div
        style={finePointer ? { y } : undefined}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
