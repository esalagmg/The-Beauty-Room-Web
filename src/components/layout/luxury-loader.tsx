"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "./wordmark";

/**
 * First-paint curtain. A counter ticks to 100 while the wordmark settles, then
 * the panel lifts away to reveal the hero. Shown once per session.
 */
export function LuxuryLoader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("tbr-introduced")) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("tbr-introduced", "1");
        setTimeout(() => setDone(true), 380);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-gradient text-cream"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Wordmark href={null} size="lg" className="text-gold-soft" />
          </motion.div>

          <div className="mt-10 h-px w-48 overflow-hidden bg-cream/15">
            <motion.div
              className="h-full bg-gold-soft"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="absolute bottom-10 right-8 font-serif text-6xl font-light tabular-nums text-cream/30 md:right-16">
            {count}
            <span className="align-top text-2xl">%</span>
          </div>
          <div className="absolute bottom-12 left-8 font-sans text-[0.6rem] uppercase tracking-luxe text-cream/40 md:left-16">
            Curating your experience
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
