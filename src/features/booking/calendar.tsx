"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISO(d: Date) {
  return d.toISOString().split("T")[0];
}

/** A refined month calendar. Past dates are disabled; selection is ISO (YYYY-MM-DD). */
export function Calendar({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (iso: string) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const initial = value ? new Date(value) : today;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.year, view.month, i + 1)),
  ];

  const canGoBack =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth());

  const shift = (delta: number) => {
    setView((v) => {
      const m = v.month + delta;
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });
  };

  return (
    <div className="rounded-[28px] border border-stone/50 bg-white/60 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <button
          onClick={() => canGoBack && shift(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/60 text-graphite transition-colors hover:bg-graphite hover:text-cream disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-graphite"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-serif text-xl font-light text-graphite">
          {MONTHS[view.month]} <span className="text-taupe">{view.year}</span>
        </p>
        <button
          onClick={() => shift(1)}
          aria-label="Next month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/60 text-graphite transition-colors hover:bg-graphite hover:text-cream"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            className="flex h-8 items-center justify-center font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe"
          >
            {d}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const iso = toISO(date);
          const isPast = date < today;
          const isSelected = value === iso;
          const isToday = iso === toISO(today);
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onChange(iso)}
              className={cn(
                "relative flex h-11 items-center justify-center rounded-full font-sans text-sm transition-all duration-300",
                isPast && "cursor-not-allowed text-stone/60",
                !isPast && !isSelected && "text-graphite hover:bg-champagne/50",
                isSelected && "bg-graphite text-cream",
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="cal-selected"
                  className="absolute inset-0 rounded-full bg-graphite"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{date.getDate()}</span>
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const TIME_SLOTS = [
  "9:00", "10:00", "11:00", "12:00",
  "13:30", "14:30", "15:30", "16:30", "17:30", "18:30",
];
