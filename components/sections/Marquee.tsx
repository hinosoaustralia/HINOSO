"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A dark, full-bleed scrolling marquee — two rows drifting in opposite
 * directions to inject motion and energy between the calmer card sections.
 */
const ROW_A = ["Wireless heat", "EMS", "TENS", "Recovery, reimagined"];
const ROW_B = ["No wires", "No gel mess", "No fuss", "Just recovery"];

function Row({
  items,
  direction,
  outlined,
}: {
  items: string[];
  direction: "left" | "right";
  outlined?: boolean;
}) {
  const reduce = useReducedMotion();
  // Duplicate the set so the loop is seamless at -50% / 0%.
  const track = [...items, ...items, ...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap"
        animate={reduce ? undefined : { x: [from, to] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {track.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-6 text-4xl font-semibold tracking-tightest sm:text-6xl md:text-7xl"
              style={
                outlined
                  ? {
                      WebkitTextStroke: "1px rgba(248,247,243,0.35)",
                      color: "transparent",
                    }
                  : { color: "#F8F7F3" }
              }
            >
              {word}
            </span>
            <span className="h-2 w-2 rounded-full bg-sage" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-obsidian py-12 md:py-16"
    >
      <div className="flex flex-col gap-3 md:gap-5">
        <Row items={ROW_A} direction="left" />
        <Row items={ROW_B} direction="right" outlined />
      </div>
    </section>
  );
}
