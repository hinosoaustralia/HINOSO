"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import Pod from "./Pod";

type NumberLike = number | MotionValue<number>;

/**
 * Canvas host for the pod.
 * Builds a soft studio environment procedurally from lightformers (no external
 * HDR asset, so it works fully offline) and pauses the render loop whenever the
 * canvas scrolls out of view to keep the page light on the GPU.
 */
export default function PodCanvas({
  explodeTarget = 0,
  tilt = 0,
  className,
}: {
  explodeTarget?: NumberLike;
  tilt?: NumberLike;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Only run the render loop while the canvas is on screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.15, 5], fov: 34 }}
      >
        {/* Low ambient + crisp rim so the piano-black form reads by its highlights. */}
        <ambientLight intensity={0.28} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff8ee" />
        <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#9CAE95" />
        <spotLight position={[0, 6, 3]} angle={0.5} penumbra={1} intensity={1.4} color="#ffffff" />

        <Suspense fallback={null}>
          <Pod explodeTarget={explodeTarget} tilt={tilt} />

          {/* Procedural studio for glossy-black reflections — bright soft strips
              against a dark room, the classic piano-black beauty-light setup. */}
          <Environment resolution={256} frames={1}>
            <color attach="background" args={["#050505"]} />
            <Lightformer
              form="rect"
              intensity={5}
              position={[0, 4, 3]}
              scale={[10, 5, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={2.5}
              position={[-6, 1, -1]}
              scale={[3, 8, 1]}
              color="#aebfa6"
            />
            <Lightformer
              form="rect"
              intensity={3}
              position={[6, 2, 1]}
              scale={[3, 8, 1]}
              color="#fff2df"
            />
            <Lightformer
              form="ring"
              intensity={2}
              position={[2, -3, 4]}
              scale={[3, 3, 1]}
              color="#ffffff"
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
