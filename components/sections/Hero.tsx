"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PodRender from "@/components/ui/PodRender";
import MagneticButton from "@/components/ui/MagneticButton";
import { SplitWords } from "@/components/ui/AnimatedText";

/**
 * SECTION 1 — Hero.
 * The HINOSO Pod sits large behind the headline (darkened to match the dark
 * studio), and scales up as you scroll while the copy lifts and fades — the one
 * scroll set-piece of the site.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Copy lifts and fades.
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -60]);

  // Product scales up + drifts to feel like it's coming toward you.
  const podScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.32]);
  const podY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-obsidian px-6 py-24"
    >
      {/* soft studio glow + vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(55% 45% at 50% 52%, rgba(141,154,136,0.10) 0%, transparent 62%), radial-gradient(120% 90% at 50% 45%, transparent 45%, rgba(3,3,3,0.72) 100%)",
        }}
      />

      {/* The product — large, behind the text, dimmed to match the scene. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(920px,110vw)] -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ scale: podScale, y: podY }}>
          <PodRender
            imgFilter="brightness(0.66) contrast(1.16) saturate(0.92)"
            shadow={false}
          />
        </motion.div>
      </div>

      {/* scrim so the headline stays legible over the product */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(46% 42% at 50% 44%, rgba(4,4,4,0.6) 0%, rgba(4,4,4,0.2) 55%, transparent 75%)",
        }}
      />

      {/* Copy */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center text-bone"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-sage"
        >
          Wearable Recovery
        </motion.span>

        <div className="mt-5">
          <SplitWords
            as="h1"
            trigger="mount"
            text="Recovery."
            className="justify-center text-6xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl md:text-8xl"
            delay={1.6}
          />
          <SplitWords
            as="h1"
            trigger="mount"
            text="Made Simple."
            className="justify-center text-6xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl md:text-8xl"
            delay={1.72}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="mt-8 max-w-md text-sm text-bone/70 text-balance sm:text-base"
        >
          A wearable recovery system designed for everyday movement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.9 }}
          className="mt-8"
        >
          <MagneticButton href="#waitlist" variant="light">
            Join the Waitlist
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
