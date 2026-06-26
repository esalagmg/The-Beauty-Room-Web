"use client";

import { Calendar, Clock, Scissors, Sparkles, Tag, User } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { getCategory, getService } from "@/constants/services";
import { getSpecialist } from "@/constants/specialists";
import { brand } from "@/constants/images";
import type { BookingState } from "@/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function BookingSummary({
  state,
  className,
}: {
  state: BookingState;
  className?: string;
}) {
  const category = getCategory(state.categoryId);
  const service = getService(state.categoryId, state.serviceId);
  const specialist = getSpecialist(state.specialistId);

  const rows = [
    {
      icon: state.division === "clinic" ? Sparkles : Scissors,
      label: "Division",
      value: state.division ? (state.division === "salon" ? "The Salon" : "Aesthetic Clinic") : null,
    },
    { icon: Tag, label: "Category", value: category?.name ?? null },
    { icon: Sparkles, label: "Service", value: service?.name ?? null },
    { icon: User, label: "Specialist", value: specialist?.name ?? null },
    { icon: Calendar, label: "Date", value: formatDate(state.date) },
    { icon: Clock, label: "Time", value: state.time },
  ];

  return (
    <aside
      className={cn(
        "overflow-hidden rounded-[28px] border border-cream/10 bg-ink-gradient shadow-luxe",
        className,
      )}
    >
      {/* header image */}
      <div className="relative h-28">
        <SmartImage
          src={category?.image ?? brand.hairBlowout}
          alt=""
          fill
          sizes="360px"
          className="object-cover"
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/20" />
        <div className="absolute bottom-4 left-5">
          <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold-soft">
            Your appointment
          </p>
          <p className="font-serif text-xl font-light text-cream">The Beauty Room</p>
        </div>
      </div>

      <div className="space-y-1 p-5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-3 border-b border-cream/8 py-2.5 last:border-0"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/5 text-gold-soft">
              <row.icon className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/40">
              {row.label}
            </span>
            <span
              className={cn(
                "max-w-[55%] truncate text-right font-sans text-sm",
                row.value ? "text-cream" : "text-cream/25",
              )}
            >
              {row.value ?? "Not set"}
            </span>
          </div>
        ))}

        {service && (
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-gold/10 px-4 py-3">
            <span className="font-sans text-[0.62rem] uppercase tracking-wide2 text-gold-soft">
              From
            </span>
            <span className="font-serif text-lg text-cream">{service.price}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
