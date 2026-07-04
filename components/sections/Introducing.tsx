"use client";

import { motion } from "framer-motion";
import { MODALITIES } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 3 — Introducing The HINOSO Pod.
 * Names the product and states what it does — three therapies in one pod —
 * without ever showing it clearly. The full reveal is saved for launch.
 */
export default function Introducing() {
  return (
    <section
      id="introducing"
      className="section relative overflow-hidden bg-bone py-16 md:py-32"
    >
      <div className="container-hinoso px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Introducing</span>
          <SplitWords
            as="h2"
            text="The HINOSO Pod."
            className="mt-4 justify-center text-5xl font-semibold tracking-tightest text-charcoal sm:text-6xl md:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-charcoal-muted sm:text-xl text-balance">
              Three proven therapies in one wireless pod, controlled from your
              phone. Small enough to forget you&rsquo;re wearing it.
            </p>
          </Reveal>
        </div>

        {/* The three therapies — the star of the section now. */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {MODALITIES.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-charcoal/8 bg-gradient-to-b from-white/70 to-bone/30 p-8 shadow-soft transition-shadow duration-500 hover:shadow-soft-lg md:p-10"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sage/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="text-6xl font-semibold leading-none tracking-tightest text-sage/25 md:text-7xl">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-charcoal">
                {m.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal-muted text-pretty">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center text-[11px] uppercase tracking-[0.34em] text-sage-700">
            The pod, fully revealed at launch
          </p>
        </Reveal>
      </div>
    </section>
  );
}
