"use client";

import { motion } from "framer-motion";
import { MOVEMENT_SCENES } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 5 — Designed Around Movement.
 * A calm grid of faceless lifestyle glimpses (no pinned horizontal scroll).
 * Soft gradients + minimal line art suggest where HINOSO fits into a day.
 */
export default function Movement() {
  return (
    <section className="section relative overflow-hidden bg-bone py-16 md:py-32">
      <div className="container-hinoso px-6">
        <div className="max-w-2xl">
          <span className="eyebrow">Designed around movement</span>
          <SplitWords
            as="h2"
            text="Recovery that keeps up with your day."
            className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tightest text-charcoal sm:text-5xl md:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-base text-charcoal-muted sm:text-lg text-pretty">
              Quiet, cable-free and completely unobtrusive — HINOSO goes wherever
              you do.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOVEMENT_SCENES.map((scene, i) => (
            <SceneCard key={scene.title} index={i} title={scene.title} note={scene.note} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SceneCard({
  index,
  title,
  note,
}: {
  index: number;
  title: string;
  note: string;
}) {
  const gradients = [
    "from-stone-light via-bone to-bone",
    "from-bone via-bone-200 to-stone-light",
    "from-sage-100 via-bone to-bone",
    "from-charcoal via-obsidian-800 to-obsidian",
  ];
  const dark = index === 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      whileHover={{ y: -5 }}
      data-cursor="hover"
      className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-7 shadow-soft ${gradients[index]}`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
        <SceneArt index={index} dark={dark} />
      </div>

      <div className="relative z-10">
        <span className={`text-xs tracking-[0.25em] ${dark ? "text-bone/60" : "text-charcoal-muted"}`}>
          0{index + 1}
        </span>
      </div>

      <div className="relative z-10">
        <h3 className={`text-3xl font-semibold tracking-tightest ${dark ? "text-bone" : "text-charcoal"}`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm ${dark ? "text-bone/70" : "text-charcoal-muted"}`}>
          {note}
        </p>
      </div>
    </motion.article>
  );
}

/** Minimal, faceless line illustrations per scene. */
function SceneArt({ index, dark }: { index: number; dark: boolean }) {
  const stroke = dark ? "#8D9A88" : "#B4AFA6";
  const c = { fill: "none", stroke, strokeWidth: 2.2, strokeLinecap: "round" as const };
  return (
    <svg width="55%" height="55%" viewBox="0 0 200 200">
      {index === 0 && (
        <g {...c}>
          <line x1="60" y1="100" x2="140" y2="100" />
          <rect x="40" y="80" width="18" height="40" rx="5" />
          <rect x="26" y="88" width="12" height="24" rx="4" />
          <rect x="142" y="80" width="18" height="40" rx="5" />
          <rect x="162" y="88" width="12" height="24" rx="4" />
        </g>
      )}
      {index === 1 && (
        <g {...c}>
          <rect x="55" y="60" width="90" height="60" rx="6" />
          <line x1="100" y1="120" x2="100" y2="140" />
          <line x1="70" y1="140" x2="130" y2="140" />
          <line x1="40" y1="155" x2="160" y2="155" />
        </g>
      )}
      {index === 2 && (
        <g {...c}>
          <path d="M40 150 L165 60 L120 160 L100 120 Z" />
          <line x1="100" y1="120" x2="165" y2="60" />
        </g>
      )}
      {index === 3 && (
        <g {...c}>
          <path d="M120 60 a48 48 0 1 0 22 78 a38 38 0 1 1 -22 -78 Z" />
        </g>
      )}
    </svg>
  );
}
