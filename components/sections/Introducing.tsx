"use client";

import { MODALITIES } from "@/lib/content";
import PodRender from "@/components/ui/PodRender";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 3 — Introducing The HINOSO Pod.
 * Names the product and shows it clearly on a calm light stage, paired with the
 * three therapies it delivers. No teardown.
 */
export default function Introducing() {
  return (
    <section
      id="introducing"
      className="section relative overflow-hidden bg-bone py-24 md:py-32"
    >
      <div className="container-hinoso px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Introducing</span>
          <SplitWords
            as="h2"
            text="The HINOSO Pod."
            className="mt-4 justify-center text-5xl font-semibold tracking-tightest text-charcoal sm:text-6xl md:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base text-charcoal-muted sm:text-lg text-balance">
              Three proven therapies in one wireless pod, controlled from your
              phone. Small enough to forget you&rsquo;re wearing it.
            </p>
          </Reveal>
        </div>

        {/* The product on a calm, lit stage. */}
        <Reveal delay={0.05}>
          <div className="relative mx-auto mt-14 flex max-w-2xl justify-center">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(50% 55% at 50% 55%, rgba(141,154,136,0.14) 0%, transparent 65%)",
              }}
            />
            <PodRender className="w-[min(780px,94vw)]" />
          </div>
        </Reveal>

        {/* The three therapies. */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {MODALITIES.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-charcoal/8 bg-white/50 p-7">
                <span className="text-xs tabular-nums text-charcoal-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-charcoal">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted text-pretty">
                  {m.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
