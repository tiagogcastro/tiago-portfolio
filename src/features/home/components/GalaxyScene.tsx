"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

export function GalaxyScene({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element || reduced) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void import("./createUniverse")
      .then(({ createUniverse }) => {
        if (!cancelled) cleanup = createUniverse(element, progress);
      })
      .catch((error: unknown) => {
        /* The CSS orb remains visible if WebGL cannot load. */
        console.warn("Unable to initialize the cosmic scene", error);
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [progress, reduced]);
  return <div ref={host} className="cosmic-canvas" aria-hidden="true" />;
}
