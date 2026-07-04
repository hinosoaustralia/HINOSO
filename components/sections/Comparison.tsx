"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

/**
 * SECTION 8 — Comparison.
 * No tables — two columns slide in from opposite sides and their rows cascade,
 * contrasting yesterday's TENS units with HINOSO.
 */
export default function Comparison() {
  return (
    <section className="section relative overflow-hidden bg-bone py-20 md:py-40">
      <div className="container-hinoso px-6">
        <div className="mb-16 text-center">
          <span className="eyebrow">The difference</span>
          <SplitWords
            as="h2"
            text="A generation ahead."
            className="mt-4 justify-center text-4xl font-semibold tracking-tightest text-charcoal sm:text-5xl md:text-6xl"
          />
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Traditional — slides in from the left, muted. */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[1.75rem] border border-charcoal/8 bg-stone-light/40 p-8 md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-charcoal-muted">
              {COMPARISON.traditional.label}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 space-y-5"
            >
              {COMPARISON.traditional.points.map((pt) => (
                <motion.li key={pt.text} variants={staggerItem} className="flex items-center gap-4">
                  <CrossIcon />
                  <span className="text-lg text-charcoal-muted line-through decoration-charcoal/20">
                    {pt.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* HINOSO — slides in from the right, elevated. */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-sage/30 bg-gradient-to-br from-white to-sage-50 p-8 shadow-soft md:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sage/15 blur-3xl" />
            <p className="relative text-sm uppercase tracking-[0.2em] text-sage-700">
              {COMPARISON.hinoso.label}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative mt-8 space-y-5"
            >
              {COMPARISON.hinoso.points.map((pt) => (
                <motion.li key={pt.text} variants={staggerItem} className="flex items-center gap-4">
                  <CheckIcon />
                  <span className="text-lg font-medium text-charcoal">{pt.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sage text-obsidian">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-charcoal/15 text-charcoal-muted">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </span>
  );
}
