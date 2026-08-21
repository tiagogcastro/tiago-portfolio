"use client";

import { BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function CostComparison() {
  const t = useTranslations("experience.lakeit.cost");

  return (
    <div className="border-mineral/25 bg-mineral-deep relative overflow-hidden border p-6 sm:p-9 lg:p-11">
      <div
        aria-hidden="true"
        className="border-mineral/15 absolute -top-40 -right-24 size-96 rounded-full border"
      />
      <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <BarChart3
              aria-hidden="true"
              className="text-mineral-bright size-5"
            />
            <p className="mono-label text-mineral-bright">{t("label")}</p>
          </div>
          <h4 className="font-heading mt-5 max-w-xl text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            {t("title")}
          </h4>
          <p className="text-secondary mt-5 max-w-xl leading-7">
            {t("detail")}
          </p>
          <p className="text-mineral-bright/75 mt-5 text-sm">{t("peak")}</p>
        </div>
        <div className="flex flex-col justify-center gap-7">
          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="mono-label text-secondary">{t("before")}</span>
              <strong className="font-heading text-lg">
                {t("beforeValue")}
              </strong>
            </div>
            <div className="h-5 bg-black/25">
              <motion.div
                className="bg-secondary/60 h-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="mono-label text-secondary">{t("after")}</span>
              <strong className="font-heading text-mineral-bright text-lg">
                {t("afterValue")}
              </strong>
            </div>
            <div className="h-5 bg-black/25">
              <motion.div
                className="bg-mineral h-full w-[39%] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              />
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-5 border-t border-white/15 pt-6">
            <p className="font-display text-mineral-bright text-3xl font-semibold sm:text-4xl">
              {t("savingValue")}
            </p>
            <p className="text-secondary text-sm">{t("savingLabel")}</p>
          </div>
        </div>
      </div>
      <p className="text-secondary relative mt-9 border-t border-white/15 pt-5 font-mono text-[0.68rem] leading-5">
        {t("note")}
      </p>
    </div>
  );
}
