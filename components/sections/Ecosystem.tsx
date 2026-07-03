"use client";

import { motion } from "framer-motion";
import { ECOSYSTEM } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 7 — The Ecosystem.
 * An Apple-style bento grid. Cards of varying spans, each with a minimal glyph,
 * glassmorphism and a soft lift on hover.
 */
export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="section relative overflow-hidden bg-bone-200 py-28 md:py-40"
    >
      <div className="container-hinoso px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="eyebrow">The ecosystem</span>
          <SplitWords
            as="h2"
            text="One system. Endlessly modular."
            className="mt-4 justify-center text-4xl font-semibold tracking-tightest text-charcoal sm:text-5xl md:text-6xl text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base text-charcoal-muted sm:text-lg text-pretty">
              Everything works together, and nothing is wasted. Start with a
              pod. Grow into the whole ecosystem.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {ECOSYSTEM.map((item, i) => (
            <EcoCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcoCard({
  item,
  index,
}: {
  item: { title: string; body: string; span: string };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      data-cursor="hover"
      className={`group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-charcoal/8 bg-gradient-to-br from-white/70 to-bone/40 p-7 shadow-soft backdrop-blur transition-shadow duration-500 hover:shadow-soft-lg ${item.span}`}
    >
      {/* soft accent that blooms on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sage/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <span className="relative z-10 text-xs tabular-nums text-charcoal-muted">
        0{index + 1}
      </span>

      <div className="relative z-10">
        <h3 className="text-2xl font-semibold tracking-tight text-charcoal">
          {item.title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-muted text-pretty">
          {item.body}
        </p>
      </div>
    </motion.article>
  );
}
