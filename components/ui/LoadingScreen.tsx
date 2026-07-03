"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

/**
 * First-load curtain.
 * Obsidian panel + tracked-in HINOSO wordmark + a thin sage progress line,
 * then the whole panel lifts away to reveal the (dark) hero underneath.
 * Runs once per page load and locks scroll while visible.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Lock scroll while the curtain is up.
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const total = reduce ? 400 : 1500;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // Ease-out so the bar decelerates into 100%.
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Release scroll lock once the curtain is gone.
  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
  }, [visible]);

  const letters = "HINOSO".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian text-bone"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden
        >
          {/* Soft sage aura behind the wordmark. */}
          <div className="pointer-events-none absolute h-[42vmin] w-[42vmin] rounded-full bg-sage/20 blur-[80px]" />

          <div className="relative flex items-end gap-[0.12em] overflow-hidden">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-[13vw] font-semibold leading-none tracking-tightest sm:text-[9vw] md:text-[7vw]"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: reduce ? 0 : 0.1 + i * 0.06,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 flex w-[min(240px,60vw)] flex-col items-center gap-3">
            {/* Progress line. */}
            <div className="h-px w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-sage"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full items-center justify-between text-[11px] tracking-[0.24em] text-white/45">
              <span>RECOVERY. MADE SIMPLE.</span>
              <span className="tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
