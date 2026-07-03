"use client";

import dynamic from "next/dynamic";

/**
 * Client-only loader for the 3D pod.
 * three.js touches `window`, so the canvas must never render on the server.
 * While the chunk loads we show a soft, on-brand placeholder disc.
 */
function PodFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-40 w-40 animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-bone/80 to-stone/40 blur-md" />
        <div className="absolute inset-6 rounded-full bg-sage/10" />
      </div>
    </div>
  );
}

const PodCanvas = dynamic(() => import("./PodCanvas"), {
  ssr: false,
  loading: () => <PodFallback />,
});

export default PodCanvas;
