"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Scissors, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Division } from "@/types";

/**
 * In-hero quick-booking teaser. Captures intent (division + date) and deep-links
 * into the full booking wizard with those choices pre-filled.
 */
export function FloatingBookingWidget({ className }: { className?: string }) {
  const router = useRouter();
  const [division, setDivision] = useState<Division>("salon");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState("");

  const submit = () => {
    const params = new URLSearchParams({ division });
    if (date) params.set("date", date);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass w-full max-w-sm rounded-[28px] p-6 shadow-luxe",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-deep">
          Reserve your moment
        </span>
        <CalendarDays className="h-4 w-4 text-gold-deep" />
      </div>

      {/* Division toggle */}
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-white/40 p-1.5">
        {(
          [
            { id: "salon", label: "Salon", icon: Scissors },
            { id: "clinic", label: "Clinic", icon: Sparkles },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setDivision(id)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl py-2.5 font-sans text-[0.72rem] uppercase tracking-wide2 transition-all duration-400 ease-luxe",
              division === id
                ? "bg-graphite text-cream shadow-soft"
                : "text-graphite/60 hover:text-graphite",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Date */}
      <label className="mt-4 block">
        <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe">
          Preferred date
        </span>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-stone/50 bg-white/50 px-4 py-3 font-sans text-sm text-graphite outline-none transition-colors focus:border-gold"
        />
      </label>

      <button
        onClick={submit}
        data-cursor-label="Book"
        className="group mt-5 flex w-full items-center justify-between rounded-xl bg-graphite px-5 py-3.5 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors duration-500 hover:bg-gold-deep"
      >
        Check availability
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </button>

      <p className="mt-3 text-center text-[0.65rem] text-taupe">
        Instant confirmation · No payment required
      </p>
    </motion.div>
  );
}
