import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "cream" | "pearl" | "ink" | "clinic" | "transparent";

const toneStyles: Record<Tone, string> = {
  cream: "bg-cream text-graphite",
  pearl: "bg-pearl-gradient text-graphite",
  ink: "bg-ink-gradient text-cream",
  clinic: "bg-clinic-gradient text-graphite",
  transparent: "text-graphite",
};

/**
 * Consistent vertical rhythm + horizontal container for page sections.
 * `tone` switches the section's mood (warm cream, clinical silver, dark ink…).
 */
export function Section({
  children,
  id,
  className,
  innerClassName,
  tone = "cream",
  container = true,
  fullBleed = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  tone?: Tone;
  container?: boolean;
  fullBleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        !fullBleed && "py-24 md:py-32 lg:py-40",
        toneStyles[tone],
        className,
      )}
    >
      {container ? (
        <div className={cn("container", innerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
