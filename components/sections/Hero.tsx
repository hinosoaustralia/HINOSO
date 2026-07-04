"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PodRender from "@/components/ui/PodRender";
import MarqueeRow from "@/components/ui/MarqueeRow";
import MagneticButton from "@/components/ui/MagneticButton";
import { SplitWords } from "@/components/ui/AnimatedText";

// Faint scrolling word-wall behind the hero product.
const BG_ROWS = [
  ["Recovery", "Wireless heat", "EMS"],
  ["TENS", "No wires", "Reimagined"],
  ["Made simple", "Wearable", "Recovery"],
  ["No gel mess", "Wireless heat", "TENS"],
  ["Reimagined", "EMS", "Made simple"],
];

/**
 * SECTION 1 — Hero.
 * The product is only ever glimpsed — a blurred, darkened shape behind the
 * headline, wrapped in a slow-breathing sage aura so it stays a mystery. It
 * scales up as you scroll while the copy lifts and fades.
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

  // Product scales up + drifts as you scroll — it looms closer but never clears.
  const podScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.34]);
  const podY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-obsidian px-6 py-24"
    >
      {/* Faint scrolling word-wall in the background, behind the product. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center gap-1 opacity-[0.07] sm:gap-2"
      >
        {BG_ROWS.map((items, i) => (
          <MarqueeRow
            key={i}
            items={items}
            direction={i % 2 ? "right" : "left"}
            duration={34 + i * 5}
            dotClassName="bg-bone/40"
            className="text-6xl font-semibold tracking-tightest text-bone sm:text-7xl md:text-8xl"
          />
        ))}
      </div>

      {/* slow-breathing sage aura */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(141,154,136,0.20) 0%, rgba(141,154,136,0.05) 40%, transparent 68%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* soft light that drifts across the product — dynamic lighting */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(222,220,210,0.12) 0%, transparent 66%)",
          filter: "blur(28px)",
        }}
        animate={{ x: ["-28%", "26%", "-28%"], y: ["-16%", "12%", "-16%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 42%, rgba(3,3,3,0.78) 100%)",
        }}
      />

      {/* The product — large, blurred, dimmed. A glimpse, never a reveal. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(920px,110vw)] -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ scale: podScale, y: podY }}>
          <PodRender
            imgFilter="brightness(0.6) contrast(1.08) saturate(0.88) blur(11px)"
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
            "radial-gradient(46% 42% at 50% 44%, rgba(4,4,4,0.55) 0%, rgba(4,4,4,0.18) 55%, transparent 75%)",
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
