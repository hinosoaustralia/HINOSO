"use client";

import { HOW_STEPS } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 4 — How It Works.
 * A calm, minimal numbered stepper (no busy per-step animations). Built around
 * reusable gel pads: peel, click on a pod, choose a therapy, recover.
 */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section relative overflow-hidden bg-bone-200 py-24 md:py-32"
    >
      <div className="container-hinoso px-6">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <SplitWords
            as="h2"
            text="Peel. Click. Recover."
            className="mt-3 text-4xl font-semibold tracking-tightest text-charcoal sm:text-5xl md:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base text-charcoal-muted sm:text-lg text-pretty">
              No sleeves. No straps. No wires. Just reusable gel pads and a pod
              that clicks on — recovery in seconds.
            </p>
          </Reveal>
        </div>

        {/* Minimal 4-step timeline. */}
        <div className="relative mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8">
          {/* hairline connecting the steps on desktop */}
          <div
            className="absolute left-4 right-4 top-[18px] hidden h-px bg-charcoal/12 md:block"
            aria-hidden
          />
          {HOW_STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08}>
              <div className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-xs font-medium tabular-nums text-bone">
                  {step.index}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-charcoal-muted text-pretty">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
