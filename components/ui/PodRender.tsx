"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/** A prop that may be a static number or a live framer-motion value. */
type Num = number | MotionValue<number>;

/**
 * Renders the HINOSO Pod.
 *
 * If a real product image exists at `src` (default `/pod.png` — drop a
 * transparent PNG/WebP into the /public folder) it is used automatically;
 * otherwise it falls back to a crafted CSS render so the site never breaks.
 *
 * The scroll-driven scale/tilt (see the hero) applies to whichever is shown.
 */
export default function PodRender({
  className,
  floating = true,
  label = true,
  rotateX = 20,
  rotateZ = -7,
  scale = 1,
  src = "/pod.png",
  imgFilter,
  shadow = true,
}: {
  className?: string;
  floating?: boolean;
  label?: boolean;
  rotateX?: Num;
  rotateZ?: Num;
  scale?: Num;
  src?: string;
  /** optional CSS filter on the product image (e.g. to match dark lighting) */
  imgFilter?: string;
  shadow?: boolean;
}) {
  const reduce = useReducedMotion();

  // Preload the image; only swap to it once it actually loads (no broken flash,
  // and no change at all if the file isn't there yet).
  const [imgReady, setImgReady] = useState(false);
  useEffect(() => {
    if (!src || typeof window === "undefined") return;
    const img = new window.Image();
    img.onload = () => setImgReady(true);
    img.onerror = () => setImgReady(false);
    img.src = src;
  }, [src]);

  const floatAnim = reduce || !floating ? undefined : { y: [0, -10, 0] };
  const floatTransition = {
    duration: 7,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  // ---- Real product image ------------------------------------------------
  if (src && imgReady) {
    return (
      <div className={cn("relative", className)}>
        {shadow && (
          <div className="absolute -bottom-[2%] left-1/2 h-[13%] w-[68%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-2xl" />
        )}
        <motion.img
          src={src}
          alt="The HINOSO Pod"
          draggable={false}
          style={{ scale, filter: imgFilter }}
          animate={floatAnim}
          transition={floatTransition}
          className="relative block w-full select-none"
        />
      </div>
    );
  }

  // ---- Fallback: crafted CSS render --------------------------------------
  return (
    <div className={cn("relative", className)}>
      {/* grounded contact shadow */}
      <div className="absolute -bottom-[4%] left-1/2 h-[16%] w-[86%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl" />

      <motion.div
        className="relative aspect-[3/2]"
        style={{ transformPerspective: 1500, rotateX, rotateZ, scale }}
        animate={floatAnim}
        transition={floatTransition}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "36% / 48%",
            background:
              "linear-gradient(156deg, #3a3a40 0%, #1c1d21 30%, #0c0c0f 62%, #050506 100%)",
            boxShadow:
              "inset 0 9px 18px rgba(255,255,255,0.13), inset 0 -16px 30px rgba(0,0,0,0.68), inset 0 0 40px rgba(141,154,136,0.06), 0 5px 0 #202024, 0 10px 0 #17171b, 0 15px 0 #101013, 0 20px 0 #0a0a0c, 0 34px 46px -12px rgba(0,0,0,0.8)",
          }}
        >
          <div
            className="absolute inset-[3%]"
            style={{
              borderRadius: "36% / 48%",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
            }}
          />
          <div
            className="absolute left-[14%] right-[14%] top-[9%] h-[34%]"
            style={{
              borderRadius: "50%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.42), rgba(255,255,255,0) 78%)",
              filter: "blur(6px)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 flex h-[58%] w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
            style={{
              borderRadius: "42% / 32%",
              background: "linear-gradient(156deg, #2a2a2f 0%, #101012 55%, #08080a 100%)",
              boxShadow:
                "inset 0 2px 3px rgba(255,255,255,0.2), inset 0 -8px 14px rgba(0,0,0,0.6), 0 3px 9px rgba(0,0,0,0.55)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-sage"
              style={{ boxShadow: "0 0 8px rgba(141,154,136,0.9)" }}
            />
          </div>
          {label && (
            <span className="absolute bottom-[15%] left-1/2 -translate-x-1/2 select-none text-[0.5rem] font-medium tracking-[0.34em] text-white/18 sm:text-[0.62rem]">
              HINOSO
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
