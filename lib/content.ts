/**
 * Centralised, editable copy & data for the HINOSO experience.
 * Keeping content here keeps section components lean and easy to tweak.
 */

export const NAV_LINKS = [
  { label: "Product", href: "#introducing" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Waitlist", href: "#waitlist" },
] as const;

/** Section 2 — the problem with today's recovery hardware. */
export const PROBLEM_POINTS = [
  {
    word: "Bulky",
    caption: "Boxy TENS units that never leave a drawer.",
  },
  {
    word: "Wired",
    caption: "Tangles of leads and single-use pads.",
  },
  {
    word: "Complicated",
    caption: "Dials, presets and manuals nobody reads.",
  },
  {
    word: "Inconsistent",
    caption: "So they get used once, then forgotten.",
  },
] as const;

/** Section 3 — the three therapies in one pod (no teardown, just what it does). */
export const MODALITIES = [
  { name: "Wireless heat", desc: "Soothing, even warmth — no cables, no wall plug." },
  { name: "EMS", desc: "Muscle stimulation to activate and recover faster." },
  { name: "TENS", desc: "Gentle nerve stimulation that eases everyday aches." },
] as const;

/** Section 4 — how it works, built around reusable gel pads (not sleeves). */
export const HOW_STEPS = [
  {
    index: "01",
    title: "Peel a gel pad",
    body: "Peel a reusable, skin-safe gel pad and place it wherever you need relief. No straps, no mess.",
    visual: "pad",
  },
  {
    index: "02",
    title: "Click on a pod",
    body: "Snap a HINOSO pod onto the pad. It locks on magnetically and powers up instantly.",
    visual: "snap",
  },
  {
    index: "03",
    title: "Choose your therapy",
    body: "Open the app and dial in wireless heat, EMS or TENS — then set the intensity that feels right.",
    visual: "heat",
  },
  {
    index: "04",
    title: "Simply recover",
    body: "Move, work, travel or rest. HINOSO fades into the background and does its job.",
    visual: "relax",
  },
] as const;

/** Section 5 — lifestyle glimpses (no faces, product only ever half-seen). */
export const MOVEMENT_SCENES = [
  { title: "Gym", note: "Between sets, on the go." },
  { title: "Office", note: "Recovery you can wear to work." },
  { title: "Travel", note: "TSA-friendly. Cable-free." },
  { title: "Rest", note: "Wind down. Warm up. Repeat." },
] as const;

/** Section 6 — the ecosystem grid. */
export const ECOSYSTEM = [
  {
    title: "Pods",
    body: "The core. Wireless heat, EMS & TENS in one wearable pod.",
    span: "md:col-span-2",
  },
  {
    title: "Gel pads",
    body: "Reusable, skin-safe adhesive pads for every muscle group.",
    span: "",
  },
  {
    title: "Carry case",
    body: "Keeps your four pods together, ready for anywhere.",
    span: "md:col-span-3",
  },
] as const;

/** Section 8 — comparison. */
export const COMPARISON = {
  traditional: {
    label: "Traditional TENS",
    points: [
      { text: "Wires & leads", ok: false },
      { text: "Single-use sticky pads", ok: false },
      { text: "Difficult setup", ok: false },
      { text: "No heat", ok: false },
      { text: "Disposable batteries", ok: false },
    ],
  },
  hinoso: {
    label: "HINOSO",
    points: [
      { text: "Fully wireless", ok: true },
      { text: "Wireless heat", ok: true },
      { text: "Reusable gel pads", ok: true },
      { text: "Three therapies in one", ok: true },
      { text: "Rechargeable", ok: true },
    ],
  },
} as const;

/* ------------------------------------------------------------------ *
 *  👇  PASTE YOUR INSTAGRAM LINK HERE
 * ------------------------------------------------------------------ */
export const INSTAGRAM_URL = "https://instagram.com/hinoso";
