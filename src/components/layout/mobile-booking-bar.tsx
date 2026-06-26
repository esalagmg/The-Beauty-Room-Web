"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { siteConfig } from "@/constants/site";

/**
 * Persistent mobile action bar — the luxury "native app" booking shortcut.
 * Appears after the hero, hides on the booking page itself.
 */
export function MobileBookingBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 620));

  if (pathname.startsWith("/booking")) return null;

  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: show ? 0 : 120 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-[800] p-4 lg:hidden"
    >
      <div className="glass flex items-center gap-3 rounded-full p-2 shadow-luxe">
        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-graphite/15 text-graphite"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <Link
          href="/booking"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-graphite font-sans text-[0.72rem] uppercase tracking-luxe text-cream"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
}
