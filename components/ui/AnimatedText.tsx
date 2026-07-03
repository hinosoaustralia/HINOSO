"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Masked, word-by-word headline reveal.
 * Each word rises out of an overflow-hidden line — the classic premium
 * "type sliding up behind a mask" effect. Fires on scroll into view.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
  trigger = "view",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** "view" reveals on scroll into frame; "mount" reveals immediately. */
  trigger?: "view" | "mount";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const words = text.split(" ");
  // Mount-triggered reveals are more reliable behind an intro curtain, where
  // an in-view observer can fire while the element is still occluded.
  const anim =
    trigger === "mount"
      ? { animate: { y: "0%" } }
      : {
          whileInView: { y: "0%" },
          viewport: { once, margin: "-8% 0px -8% 0px" },
        };

  return (
    <Tag className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.28em] inline-flex overflow-hidden py-[0.08em] leading-[1.05]"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "115%" }}
            {...anim}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Character-level fade for smaller accent lines (e.g. eyebrows).
 */
export function SplitChars({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * stagger }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
