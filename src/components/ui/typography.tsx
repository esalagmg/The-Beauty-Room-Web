import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase editorial label, optionally with a leading rule. */
export function Eyebrow({
  children,
  className,
  withRule = true,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  withRule?: boolean;
  tone?: "gold" | "light" | "muted";
}) {
  const toneClass =
    tone === "light" ? "text-cream/70" : tone === "muted" ? "text-taupe" : "text-gold-deep";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-luxe",
        toneClass,
        className,
      )}
    >
      {withRule && (
        <span
          className={cn(
            "h-px w-8",
            tone === "light" ? "bg-cream/40" : "bg-gold/50",
          )}
        />
      )}
      {children}
    </span>
  );
}

/** Standard editorial section heading (serif display). */
export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-display-md font-light leading-[1.02] text-graphite",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** A figure number used in editorial/timeline layouts (e.g. "01"). */
export function Figure({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-serif text-2xl font-light italic text-gold/70 tabular-nums",
        className,
      )}
    >
      {children}
    </span>
  );
}
