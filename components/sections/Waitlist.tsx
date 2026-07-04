"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplitWords } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

/**
 * SECTION 10 — Join the Waitlist.
 * The conversion moment. A simple, accessible name + email form that posts to
 * the placeholder /api/waitlist route with full loading / success / error
 * states.
 */
export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data?.message ?? "You're on the list.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="section relative overflow-hidden bg-bone py-20 md:py-40"
    >
      {/* Soft animated sage aura */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-sage/12 blur-[100px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-hinoso relative z-10 flex flex-col items-center px-6 text-center">
        <span className="eyebrow">Join the waitlist</span>
        <SplitWords
          as="h2"
          text="Be first."
          className="mt-4 justify-center text-6xl font-semibold tracking-tightest text-charcoal sm:text-7xl md:text-8xl"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-base text-charcoal-muted sm:text-lg text-pretty">
            Help shape the future of wearable recovery. Reserve your place and
            be among the first to experience HINOSO.
          </p>
        </Reveal>

        {/* Form / success */}
        <div className="mt-12 w-full max-w-md">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-sage/30 bg-gradient-to-br from-white to-sage-50 p-10 shadow-soft"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-obsidian"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </motion.div>
                <h3 className="mt-5 text-2xl font-semibold text-charcoal">
                  You&rsquo;re on the list.
                </h3>
                <p className="mt-2 text-sm text-charcoal-muted">
                  Thank you, {name.split(" ")[0] || "friend"}. We&rsquo;ll be in
                  touch before launch.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-3"
                noValidate
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="wl-name">
                    Name
                  </label>
                  <input
                    id="wl-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-full border border-charcoal/12 bg-white/70 px-6 py-4 text-sm text-charcoal outline-none backdrop-blur transition-colors placeholder:text-charcoal-muted focus:border-sage focus:ring-2 focus:ring-sage/25"
                  />
                  <label className="sr-only" htmlFor="wl-email">
                    Email
                  </label>
                  <input
                    id="wl-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full border border-charcoal/12 bg-white/70 px-6 py-4 text-sm text-charcoal outline-none backdrop-blur transition-colors placeholder:text-charcoal-muted focus:border-sage focus:ring-2 focus:ring-sage/25"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  data-cursor="hover"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-4 text-sm font-medium text-bone shadow-soft transition-colors hover:bg-black disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
                      Joining&hellip;
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </motion.button>

                {/* Error message */}
                <div aria-live="polite" className="min-h-[20px]">
                  {status === "error" && (
                    <p className="text-sm text-charcoal-muted">{message}</p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-xs uppercase tracking-[0.3em] text-charcoal-muted">
            Launching Soon
          </p>
        </Reveal>
      </div>
    </section>
  );
}
