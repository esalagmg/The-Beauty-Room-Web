"use client";

import { useActionState } from "react";
import { Wordmark } from "@/components/layout/wordmark";
import { signIn, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    signIn,
    null,
  );

  return (
    <div className="rounded-[28px] border border-cream/10 bg-white/[0.04] p-8 backdrop-blur">
      <div className="flex justify-center text-gold-soft">
        <Wordmark href={null} size="sm" />
      </div>
      <p className="mt-6 text-center font-sans text-[0.62rem] uppercase tracking-luxe text-cream/50">
        Admin sign in
      </p>

      <form action={action} className="mt-7 space-y-3">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-2xl border border-cream/15 bg-white/5 px-5 py-3.5 font-sans text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-cream/15 bg-white/5 px-5 py-3.5 font-sans text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
        />

        {state?.error && (
          <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 font-sans text-[0.7rem] text-gold-soft">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-cream py-3.5 font-sans text-[0.72rem] uppercase tracking-luxe text-graphite transition-colors hover:bg-white disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
