import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/**
 * Seamless infinite marquee. A single animated track holds two identical copies
 * of the content and translates -50%, so the loop is perfectly continuous.
 * Pure CSS — runs off the main thread.
 */
export function Marquee({
  children,
  className,
  itemClassName,
  duration = 32,
  reverse = false,
  pauseOnHover = false,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          itemClassName,
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
