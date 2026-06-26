"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-sans font-medium tracking-wide2 uppercase transition-colors duration-500 ease-luxe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-graphite text-cream hover:bg-ink",
        gold: "bg-gold text-cream hover:bg-gold-deep",
        outline: "border border-graphite/30 text-graphite hover:border-graphite",
        ghost: "text-graphite hover:text-gold-deep",
        light: "bg-cream text-graphite hover:bg-white",
        dark: "border border-cream/25 text-cream hover:bg-cream hover:text-graphite",
      },
      size: {
        sm: "h-10 px-5 text-[0.65rem]",
        md: "h-[52px] px-7 text-[0.7rem]",
        lg: "h-[60px] px-9 text-[0.72rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  href?: string;
  magnetic?: boolean;
  withArrow?: boolean;
  cursorLabel?: string;
}

/**
 * The brand's primary call-to-action. Supports an animated arrow, magnetic
 * hover, and a sliding fill reveal. Renders as a Link when `href` is given.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      magnetic = true,
      withArrow = false,
      cursorLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {withArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        )}
      </span>
    );

    const classes = cn(button({ variant, size }), className);

    const inner = href ? (
      <Link href={href} className={classes} data-cursor-label={cursorLabel}>
        {content}
      </Link>
    ) : (
      <button ref={ref} className={classes} data-cursor-label={cursorLabel} {...props}>
        {content}
      </button>
    );

    if (!magnetic) return inner;
    return <Magnetic strength={0.3}>{inner}</Magnetic>;
  },
);
Button.displayName = "Button";
