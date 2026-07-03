"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Drifting smoke veil.
 * Layered, heavily-blurred wisps slowly drift and morph so whatever sits behind
 * (the product) is mostly concealed — only glimpsed as gaps open and close.
 * Deterministic configs (no Math.random) keep it hydration-safe.
 */

type Wisp = {
  size: number; // vmax
  left: string;
  top: string;
  dur: number;
  delay: number;
  tone: "dark" | "haze" | "sage";
  drift: [number, number]; // x, y travel in px
  opacity: number;
};

const TONE: Record<Wisp["tone"], string> = {
  // occluders that hide the product
  dark: "radial-gradient(circle at 50% 50%, rgba(10,10,9,0.95) 0%, rgba(10,10,9,0.5) 40%, rgba(10,10,9,0) 72%)",
  // pale smoke texture
  haze: "radial-gradient(circle at 50% 50%, rgba(180,183,176,0.14) 0%, rgba(180,183,176,0.05) 45%, rgba(180,183,176,0) 70%)",
  // faint sage cast so it feels branded, not grey
  sage: "radial-gradient(circle at 50% 50%, rgba(141,154,136,0.16) 0%, rgba(141,154,136,0) 68%)",
};

const WISPS: Wisp[] = [
  { size: 70, left: "18%", top: "30%", dur: 26, delay: 0, tone: "dark", drift: [90, -40], opacity: 0.9 },
  { size: 85, left: "62%", top: "44%", dur: 32, delay: -6, tone: "dark", drift: [-110, 30], opacity: 0.85 },
  { size: 60, left: "45%", top: "62%", dur: 28, delay: -12, tone: "dark", drift: [70, -60], opacity: 0.8 },
  { size: 55, left: "30%", top: "52%", dur: 22, delay: -3, tone: "haze", drift: [120, -50], opacity: 1 },
  { size: 65, left: "68%", top: "34%", dur: 30, delay: -9, tone: "haze", drift: [-90, 40], opacity: 1 },
  { size: 50, left: "50%", top: "40%", dur: 24, delay: -15, tone: "sage", drift: [60, 50], opacity: 1 },
  { size: 75, left: "40%", top: "28%", dur: 34, delay: -18, tone: "dark", drift: [-70, 60], opacity: 0.75 },
];

export default function Smoke({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {WISPS.map((w, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${w.size}vmax`,
            height: `${w.size}vmax`,
            left: w.left,
            top: w.top,
            marginLeft: `-${w.size / 2}vmax`,
            marginTop: `-${w.size / 2}vmax`,
            background: TONE[w.tone],
            opacity: w.opacity * intensity,
            filter: "blur(28px)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, w.drift[0], 0],
                  y: [0, w.drift[1], 0],
                  scale: [1, 1.18, 1],
                  rotate: [0, w.drift[0] > 0 ? 18 : -18, 0],
                }
          }
          transition={{
            duration: w.dur,
            delay: w.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* fine turbulent texture for grit */}
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
