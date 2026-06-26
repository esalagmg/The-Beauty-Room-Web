"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Calendar } from "lucide-react";
import { Wordmark } from "./wordmark";
import { MobileNav } from "./mobile-nav";
import { Magnetic } from "@/components/ui/magnetic";
import { navLinks } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    // hide on scroll-down, reveal on scroll-up (past the hero)
    setHidden(latest > prev && latest > 480);
  });

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[900] flex justify-center px-4 pt-4 md:pt-5"
    >
      <nav
        className={cn(
          "flex w-full max-w-[1320px] items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ease-luxe md:px-7",
          scrolled
            ? "glass shadow-soft"
            : "border border-transparent bg-transparent",
        )}
      >
        {/* Left — wordmark */}
        <Wordmark size="sm" className="text-graphite" />

        {/* Center — links (desktop) */}
        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href.startsWith("/") && !link.href.includes("#")
                ? pathname === link.href
                : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link-underline font-sans text-[0.78rem] uppercase tracking-wide2 text-graphite/80 transition-colors hover:text-graphite",
                  active && "text-gold-deep",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right — CTA + mobile trigger */}
        <div className="flex items-center gap-3">
          <Magnetic strength={0.25} className="hidden md:block">
            <Link
              href="/booking"
              data-cursor-label="Book"
              className="group inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-2.5 font-sans text-[0.72rem] uppercase tracking-wide2 text-cream transition-colors duration-500 hover:bg-gold-deep"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book Now
            </Link>
          </Magnetic>
          <MobileNav />
        </div>
      </nav>
    </motion.header>
  );
}
