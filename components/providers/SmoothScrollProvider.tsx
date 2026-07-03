"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Shared scroll controller.
 * Exposes a `scrollTo` so any component (e.g. the navbar) can trigger a
 * buttery Lenis-driven jump to an anchor without fighting native scroll.
 */
type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    opts?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
  raf: (time: number) => void;
  on: (event: string, cb: (...args: unknown[]) => void) => void;
  destroy: () => void;
};

type ScrollContextValue = {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
  ready: boolean;
};

const ScrollContext = createContext<ScrollContextValue>({
  scrollTo: () => {},
  ready: false,
});

/** Consume the smooth-scroll controller from anywhere in the tree. */
export const useSmoothScroll = () => useContext(ScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<LenisLike | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Always register ScrollTrigger so section pins & scrubs work.
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let cleanupTicker: (() => void) | undefined;
    let cancelled = false;

    // Reduced-motion users get instant native scrolling (no Lenis smoothing).
    if (prefersReduced) {
      setReady(true);
      return () => {};
    }

    // Dynamically import Lenis so nothing touches `window` during SSR.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.15,
        // Custom ease-out for a weighty, premium feel.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }) as unknown as LenisLike;

      lenisRef.current = lenis;

      // Keep ScrollTrigger perfectly in step with Lenis.
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker — one shared RAF loop, no jank.
      const update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      cleanupTicker = () => gsap.ticker.remove(update);

      setReady(true);
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanupTicker?.();
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = -72) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    // Fallback for reduced-motion / pre-init: native smooth scroll.
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo, ready }}>
      {children}
    </ScrollContext.Provider>
  );
}
