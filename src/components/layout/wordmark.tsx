import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark rendered in the brand serif so it inherits `currentColor`
 * and sits cleanly on any background (glass, ink, cream) — unlike the raster
 * logo which carries a white plate.
 */
export function Wordmark({
  className,
  size = "md",
  href = "/",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
}) {
  const scale = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }[size];

  const inner = (
    <span className={cn("flex flex-col items-center leading-none", className)}>
      <span className={cn("font-serif font-medium italic tracking-tight", scale)}>
        The Beauty Room
      </span>
      <span className="mt-1 font-sans text-[0.55rem] uppercase tracking-luxe opacity-70">
        By Nilu
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="The Beauty Room by Nilu, home" className="inline-block">
      {inner}
    </Link>
  );
}
