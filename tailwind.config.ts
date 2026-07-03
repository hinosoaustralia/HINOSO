import type { Config } from "tailwindcss";

/**
 * HINOSO design system.
 * A calm, Japanese-inspired palette: warm off-white paper, charcoal ink,
 * a single muted sage accent, and stone grey supporting tones.
 * No bright colours. Soft light. Generous whitespace.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Bodoni Moda is loaded via next/font and exposed as --font-bodoni.
        sans: [
          "var(--font-bodoni)",
          "Bodoni Moda",
          "Didot",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      // Small text was reading too small in Bodoni — bump the small end of the
      // scale so captions, labels, nav and body copy are more legible.
      fontSize: {
        xs: ["0.8375rem", { lineHeight: "1.2rem" }],
        sm: ["1rem", { lineHeight: "1.5rem" }],
        base: ["1.125rem", { lineHeight: "1.7rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.4rem", { lineHeight: "1.9rem" }],
      },
      colors: {
        // Warm paper background — the canvas of the whole experience.
        bone: {
          DEFAULT: "#F8F7F3",
          50: "#FDFDFB",
          100: "#F8F7F3",
          200: "#F1EFE9",
          300: "#E8E5DD",
        },
        // Primary ink.
        charcoal: {
          DEFAULT: "#2A2A2A",
          soft: "#3A3A3A",
          muted: "#6B6B68",
        },
        // The one accent — muted sage green.
        sage: {
          DEFAULT: "#8D9A88",
          50: "#F2F4F1",
          100: "#E4E8E1",
          200: "#C9D1C4",
          300: "#AEB9A7",
          400: "#9BA894",
          500: "#8D9A88",
          600: "#77836F",
          700: "#5F6959",
          800: "#4A5245",
          900: "#3A4136",
        },
        // Stone grey — secondary surfaces, dividers, hairlines.
        stone: {
          DEFAULT: "#CFCBC4",
          light: "#E0DDD7",
          dark: "#B4AFA6",
        },
        // Near-black obsidian for the cinematic "darkness" of the hero.
        obsidian: {
          DEFAULT: "#0C0C0B",
          900: "#111110",
          800: "#171715",
          700: "#1F1E1C",
        },
      },
      // Very subtle, no harsh shadows — soft ambient depth only.
      boxShadow: {
        soft: "0 20px 60px -30px rgba(42,42,42,0.25)",
        "soft-lg": "0 40px 120px -40px rgba(42,42,42,0.30)",
        hairline: "0 0 0 1px rgba(42,42,42,0.06)",
        "glass": "0 8px 40px -12px rgba(42,42,42,0.18), inset 0 1px 0 0 rgba(255,255,255,0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      backgroundImage: {
        "sage-fade":
          "radial-gradient(60% 60% at 50% 40%, rgba(141,154,136,0.18) 0%, rgba(141,154,136,0) 70%)",
        "paper-grain":
          "linear-gradient(180deg, #FDFDFB 0%, #F8F7F3 40%, #F1EFE9 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
