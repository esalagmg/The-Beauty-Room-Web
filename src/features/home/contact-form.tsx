"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { sendInquiry } from "./contact-actions";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid number"),
  interest: z.enum(["salon", "clinic", "bridal", "other"]),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
  company: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const interests = [
  { value: "salon", label: "Salon" },
  { value: "clinic", label: "Clinic" },
  { value: "bridal", label: "Bridal" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "salon" },
  });

  const interest = watch("interest");

  const onSubmit = async (data: FormValues) => {
    setErrorMsg(null);
    const res = await sendInquiry(data);
    if (res.ok) {
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 5000);
    } else {
      setErrorMsg(res.error);
    }
  };

  const field =
    "w-full rounded-2xl border border-stone/50 bg-white/60 px-5 py-4 font-sans text-sm text-graphite outline-none transition-colors placeholder:text-taupe/70 focus:border-gold";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* honeypot — hidden from users, catches naive bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("company")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            placeholder="Full name"
            aria-label="Full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={field}
            {...register("name")}
          />
          {errors.name && <Err msg={errors.name.message} />}
        </div>
        <div>
          <input
            type="tel"
            inputMode="tel"
            placeholder="Phone"
            aria-label="Phone"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className={field}
            {...register("phone")}
          />
          {errors.phone && <Err msg={errors.phone.message} />}
        </div>
      </div>

      <div>
        <input
          type="email"
          inputMode="email"
          placeholder="Email address"
          aria-label="Email address"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={field}
          {...register("email")}
        />
        {errors.email && <Err msg={errors.email.message} />}
      </div>

      {/* interest pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {interests.map((it) => (
          <button
            key={it.value}
            type="button"
            onClick={() => setValue("interest", it.value, { shouldValidate: true })}
            className={cn(
              "rounded-full px-4 py-2 font-sans text-[0.65rem] uppercase tracking-wide2 transition-all duration-300",
              interest === it.value
                ? "bg-graphite text-cream"
                : "border border-stone/60 text-charcoal/70 hover:border-graphite",
            )}
          >
            {it.label}
          </button>
        ))}
      </div>

      <div>
        <textarea
          rows={4}
          placeholder="How can we help you feel your best?"
          aria-label="Message"
          aria-invalid={!!errors.message}
          className={cn(field, "resize-none")}
          {...register("message")}
        />
        {errors.message && <Err msg={errors.message.message} />}
      </div>

      {errorMsg && (
        <p
          role="alert"
          className="rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-center font-sans text-[0.72rem] text-gold-deep"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || sent}
        className={cn(
          "group flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-sans text-[0.72rem] uppercase tracking-luxe transition-colors duration-500",
          sent ? "bg-gold text-cream" : "bg-graphite text-cream hover:bg-ink",
        )}
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" /> Inquiry received
          </>
        ) : isSubmitting ? (
          "Sending…"
        ) : (
          <>
            Send inquiry
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  return (
    <motion.p
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 pl-1 font-sans text-[0.68rem] text-gold-deep"
    >
      {msg}
    </motion.p>
  );
}
