"use client";

import { useEffect } from "react";

/**
 * Keeps the mobile browser UI (iOS Safari status bar / toolbar, Android chrome)
 * matching the section on screen by updating the <meta name="theme-color"> as
 * you scroll — dark over the hero, warm paper over the rest. This is what stops
 * the mismatched "white bars" at the top and bottom on mobile.
 */
const DARK = "#0C0C0B"; // obsidian hero
const LIGHT = "#F8F7F3"; // bone paper

export default function ThemeColorSync() {
  useEffect(() => {
    // Remove any media-scoped theme-color tags so a single one we control wins.
    document
      .querySelectorAll('meta[name="theme-color"][media]')
      .forEach((m) => m.remove());

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]:not([media])'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }

    let current = "";
    const update = () => {
      // Dark while the hero still covers the top of the viewport.
      const dark = window.scrollY < window.innerHeight * 0.8;
      const color = dark ? DARK : LIGHT;
      if (color !== current) {
        current = color;
        meta!.setAttribute("content", color);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
