"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function NexSiftDiagram() {
  const t = useTranslations("projects");

  return (
    <div className="bg-surface-soft relative min-h-72 overflow-hidden border border-white/15 p-5 sm:min-h-96 sm:p-8">
      <svg
        viewBox="0 0 620 330"
        className="h-full min-h-64 w-full"
        role="img"
        aria-labelledby="nexsift-diagram-title"
      >
        <title id="nexsift-diagram-title">{`${t("signalInput")} → ${t("signalFilter")} → ${t("signalOutput")}`}</title>
        <g fill="none" stroke="currentColor" className="text-white/20">
          {[45, 90, 135, 180, 225, 270].map((y) => (
            <path key={y} d={`M30 ${y} C160 ${y}, 205 165, 285 165`} />
          ))}
        </g>
        <motion.path
          d="M285 90 L390 165 L285 240 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M390 165 C455 165, 500 165, 575 165"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-mineral"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />
        {[45, 90, 135, 180, 225, 270].map((y, index) => (
          <circle
            key={y}
            cx="30"
            cy={y}
            r={index === 2 ? 6 : 3}
            className={index === 2 ? "fill-accent" : "fill-white/35"}
          />
        ))}
        <circle cx="575" cy="165" r="9" className="fill-mineral" />
        <text
          x="30"
          y="312"
          className="fill-white/50 font-mono text-[12px] uppercase"
        >
          {t("signalInput")}
        </text>
        <text
          x="305"
          y="270"
          className="fill-accent font-mono text-[12px] uppercase"
        >
          {t("signalFilter")}
        </text>
        <text
          x="490"
          y="200"
          className="fill-mineral font-mono text-[12px] uppercase"
        >
          {t("signalOutput")}
        </text>
      </svg>
    </div>
  );
}
