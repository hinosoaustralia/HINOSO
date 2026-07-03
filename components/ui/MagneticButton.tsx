"use client";

import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

type Variant = "primary" | "ghost" | "light";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number; // how far the button drifts toward the cursor (px)
  ariaLabel?: string;
};

const VARIANTS: Record<Variant, string> = {
  // Matte black — the primary call to action.
  primary:
    "bg-charcoal text-bone hover:bg-black shadow-soft",
  // Hairline ghost on light surfaces.
  ghost:
    "bg-transparent text-charcoal border border-charcoal/15 hover:border-charcoal/35 hover:bg-charcoal/[0.03]",
  // Light pill for dark sections.
  light:
    "bg-bone text-charcoal hover:bg-white shadow-soft",
};

/**
 * A button/anchor that gently drifts toward the pointer on hover, with a
 * parallaxing inner label. Renders an <a> when `href` is set (smooth-scrolling
 * in-page anchors), otherwise a <button>. Magnetism is skipped on touch.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 22,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollTo } = useSmoothScroll();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);

  const spring = { stiffness: 200, damping: 15, mass: 0.3 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const slx = useSpring(labelX, spring);
  const sly = useSpring(labelY, spring);

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    // Skip magnetism on coarse pointers.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const nx = (relX / (rect.width / 2)) * strength;
    const ny = (relY / (rect.height / 2)) * strength;
    x.set(nx);
    y.set(ny);
    labelX.set(nx * 0.35);
    labelY.set(ny * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    labelX.set(0);
    labelY.set(0);
  };

  const handleClick = (e: ReactMouseEvent) => {
    // Smooth-scroll in-page anchors via Lenis.
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollTo(href);
    }
    onClick?.();
  };

  const inner = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      style={{ x: slx, y: sly }}
    >
      {children}
    </motion.span>
  );

  const shared = cn(
    "group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform",
    VARIANTS[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        data-cursor="hover"
        className={shared}
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={handleClick}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      data-cursor="hover"
      className={shared}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
    >
      {inner}
    </motion.button>
  );
}
