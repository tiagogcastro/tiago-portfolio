import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/visual/Reveal";

export async function CostComparison() {
  const t = await getTranslations("experience.lakeit.cost");

  return (
    <Reveal className="green-panel border-mineral/45 bg-mineral-deep border p-7 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h4 className="font-heading max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">
            {t("title")}
          </h4>
          <p className="text-secondary mt-5 max-w-xl leading-7">
            {t("detail")}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-7">
          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="text-secondary font-mono text-sm">
                {t("before")}
              </span>
              <strong>{t("beforeValue")}</strong>
            </div>
            <div className="bg-secondary/25 h-4">
              <div className="bg-signal/80 h-full w-full" />
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="text-secondary font-mono text-sm">
                {t("after")}
              </span>
              <strong className="text-accent">{t("afterValue")}</strong>
            </div>
            <div className="bg-secondary/25 h-4">
              <div className="bg-accent h-full w-[39%]" />
            </div>
          </div>
          <div className="border-t border-white/15 pt-6">
            <p className="font-display text-accent text-4xl font-semibold">
              {t("savingValue")}
            </p>
            <p className="text-secondary mt-2">{t("savingLabel")}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
