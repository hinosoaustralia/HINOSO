"use client";

import { NAV_LINKS, INSTAGRAM_URL } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/** Minimal footer — big wordmark, tagline, quiet links, Instagram. */
export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="section relative overflow-hidden border-t border-charcoal/10 bg-bone-200 py-20">
      <div className="container-hinoso px-6">
        <div className="flex flex-col gap-14 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-center gap-2.5 text-charcoal">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
              <span className="text-4xl font-semibold tracking-tightest md:text-5xl">
                HINOSO
              </span>
            </div>
            <p className="mt-4 text-lg text-charcoal-muted">
              Recovery. Made Simple.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 md:items-end">
              {/* Quiet nav */}
              <nav className="flex flex-wrap gap-x-7 gap-y-2">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    data-cursor="hover"
                    className="text-sm text-charcoal-muted transition-colors hover:text-charcoal"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HINOSO on Instagram"
                data-cursor="hover"
                className="inline-flex items-center gap-2.5 rounded-full border border-charcoal/12 px-4 py-2.5 text-charcoal-muted transition-all duration-300 hover:border-sage hover:text-charcoal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-charcoal/10 pt-8 text-xs text-charcoal-muted md:flex-row md:items-center md:justify-between">
          <p>© {2026} HINOSO. All rights reserved.</p>
          <p className="tracking-[0.18em]">LAUNCHING SOON</p>
        </div>
      </div>
    </footer>
  );
}
