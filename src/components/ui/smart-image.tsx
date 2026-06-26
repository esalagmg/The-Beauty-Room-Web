"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "onError" | "onLoad"> & {
  /** Wrapper className (the image fills its parent when `fill` is set). */
  wrapperClassName?: string;
};

/**
 * next/image with two refinements for a luxury build:
 *  1. A soft champagne gradient placeholder fades out on load.
 *  2. If a remote URL ever fails, it degrades to an on-brand gradient plate
 *     instead of a broken-image icon — the layout always stays intact.
 */
export function SmartImage({ className, wrapperClassName, alt, src, ...props }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Treat a missing/empty src as a graceful fallback rather than passing ""
  // to next/image (which warns and can re-download the page).
  const hasSrc = typeof src === "string" ? src.length > 0 : Boolean(src);
  const showFallback = errored || !hasSrc;

  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-pearl-gradient",
        wrapperClassName,
      )}
    >
      {/* shimmer placeholder */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(110deg,#EFE7DA_8%,#F7F3EC_18%,#EFE7DA_33%)] bg-[length:200%_100%] transition-opacity duration-700",
          loaded || showFallback ? "opacity-0" : "animate-shimmer opacity-100",
        )}
        aria-hidden
      />
      {showFallback ? (
        <span
          className="absolute inset-0 z-[2] flex items-center justify-center bg-champagne-gradient"
          aria-hidden
        >
          <span className="font-serif text-3xl italic text-gold-deep/40">
            The Beauty Room
          </span>
        </span>
      ) : (
        <Image
          alt={alt}
          src={src}
          className={cn(
            "transition-opacity duration-1000 ease-luxe",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          {...props}
        />
      )}
    </span>
  );
}
