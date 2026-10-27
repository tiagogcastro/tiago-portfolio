"use client";

import { useEffect, useRef, useState } from "react";

/** Draw from the actual source to each card, including responsive grid layouts. */
export function CosmicConnections() {
  const svg = useRef<SVGSVGElement>(null);
  const [drawing, setDrawing] = useState({
    width: 1,
    height: 1,
    paths: [] as string[],
  });

  useEffect(() => {
    const element = svg.current;
    const container = element?.parentElement;
    if (!element || !container) return;

    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const source = container
        .querySelector(".cosmic-source-symbol")
        ?.getBoundingClientRect();
      if (!source || bounds.width === 0) return;

      const x = source.x + source.width / 2 - bounds.x;
      const y = source.y + source.height / 2 - bounds.y;
      const paths = Array.from(
        container.querySelectorAll(".cosmic-overview li"),
      ).map((card) => {
        const target = card.getBoundingClientRect();
        const tx = target.x + target.width / 2 - bounds.x;
        const ty = target.y + target.height / 2 - bounds.y;
        return `M${x},${y} Q${x},${ty} ${tx},${ty}`;
      });

      setDrawing({ width: bounds.width, height: bounds.height, paths });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container
      .querySelectorAll(".cosmic-overview li")
      .forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svg}
      className="cosmic-source-lines"
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      aria-hidden="true"
    >
      {drawing.paths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}
