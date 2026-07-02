"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, X } from "lucide-react";
import { LogoEmblem } from "./logo-emblem";
import { navLinks } from "@/constants/nav";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Dialog keyboard behaviour: Escape closes; Tab is trapped inside the
  // overlay; focus moves in on open and returns to the trigger on close.
  useEffect(() => {
    if (!open) return;

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const first = focusables()[0];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const firstEl = els[0];
      const lastEl = els[els.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === firstEl || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && (active === lastEl || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
      >
        <span className="h-px w-6 bg-graphite transition-all" />
        <span className="h-px w-6 bg-graphite transition-all" />
      </button>

      {/* Rendered in a portal so the fixed overlay escapes the navbar's
          transform (a transformed ancestor makes `fixed` anchor to it, not
          the viewport — which offset the menu once the page was scrolled). */}
      {mounted &&
        createPortal(
          <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[1000] flex flex-col bg-ink-gradient text-cream"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grain" />
            <div className="flex items-center justify-between px-6 pt-6">
              <LogoEmblem href="/" className="h-12 w-12" sizes="48px" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-cream/10 py-4"
                  >
                    <span className="font-serif text-[0.8rem] text-gold/60 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-4xl font-light transition-colors group-hover:text-gold-soft">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-5 px-6 pb-10"
            >
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center justify-center rounded-full bg-cream py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite",
                )}
              >
                Book an Appointment
              </Link>
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-wide2 text-cream/60">
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
