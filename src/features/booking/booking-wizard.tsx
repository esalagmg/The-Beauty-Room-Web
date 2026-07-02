"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MessageCircle,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { siteConfig } from "@/constants/site";
import { SmartImage } from "@/components/ui/smart-image";
import { Calendar, TIME_SLOTS } from "./calendar";
import { BookingSummary } from "./booking-summary";
import { findCategory, findService, specialistsForDivision } from "./resolve";
import { submitBooking, getTakenSlots } from "./actions";
import { serviceCategories } from "@/constants/services";
import { specialists as staticSpecialists } from "@/constants/specialists";
import { brand, img } from "@/constants/images";
import type { BookingState, Division, ServiceCategory, Specialist } from "@/types";
import { cn, pad } from "@/lib/utils";

const STEPS = [
  { id: "division", label: "Division", title: "Where shall we begin?" },
  { id: "category", label: "Category", title: "Choose a category" },
  { id: "service", label: "Service", title: "Select your service" },
  { id: "specialist", label: "Specialist", title: "Choose your specialist" },
  { id: "date", label: "Date & Time", title: "Find the perfect moment" },
  { id: "info", label: "Details", title: "A few last details" },
  { id: "confirm", label: "Confirm", title: "Review & confirm" },
] as const;

const EMPTY: BookingState = {
  division: null,
  categoryId: null,
  serviceId: null,
  specialistId: null,
  date: null,
  time: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export function BookingWizard({
  allCategories = serviceCategories,
  allSpecialists = staticSpecialists,
}: {
  allCategories?: ServiceCategory[];
  allSpecialists?: Specialist[];
}) {
  const params = useSearchParams();

  const [state, setState] = useState<BookingState>(() => ({
    ...EMPTY,
    division: (params.get("division") as Division) || null,
    categoryId: params.get("category"),
    specialistId: params.get("specialist"),
    date: params.get("date"),
  }));

  // start past steps that are already satisfied via query params
  const [index, setIndex] = useState(() => (params.get("division") ? 1 : 0));
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);

  const set = (patch: Partial<BookingState>) => setState((s) => ({ ...s, ...patch }));

  // Load real availability (booked + past + lead-time) for the chosen date.
  useEffect(() => {
    let active = true;
    if (!state.date || !state.serviceId) {
      setTakenSlots([]);
      return;
    }
    getTakenSlots({
      treatmentId: state.serviceId,
      specialistId: state.specialistId,
      date: state.date,
    })
      .then((slots) => {
        if (!active) return;
        setTakenSlots(slots);
        // Clear a chosen time that has since become unavailable.
        setState((s) => (s.time && slots.includes(s.time) ? { ...s, time: null } : s));
      })
      .catch(() => active && setTakenSlots([]));
    return () => {
      active = false;
    };
  }, [state.date, state.serviceId, state.specialistId]);

  const handleConfirm = async () => {
    if (!state.division || !state.serviceId || !state.date || !state.time) return;
    setSubmitting(true);
    setSubmitError(null);
    const res = await submitBooking({
      division: state.division,
      treatmentId: state.serviceId,
      specialistId: state.specialistId,
      date: state.date,
      time: state.time,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      notes: state.notes,
    });
    setSubmitting(false);
    if (res.ok) {
      setBookingRef(res.reference);
      setDone(true);
    } else {
      setSubmitError(res.message);
      if (res.reason === "slot_taken") {
        setDir(-1);
        setIndex(4); // back to date & time
        scrollToTop();
      }
    }
  };

  const categories = useMemo(
    () => allCategories.filter((c) => c.division === state.division),
    [allCategories, state.division],
  );
  const category = findCategory(allCategories, state.categoryId);
  const specialists = useMemo(
    () => specialistsForDivision(allSpecialists, state.division),
    [allSpecialists, state.division],
  );

  const step = STEPS[index];

  const canProceed = (() => {
    switch (step.id) {
      case "division":
        return !!state.division;
      case "category":
        return !!state.categoryId;
      case "service":
        return !!state.serviceId;
      case "specialist":
        return !!state.specialistId;
      case "date":
        return !!state.date && !!state.time;
      case "info":
        return (
          state.firstName.trim().length > 1 &&
          /\S+@\S+\.\S+/.test(state.email) &&
          state.phone.trim().length > 6
        );
      default:
        return true;
    }
  })();

  // Bring the new step's title back into view when advancing — on mobile the
  // Continue button sits below a long list, so without this the next step
  // opens mid-scroll.
  const topRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    const el = topRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => Math.min(STEPS.length - 1, Math.max(0, i + delta)));
    scrollToTop();
  };

  const jumpTo = (i: number) => {
    if (i < index) {
      setDir(-1);
      setIndex(i);
      scrollToTop();
    }
  };

  const progress = ((index + 1) / STEPS.length) * 100;

  if (done)
    return (
      <SuccessScreen
        state={state}
        categories={allCategories}
        reference={bookingRef}
      />
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
      {/* ── Main column ───────────────────────────────────────── */}
      <div>
        {/* progress */}
        <div ref={topRef} className="mb-10 scroll-mt-28">
          <div className="hidden items-center justify-between md:flex">
            {STEPS.map((s, i) => {
              const active = i === index;
              const complete = i < index;
              return (
                <button
                  key={s.id}
                  onClick={() => jumpTo(i)}
                  disabled={i >= index}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-[0.62rem] transition-colors",
                      active && "border-graphite bg-graphite text-cream",
                      complete && "border-gold bg-gold text-cream",
                      !active && !complete && "border-stone/60 text-taupe",
                    )}
                  >
                    {complete ? <Check className="h-3 w-3" /> : pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      "font-sans text-[0.62rem] uppercase tracking-wide2 transition-colors",
                      active ? "text-graphite" : "text-taupe",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* mobile progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-deep">
                Step {index + 1} / {STEPS.length}
              </span>
              <span className="font-sans text-[0.65rem] uppercase tracking-wide2 text-taupe">
                {step.label}
              </span>
            </div>
          </div>

          <div className="mt-4 h-px w-full overflow-hidden bg-stone/40">
            <motion.div
              className="h-full bg-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* step title */}
        <div className="mb-8">
          <span className="font-serif text-sm italic text-gold-deep">
            {pad(index + 1)} of {STEPS.length} · steps to radiance
          </span>
          <h1 className="mt-2 font-serif text-display-sm font-light leading-tight text-graphite">
            {step.title}
          </h1>
        </div>

        {/* steps */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {step.id === "division" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      { id: "salon", title: "The Salon", desc: "Hair · Bridal · Makeup", image: brand.hairBlowout, icon: Scissors },
                      { id: "clinic", title: "Aesthetic Clinic", desc: "Skin · Advanced · Wellness", image: img.clinicGlow, icon: Sparkles },
                    ] as const
                  ).map((d) => (
                    <SelectCard
                      key={d.id}
                      selected={state.division === d.id}
                      onClick={() =>
                        set({ division: d.id, categoryId: null, serviceId: null, specialistId: null })
                      }
                      image={d.image}
                      tall
                    >
                      <d.icon className="h-5 w-5 text-gold-soft" />
                      <p className="mt-3 font-serif text-2xl font-light text-cream">{d.title}</p>
                      <p className="font-sans text-[0.62rem] uppercase tracking-wide2 text-cream/70">
                        {d.desc}
                      </p>
                    </SelectCard>
                  ))}
                </div>
              )}

              {step.id === "category" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((c) => (
                    <SelectCard
                      key={c.id}
                      selected={state.categoryId === c.id}
                      onClick={() => set({ categoryId: c.id, serviceId: null })}
                      image={c.image}
                    >
                      <p className="font-serif text-xl font-light text-cream">{c.name}</p>
                      <p className="font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/70">
                        {c.tagline}
                      </p>
                    </SelectCard>
                  ))}
                </div>
              )}

              {step.id === "service" && (
                <div className="space-y-3">
                  {category?.services.map((s) => {
                    const selected = state.serviceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => set({ serviceId: s.id })}
                        aria-pressed={selected}
                        className={cn(
                          "flex w-full items-center justify-between gap-4 rounded-3xl border p-5 text-left transition-all duration-400",
                          selected
                            ? "border-graphite bg-graphite text-cream"
                            : "border-stone/50 bg-white/50 hover:border-graphite/50",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 font-serif text-xl font-light">
                            {s.name}
                            {s.highlight && (
                              <Star
                                className={cn(
                                  "h-3.5 w-3.5",
                                  selected ? "fill-gold-soft text-gold-soft" : "fill-gold text-gold",
                                )}
                              />
                            )}
                          </span>
                          <span
                            className={cn(
                              "mt-1 block text-sm",
                              selected ? "text-cream/70" : "text-charcoal/65",
                            )}
                          >
                            {s.description}
                          </span>
                          <span
                            className={cn(
                              "mt-2 inline-flex items-center gap-1.5 font-sans text-[0.62rem] uppercase tracking-wide2",
                              selected ? "text-cream/60" : "text-taupe",
                            )}
                          >
                            <Clock className="h-3 w-3" /> {s.duration}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span
                            className={cn(
                              "font-serif text-lg",
                              selected ? "text-cream" : "text-graphite",
                            )}
                          >
                            {s.price}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step.id === "specialist" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {specialists.map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => set({ specialistId: sp.id })}
                      aria-pressed={state.specialistId === sp.id}
                      className={cn(
                        "group flex items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-400",
                        state.specialistId === sp.id
                          ? "border-graphite bg-graphite text-cream"
                          : "border-stone/50 bg-white/50 hover:border-graphite/50",
                      )}
                    >
                      <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                        <SmartImage
                          src={sp.image}
                          alt={sp.name}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                          wrapperClassName="h-full w-full"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-xl font-light">{sp.name}</span>
                        <span
                          className={cn(
                            "block font-sans text-[0.58rem] uppercase tracking-wide2",
                            state.specialistId === sp.id ? "text-gold-soft" : "text-gold-deep",
                          )}
                        >
                          {sp.role}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block font-sans text-[0.58rem] uppercase tracking-wide2",
                            state.specialistId === sp.id ? "text-cream/60" : "text-taupe",
                          )}
                        >
                          {sp.experience}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step.id === "date" && (
                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <Calendar value={state.date} onChange={(d) => set({ date: d })} />
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-deep">
                      Available times
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map((t) => {
                        const selected = state.time === t;
                        const unavailable = takenSlots.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={!state.date || unavailable}
                            onClick={() => set({ time: t })}
                            aria-pressed={selected}
                            className={cn(
                              "rounded-2xl border py-3.5 font-sans text-sm transition-all duration-300 disabled:cursor-not-allowed",
                              unavailable && "line-through opacity-30",
                              !unavailable && "disabled:opacity-40",
                              selected
                                ? "border-graphite bg-graphite text-cream"
                                : "border-stone/50 bg-white/50 text-graphite hover:border-graphite/50",
                            )}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {!state.date && (
                      <p className="mt-4 text-sm text-taupe">Select a date to see times.</p>
                    )}
                    {state.date && takenSlots.length >= TIME_SLOTS.length && (
                      <p className="mt-4 text-sm text-taupe">
                        No times left on this date — please choose another day.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step.id === "info" && (
                <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    autoComplete="given-name"
                    value={state.firstName}
                    onChange={(v) => set({ firstName: v })}
                  />
                  <Field
                    label="Last name"
                    autoComplete="family-name"
                    value={state.lastName}
                    onChange={(v) => set({ lastName: v })}
                  />
                  <Field
                    label="Email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={state.email}
                    onChange={(v) => set({ email: v })}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={state.phone}
                    onChange={(v) => set({ phone: v })}
                  />
                  <label className="sm:col-span-2">
                    <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe">
                      Notes (optional)
                    </span>
                    <textarea
                      rows={3}
                      value={state.notes}
                      onChange={(e) => set({ notes: e.target.value })}
                      placeholder="Allergies, preferences, inspiration…"
                      className="mt-1.5 w-full resize-none rounded-2xl border border-stone/50 bg-white/60 px-5 py-4 font-sans text-sm text-graphite outline-none transition-colors placeholder:text-taupe/70 focus:border-gold"
                    />
                  </label>
                </div>
              )}

              {step.id === "confirm" && (
                <ConfirmReview
                  state={state}
                  categories={allCategories}
                  onEdit={(i) => jumpTo(i)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitError && (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3 text-center font-sans text-sm text-gold-deep"
          >
            {submitError}
          </p>
        )}

        {/* nav */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => go(-1)}
            disabled={index === 0 || submitting}
            className="inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-luxe text-graphite transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {index < STEPS.length - 1 ? (
            <button
              onClick={() => go(1)}
              disabled={!canProceed}
              className="group inline-flex items-center gap-2.5 rounded-full bg-graphite px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-all duration-500 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-all duration-500 hover:bg-gold-deep disabled:opacity-60"
            >
              {submitting ? "Confirming…" : "Confirm booking"}
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Floating summary ──────────────────────────────────── */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <BookingSummary
          state={state}
          categories={allCategories}
          specialists={allSpecialists}
        />
      </div>
    </div>
  );
}

/* ── helpers ─────────────────────────────────────────────────── */

function SelectCard({
  selected,
  onClick,
  image,
  children,
  tall = false,
}: {
  selected: boolean;
  onClick: () => void;
  image: string;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative overflow-hidden rounded-3xl border text-left transition-all duration-400",
        tall ? "aspect-[4/3]" : "aspect-[4/3]",
        selected ? "border-gold ring-2 ring-gold/40" : "border-transparent",
      )}
    >
      <SmartImage
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 90vw, 30vw"
        className={cn(
          "object-cover transition-transform duration-700 ease-luxe group-hover:scale-105",
          selected && "scale-105",
        )}
        wrapperClassName="h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      {selected && (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-cream">
          <Check className="h-4 w-4" />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5">{children}</div>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block">
      <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-taupe">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-stone/50 bg-white/60 px-5 py-4 font-sans text-sm text-graphite outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function ConfirmReview({
  state,
  categories,
  onEdit,
}: {
  state: BookingState;
  categories: ServiceCategory[];
  onEdit: (i: number) => void;
}) {
  const category = findCategory(categories, state.categoryId);
  const service = findService(categories, state.categoryId, state.serviceId);
  const dateStr = state.date
    ? new Date(state.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not set";

  const lines = [
    { label: "Division", value: state.division === "salon" ? "The Salon" : "Aesthetic Clinic", step: 0 },
    { label: "Category", value: category?.name, step: 1 },
    { label: "Service", value: service?.name, step: 2 },
    { label: "When", value: `${dateStr} · ${state.time}`, step: 4 },
    { label: "Guest", value: `${state.firstName} ${state.lastName}`.trim(), step: 5 },
    { label: "Contact", value: `${state.email} · ${state.phone}`, step: 5 },
  ];

  return (
    <div className="rounded-[28px] border border-stone/50 bg-white/50 p-6 md:p-8">
      <ul className="divide-y divide-stone/40">
        {lines.map((l) => (
          <li key={l.label} className="flex items-center justify-between gap-4 py-4">
            <span className="font-sans text-[0.62rem] uppercase tracking-wide2 text-taupe">
              {l.label}
            </span>
            <span className="flex items-center gap-3 text-right">
              <span className="font-serif text-lg text-graphite">{l.value || "Not set"}</span>
              <button
                onClick={() => onEdit(l.step)}
                className="font-sans text-[0.58rem] uppercase tracking-wide2 text-gold-deep underline-offset-4 hover:underline"
              >
                Edit
              </button>
            </span>
          </li>
        ))}
      </ul>
      {service && (
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-graphite px-5 py-4 text-cream">
          <span className="font-sans text-[0.62rem] uppercase tracking-luxe text-gold-soft">
            Estimated from
          </span>
          <span className="font-serif text-2xl">{service.price}</span>
        </div>
      )}
      <p className="mt-4 text-center text-[0.7rem] text-taupe">
        No payment required now. Confirm and we&apos;ll hold your slot.
      </p>
    </div>
  );
}

function SuccessScreen({
  state,
  categories,
  reference,
}: {
  state: BookingState;
  categories: ServiceCategory[];
  reference: string | null;
}) {
  const service = findService(categories, state.categoryId, state.serviceId);
  const dateStr = state.date
    ? new Date(state.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-xl py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-cream"
      >
        <Check className="h-9 w-9" />
      </motion.div>
      <h1 className="mt-8 font-serif text-display-sm font-light text-graphite">
        Request <span className="italic text-gold-foil">received</span>
      </h1>
      <p className="mt-4 text-pretty text-charcoal/75">
        Thank you, {state.firstName || "lovely"}. We&apos;ve received your request
        for <span className="font-medium text-graphite">{service?.name}</span>
        {dateStr && ` on ${dateStr} at ${state.time}`}. We&apos;ll confirm your
        appointment shortly on WhatsApp.
      </p>
      {reference && (
        <p className="mt-4 inline-block rounded-full border border-stone/50 bg-white/60 px-5 py-2 font-sans text-[0.7rem] uppercase tracking-wide2 text-taupe">
          Reference · <span className="text-graphite">{reference}</span>
        </p>
      )}
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-graphite px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-cream transition-colors hover:bg-ink"
        >
          <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
        </a>
        <Link
          href="/"
          className="rounded-full border border-graphite/30 px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite transition-colors hover:border-graphite"
        >
          Back to home
        </Link>
      </div>
    </motion.div>
  );
}
