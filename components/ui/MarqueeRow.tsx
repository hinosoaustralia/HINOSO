"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * A single seamless, infinitely-scrolling row of text.
 * The item set is duplicated so animating x between 0% and -50% loops cleanly.
 */
export default function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
  className,
  style,
  dotClassName = "bg-sage",
}: {
  items: readonly string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  style?: CSSProperties;
  dotClassName?: string;
}) {
  const reduce = useReducedMotion();
  const track = [...items, ...items, ...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap will-change-transform"
        animate={reduce ? undefined : { x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className={className} style={style}>
              {word}
            </span>
            <span className={cn("mx-6 h-2 w-2 shrink-0 rounded-full", dotClassName)} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
