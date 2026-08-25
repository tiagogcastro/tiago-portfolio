import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Tooltip } from "@/components/ui/Tooltip";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";
import { CaseFigure } from "./CaseFigure";
import { CostComparison } from "./CostComparison";

const lakeItBlocks = ["data", "infra", "ai"] as const;

export async function LakeItCase() {
  const t = await getTranslations("experience");

  return (
    <article id="lakeit" className="py-16 lg:py-24">
      <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-muted font-mono text-sm">{t("lakeit.period")}</p>
          <p className="text-mineral mt-3 font-mono text-sm">
            {t("lakeit.role")}
          </p>
        </div>
        <div>
          <h2 className="font-display text-[clamp(2.25rem,4.25vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            <ExternalLink
              href={siteConfig.lakeit}
              className="no-underline hover:no-underline"
            >
              {t("lakeit.company")}
            </ExternalLink>
          </h2>
          <p className="text-secondary mt-5 max-w-[68ch] text-lg leading-7">
            {t("lakeit.description")}
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid border-y border-white/15 lg:grid-cols-3">
        {lakeItBlocks.map((block) => {
          const evidence = t(`lakeit.blocks.${block}.evidence`);

          return (
            <Reveal
              key={block}
              className="flex flex-col border-b border-white/15 py-7 lg:border-r lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <h3 className="font-heading text-xl font-semibold">
                {t(`lakeit.blocks.${block}.title`)}
              </h3>
              <p className="text-secondary mt-4 leading-7">
                {t(`lakeit.blocks.${block}.detail`)}
              </p>
              <Tooltip
                label={t("technologyHelpLabel", {
                  area: t(`lakeit.blocks.${block}.title`),
                })}
                content={t(`lakeit.blocks.${block}.technologyDetail`)}
                className="mt-4"
              >
                {t("technologyHelp")}
              </Tooltip>
              {evidence ? (
                <p className="text-accent mt-auto max-w-[18rem] border-t border-white/15 pt-6 font-semibold">
                  {evidence}
                </p>
              ) : null}
            </Reveal>
          );
        })}
      </div>

      <CaseFigure
        src="/images/data-routes.svg"
        title={t("lakeit.figures.pipeline.title")}
        caption={t("lakeit.figures.pipeline.caption")}
      />

      <div className="mt-12">
        <CostComparison />
      </div>
    </article>
  );
}

const futbuynowBlocks = ["product", "payments", "ai"] as const;

export async function FutbuynowCase() {
  const t = await getTranslations("experience");

  return (
    <article id="futbuynow" className="border-t border-white/15 py-16 lg:py-24">
      <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-muted font-mono text-sm">
            {t("futbuynow.period")}
          </p>
          <p className="text-mineral mt-3 font-mono text-sm">
            {t("futbuynow.label")}
          </p>
        </div>
        <div>
          <h2 className="font-display text-[clamp(2.25rem,4.25vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            <ExternalLink
              href={siteConfig.futbuynow}
              className="no-underline hover:no-underline"
            >
              {t("futbuynow.company")}
            </ExternalLink>
          </h2>
          <p className="text-secondary mt-5 max-w-[68ch] text-lg leading-7">
            {t("futbuynow.description")}
          </p>
        </div>
      </Reveal>

      <Reveal className="border-mineral/25 mt-12 grid gap-px border bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["monthlyValue", "monthlyLabel", "monthlyPeriod"],
          ["ordersValue", "ordersLabel", "ordersPeriod"],
          ["seoValue", "seoLabel", "seoPeriod"],
          ["seoTotalValue", "seoTotalLabel", null],
        ].map(([value, label, period]) => (
          <div key={value} className="bg-surface p-6 lg:p-8">
            <strong className="font-display text-accent block text-4xl font-semibold">
              {t(`futbuynow.metrics.${value}`)}
            </strong>
            <p className="mt-3 font-semibold">
              {t(`futbuynow.metrics.${label}`)}
            </p>
            {period ? (
              <p className="text-muted mt-2 font-mono text-sm">
                {t(`futbuynow.metrics.${period}`)}
              </p>
            ) : null}
          </div>
        ))}
      </Reveal>

      <Reveal className="green-panel border-mineral/40 bg-mineral-deep mt-10 border p-6 sm:p-8">
        <p className="text-mineral-bright font-mono text-sm">
          {t("futbuynow.metrics.growthLabel")}
        </p>
        <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
          <div>
            <p className="text-secondary font-mono text-sm">
              {t("futbuynow.metrics.growthFromPeriod")}
            </p>
            <strong className="font-display mt-2 block text-4xl font-semibold">
              {t("futbuynow.metrics.growthFrom")}
            </strong>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="text-signal size-7 rotate-90 sm:rotate-0"
          />
          <div>
            <p className="text-secondary font-mono text-sm">
              {t("futbuynow.metrics.growthToPeriod")}
            </p>
            <strong className="font-display text-accent mt-2 block text-4xl font-semibold">
              {t("futbuynow.metrics.growthTo")}
            </strong>
          </div>
        </div>
      </Reveal>

      <CaseFigure
        src="/images/work-loop.svg"
        title={t("futbuynow.figures.loop.title")}
        caption={t("futbuynow.figures.loop.caption")}
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {futbuynowBlocks.map((block) => (
          <Reveal
            key={block}
            className="border-mineral/25 bg-surface-soft border-t-2 p-6"
          >
            <h3 className="font-heading text-xl font-semibold">
              {t(`futbuynow.blocks.${block}.title`)}
            </h3>
            <p className="text-secondary mt-3 leading-7">
              {t(`futbuynow.blocks.${block}.detail`)}
            </p>
            <Tooltip
              label={t("technologyHelpLabel", {
                area: t(`futbuynow.blocks.${block}.title`),
              })}
              content={t(`futbuynow.blocks.${block}.technologyDetail`)}
              className="mt-5"
            >
              {t("technologyHelp")}
            </Tooltip>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
