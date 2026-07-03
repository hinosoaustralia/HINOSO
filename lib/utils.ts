/**
 * Tiny, dependency-free class-name joiner.
 * Accepts strings, falsy values and objects ({ "class": condition }).
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const item of inputs) {
    if (!item) continue;
    if (typeof item === "string" || typeof item === "number") {
      out.push(String(item));
    } else if (typeof item === "object") {
      for (const [key, val] of Object.entries(item)) {
        if (val) out.push(key);
      }
    }
  }
  return out.join(" ");
}

/** Clamp a number to the [min, max] range. */
export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(Math.max(v, min), max);

/** Linear interpolation between a and b by t (0..1). */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Re-map a value from one range into another. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

/** Cubic-bezier-ish "ease out expo" used to echo the CSS easing in JS. */
export const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
