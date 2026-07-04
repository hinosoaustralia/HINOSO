"use client";

import { PROBLEM_POINTS } from "@/lib/content";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 2 — The Problem.
 * Calm, normal-flow section (no pinning). Two statements, then the four
 * failings of today's recovery gear as quiet cards with stone-grey silhouettes.
 * A top gradient eases the dark hero into the warm paper.
 */
export default function Problem() {
  return (
    <section className="section relative overflow-hidden bg-bone pb-20 pt-36 md:pb-40 md:pt-60">
      {/* dark → paper transition from the hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-bone"
        aria-hidden
      />

      <div className="container-hinoso relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-lg font-bold uppercase tracking-[0.24em] text-sage-600 sm:text-xl">
            The old way
          </span>
          <SplitWords
            as="h2"
            text="People don't ignore recovery."
            className="mt-6 justify-center text-3xl font-medium leading-[1.1] tracking-tight text-charcoal sm:text-5xl md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-4 text-3xl font-medium leading-[1.1] tracking-tight text-charcoal-muted sm:text-5xl md:text-6xl">
              They ignore recovery <span className="text-sage">products.</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-16 max-w-md text-center text-lg text-charcoal-muted">
            Because today&rsquo;s solutions are&hellip;
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PROBLEM_POINTS.map((point, i) => (
            <Reveal key={point.word} delay={i * 0.1}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-charcoal/8 bg-white/40 p-6 text-center backdrop-blur">
                <div className="flex h-24 items-center justify-center opacity-70">
                  <Silhouette type={i} />
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-charcoal">
                  {point.word}
                </h3>
                <p className="mt-2 text-sm text-charcoal-muted text-pretty">
                  {point.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Abstract stone-grey silhouettes of the hardware HINOSO replaces. */
function Silhouette({ type }: { type: number }) {
  const stroke = "#CFCBC4";
  const common = { fill: "none", stroke, strokeWidth: 2.4 } as const;
  return (
    <svg width="120" height="90" viewBox="0 0 170 130" className="text-stone">
      {type === 0 && (
        <g {...common}>
          <rect x="55" y="20" width="60" height="90" rx="10" />
          <rect x="66" y="30" width="38" height="26" rx="4" />
          <circle cx="74" cy="82" r="8" />
          <circle cx="96" cy="82" r="8" />
        </g>
      )}
      {type === 1 && (
        <g {...common} strokeLinecap="round">
          <path d="M20 40 C 60 10, 80 90, 120 55 S 160 30, 155 80" />
          <circle cx="20" cy="40" r="6" />
          <rect x="146" y="72" width="18" height="16" rx="3" />
        </g>
      )}
      {type === 2 && (
        <g {...common}>
          <rect x="40" y="25" width="90" height="80" rx="12" />
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <circle key={`${r}-${c}`} cx={62 + c * 24} cy={52 + r * 30} r="7" />
            ))
          )}
        </g>
      )}
      {type === 3 && (
        <g {...common}>
          <rect x="42" y="35" width="42" height="60" rx="10" />
          <path d="M92 42 q 30 -14 52 6 l 0 52 q -30 16 -52 -2 z" />
          <path d="M92 42 q 14 22 0 58" strokeDasharray="5 7" />
        </g>
      )}
    </svg>
  );
}
