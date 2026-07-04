"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Transparent-over-hero navbar that frosts into glass once the user scrolls
 * onto the light content. Text colour flips from bone (over the dark hero) to
 * charcoal (over paper). Includes a full-screen mobile menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    // Wait a tick so the menu-close scroll-unlock doesn't cancel the jump.
    requestAnimationFrame(() => scrollTo(href));
  };

  const darkText = scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "glass border-b border-charcoal/5"
            : "bg-transparent border-b border-transparent"
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <nav className="container-hinoso flex h-full items-center justify-between px-6">
          {/* Wordmark */}
          <button
            onClick={() => scrollTo("#top", 0)}
            data-cursor="hover"
            className={cn(
              "flex items-center gap-2 text-lg font-bold tracking-tight transition-colors duration-500",
              darkText ? "text-charcoal" : "text-bone"
            )}
            aria-label="HINOSO — back to top"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-sage" />
            HINOSO
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                data-cursor="hover"
                className={cn(
                  "group relative text-sm tracking-wide transition-colors duration-500",
                  darkText
                    ? "text-charcoal/70 hover:text-charcoal"
                    : "text-bone/70 hover:text-bone"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-sage transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton
              href="#waitlist"
              variant={darkText ? "primary" : "light"}
              className="px-5 py-2.5 text-[13px]"
              strength={14}
            >
              Join Waitlist
            </MagneticButton>
          </div>

          {/* Mobile: compact Join button + hamburger */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={() => scrollTo("#waitlist")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-500",
                darkText ? "bg-charcoal text-bone" : "bg-bone text-charcoal"
              )}
            >
              Join
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-50 flex h-10 w-8 items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                className={cn(
                  "h-px w-full origin-center transition-all duration-300",
                  darkText ? "bg-charcoal" : "bg-bone",
                  menuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition-all duration-300",
                  darkText ? "bg-charcoal" : "bg-bone",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-px w-full origin-center transition-all duration-300",
                  darkText ? "bg-charcoal" : "bg-bone",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bone px-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => go(link.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-charcoal/10 py-5 text-left text-3xl font-medium tracking-tight text-charcoal"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <MagneticButton href="#waitlist" onClick={() => setMenuOpen(false)} className="w-full">
                Join Waitlist
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
