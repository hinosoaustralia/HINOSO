"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 * Returns false on the server and on first paint, then updates after mount
 * so it never causes hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Convenience: true on screens below the Tailwind `md` breakpoint. */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
