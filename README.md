# HINOSO — Recovery. Made Simple.

A premium, cinematic product‑reveal landing page for **HINOSO**, a (fictional) wearable
recovery system. The whole page is a single scroll‑driven story: the product is revealed
from darkness to daylight, section by section, guiding visitors toward the waitlist — the
feel of an Apple product launch for a calm, Japanese‑inspired wellness brand.

> Design language: somewhere between Apple, Nothing, WHOOP, Aesop, Muji and Dyson.
> Warm paper, charcoal ink, a single muted‑sage accent. No bright colours. Lots of whitespace.

---

## ✨ Highlights

- **Cinematic hero** — a procedural 3D pod floats in darkness, slowly rotating. As you
  scroll it tilts toward you and the background brightens from obsidian to warm paper.
- **Real 3D** (React Three Fiber) — the pod is modelled as nested precision layers that
  **explode into their six components and reassemble** in the "Introducing" section.
- **Scroll‑scrubbed storyboards** — pinned sections for The Problem, How It Works (5‑step
  continuous animation) and a horizontal lifestyle gallery.
- **Living app UI** — a phone rotates in with an animated heat dial, intensity, modes,
  battery and a pulsing Bluetooth link.
- **Buttery smooth scrolling** — Lenis + GSAP ScrollTrigger, synced to a single RAF loop.
- **Micro‑interactions** — custom cursor (dot + trailing ring + sage glow), magnetic
  buttons, glassmorphism, animated gradients, a branded loading curtain.
- **Waitlist** with a placeholder API route, ready to connect to Supabase / Firebase /
  Mailchimp / ConvertKit.
- **Production‑ready** — TypeScript, responsive, SEO (metadata + JSON‑LD), accessible,
  `prefers-reduced-motion` aware, and code‑split so three.js never blocks first paint.

---

## 🧰 Tech stack

| Concern            | Choice                                             |
| ------------------ | -------------------------------------------------- |
| Framework          | Next.js 14 (App Router) + TypeScript               |
| Styling            | Tailwind CSS (custom design tokens)                |
| Component motion   | Framer Motion                                      |
| Scroll orchestration | GSAP ScrollTrigger + Lenis smooth scroll         |
| 3D                 | React Three Fiber + drei (three.js)                |
| Fonts              | Inter (via `next/font`)                            |

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3001
```

Build & run production:

```bash
npm run build
npm run start    # http://localhost:3001
```

---

## 🗂 Project structure

```
app/
  layout.tsx            # fonts, SEO metadata, persistent chrome (loader, cursor, nav, footer)
  page.tsx              # composes the 10 sections + Product JSON-LD
  globals.css           # design tokens, base styles, glass/grain utilities, reduced-motion
  api/waitlist/route.ts # POST/GET waitlist endpoint (placeholder persistence)

components/
  providers/
    SmoothScrollProvider.tsx   # Lenis + GSAP ScrollTrigger, exposes scrollTo() via context
  layout/
    Navbar.tsx           # transparent → frosted-glass on scroll, mobile menu
    Footer.tsx           # minimal wordmark, tagline, socials
  ui/
    LoadingScreen.tsx    # branded intro curtain
    CursorGlow.tsx       # custom desktop cursor (auto-disabled on touch / reduced motion)
    MagneticButton.tsx   # magnetic CTA; smooth-scrolls in-page anchors
    AnimatedText.tsx     # SplitWords (masked word reveal) + SplitChars
    Reveal.tsx           # fade-up-on-view helpers + stagger variants
  three/
    Pod.tsx              # the layered 3D pod (assemble ↔ explode)
    PodCanvas.tsx        # canvas + procedural studio lighting + offscreen frameloop pause
    PodCanvasLazy.tsx    # client-only dynamic import (ssr:false) with fallback
  sections/
    Hero.tsx  Problem.tsx  Introducing.tsx  HowItWorks.tsx  Movement.tsx
    AppShowcase.tsx  Ecosystem.tsx  Comparison.tsx  Testimonials.tsx  Waitlist.tsx

lib/
  content.ts             # all editable copy & data in one place
  utils.ts               # cn(), clamp(), lerp(), mapRange(), easing
  hooks/useMediaQuery.ts # SSR-safe media queries
```

### The 10 sections

1. **Hero** – pod in darkness, slow rotation, brightening on scroll.
2. **The Problem** – sentences appear one at a time; old‑device silhouettes crossfade.
3. **Introducing HINOSO** – the pod explodes into six layers and reassembles.
4. **How It Works** – one continuous, scroll‑scrubbed five‑step animation.
5. **Designed Around Movement** – pinned horizontal lifestyle gallery.
6. **The App** – phone rotates in with a live, animated UI.
7. **The Ecosystem** – Apple‑style bento grid.
8. **Comparison** – animated columns instead of a table.
9. **Testimonials** – minimal placeholder cards.
10. **Join the Waitlist** – name/email form → success state.

---

## 🎨 Design tokens

Defined in `tailwind.config.ts` and `app/globals.css`:

| Token       | Value       | Use                          |
| ----------- | ----------- | ---------------------------- |
| `bone`      | `#F8F7F3`   | warm off‑white background    |
| `charcoal`  | `#2A2A2A`   | primary text                 |
| `sage`      | `#8D9A88`   | the single accent            |
| `stone`     | `#CFCBC4`   | secondary surfaces / hairlines |
| `obsidian`  | `#0C0C0B`   | the cinematic "darkness"     |

All copy lives in **`lib/content.ts`** — edit there to change wording without touching
components.

---

## 📮 Waitlist integration

Submissions currently persist to `data/waitlist.json` (git‑ignored). The endpoint lives in
**`app/api/waitlist/route.ts`** and already validates name + email and de‑dupes by email.

To go live, replace the body of `persist()` with your provider. The `entry` shape
(`{ name, email, createdAt, source }`) is designed to drop straight in:

```ts
// Supabase
await supabase.from("waitlist").insert(entry);

// Firebase (Firestore)
await addDoc(collection(db, "waitlist"), entry);

// Mailchimp
// POST /lists/{id}/members  { email_address, merge_fields: { FNAME } }

// ConvertKit
// POST /forms/{id}/subscribe  { email, first_name }
```

Keep the validation regardless of provider. Store secrets in `.env.local`.

---

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (skips Lenis, collapses long animations).
- Semantic landmarks, `sr-only` form labels, `aria-live` status, keyboard‑navigable.
- three.js is **code‑split** (`ssr:false` dynamic import) so it never blocks first paint;
  the pod canvas pauses its render loop when scrolled off‑screen.
- Custom cursor and heavy motion auto‑disable on touch / coarse pointers.

---

_© 2026 HINOSO. Recovery. Made Simple. Launching soon._
```
