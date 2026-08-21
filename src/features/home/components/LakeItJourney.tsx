import { BrainCircuit, CloudCog, DatabaseZap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/visual/Reveal";

const blocks = [
  ["data", DatabaseZap],
  ["infra", CloudCog],
  ["ai", BrainCircuit],
] as const;

export async function LakeItJourney() {
  const t = await getTranslations("experience.lakeit.blocks");

  return (
    <div className="grid gap-px bg-white/10 lg:grid-cols-3">
      {blocks.map(([block, Icon], index) => (
        <Reveal key={block} className="bg-background p-7 sm:p-9 lg:p-10">
          <div className="flex items-center justify-between">
            <span className="border-mineral/40 bg-mineral-deep text-mineral-bright grid size-11 place-items-center border">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="font-display text-3xl text-white/15">
              0{index + 1}
            </span>
          </div>
          <p className="mono-label text-accent mt-8">{t(`${block}.label`)}</p>
          <h4 className="font-heading mt-4 text-xl leading-tight font-semibold text-balance sm:text-2xl">
            {t(`${block}.title`)}
          </h4>
          <p className="text-secondary mt-4 text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7">
            {t(`${block}.detail`)}
          </p>
          {block === "infra" ? (
            <div className="text-mineral mt-6 grid gap-2 font-semibold">
              <p>{t("infra.metricModules")}</p>
              <p>{t("infra.metricEnvironments")}</p>
            </div>
          ) : null}
          {block === "data" ? (
            <p className="text-mineral mt-6 font-semibold">
              {t("data.evidence")}
            </p>
          ) : null}
          <p className="text-muted mt-7 font-mono text-[0.68rem] leading-5 uppercase">
            {t(`${block}.stack`)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
