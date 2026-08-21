import {
  AppWindow,
  ArrowDown,
  CreditCard,
  Presentation,
  SearchCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";
import { CostComparison } from "../components/CostComparison";
import { ExperiencePeriod } from "../components/ExperiencePeriod";
import { LakeItJourney } from "../components/LakeItJourney";
import { Metric } from "../components/Metric";

const collaborationItems = [
  ["refinements", UsersRound],
  ["training", Presentation],
  ["demonstrations", AppWindow],
  ["clients", UsersRound],
] as const;

const responsibilityProgress = ["delivery", "decisions", "operation"] as const;

const futbuynowBlocks = [
  ["product", AppWindow],
  ["payments", CreditCard],
  ["ai", Sparkles],
] as const;

export async function ExperienceSection() {
  const t = await getTranslations("experience");

  return (
    <section id="experiencia" className="section-rule contour-background">
      <Container>
        <ExperiencePeriod
          id="lakeit"
          label={t("lakeit.label")}
          company={t("lakeit.company")}
          role={t("lakeit.role")}
          period={t("lakeit.period")}
          description={t("lakeit.description")}
          href={siteConfig.lakeit}
          priority
        >
          <LakeItJourney />

          <Reveal className="bg-surface-soft relative mt-12 overflow-hidden border border-white/15 p-7 sm:p-9 lg:mt-16 lg:p-10">
            <div
              aria-hidden="true"
              className="from-mineral-deep/55 absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l to-transparent"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
              <div>
                <p className="mono-label text-mineral">
                  {t("lakeit.responsibility.label")}
                </p>
                <h4 className="font-display mt-5 max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                  {t.rich("lakeit.responsibility.title", {
                    highlight: (chunks) => (
                      <span className="text-mineral">{chunks}</span>
                    ),
                  })}
                </h4>
              </div>
              <div className="border-t border-white/15 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <p className="mono-label text-muted">
                  {t("lakeit.responsibility.progress.label")}
                </p>
                <ol className="relative mt-6 space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-white/15">
                  {responsibilityProgress.map((item, index) => (
                    <li
                      key={item}
                      className="relative grid grid-cols-[12px_1fr] items-center gap-4"
                    >
                      <span
                        className={
                          index === responsibilityProgress.length - 1
                            ? "bg-mineral size-[11px]"
                            : "border-muted bg-surface-soft size-[11px] border"
                        }
                      />
                      <span className="font-heading font-semibold">
                        {t(`lakeit.responsibility.progress.${item}`)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="relative mt-7 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
              {collaborationItems.map(([item, Icon]) => (
                <div
                  key={item}
                  className="text-secondary flex items-center gap-3 text-sm"
                >
                  <Icon aria-hidden="true" className="text-mineral size-4" />
                  {t(`lakeit.responsibility.collaboration.${item}`)}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 lg:mt-16">
            <CostComparison />
          </div>
        </ExperiencePeriod>
      </Container>

      <div className="route-background bg-surface relative border-y border-white/15">
        <Container className="relative">
          <ExperiencePeriod
            id="futbuynow"
            label={t("futbuynow.label")}
            company={t("futbuynow.company")}
            period={t("futbuynow.period")}
            description={t("futbuynow.description")}
            href={siteConfig.futbuynow}
          >
            <Reveal className="border-mineral/25 bg-mineral-deep overflow-hidden border">
              <div className="grid gap-9 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-12">
                <div>
                  <p className="mono-label text-mineral-bright">
                    {t("futbuynow.metrics.growthLabel")}
                  </p>
                  <h4 className="font-heading mt-4 max-w-3xl text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                    {t.rich("futbuynow.metrics.growthTitle", {
                      highlight: (chunks) => (
                        <span className="text-mineral-bright">{chunks}</span>
                      ),
                    })}
                  </h4>
                  <p className="text-secondary mt-4 max-w-2xl leading-7">
                    {t("futbuynow.metrics.growthDetail")}
                  </p>
                </div>

                <div className="border-t border-white/15 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  <div>
                    <strong className="font-display block text-3xl whitespace-nowrap sm:text-4xl">
                      {t("futbuynow.metrics.growthFrom")}
                    </strong>
                    <p className="text-secondary mt-2 font-mono text-[0.68rem]">
                      {t("futbuynow.metrics.growthFromPeriod")}
                    </p>
                  </div>
                  <ArrowDown
                    aria-hidden="true"
                    className="text-mineral-bright my-5 size-6"
                  />
                  <div>
                    <strong className="font-display text-mineral-bright block text-3xl whitespace-nowrap sm:text-4xl">
                      {t("futbuynow.metrics.growthTo")}
                    </strong>
                    <p className="text-secondary mt-2 font-mono text-[0.68rem]">
                      {t("futbuynow.metrics.growthToPeriod")}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-secondary border-t border-white/15 px-7 py-4 text-xs leading-5 sm:px-10 lg:px-12">
                {t("futbuynow.metrics.growthNote")}
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <p className="mono-label text-mineral">
                {t("futbuynow.metrics.label")}
              </p>
              <div className="mt-6 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-background p-6 sm:col-span-2 lg:p-9">
                  <p className="font-display text-mineral text-6xl font-semibold tracking-[-0.05em] sm:text-8xl">
                    {t("futbuynow.metrics.monthlyValue")}
                  </p>
                  <p className="font-heading mt-4 text-xl font-semibold">
                    {t("futbuynow.metrics.monthlyLabel")}
                  </p>
                  <p className="text-muted mt-2 font-mono text-[0.68rem]">
                    {t("futbuynow.metrics.monthlyPeriod")}
                  </p>
                </div>
                <Metric
                  className="bg-background p-6"
                  value={t("futbuynow.metrics.yearsValue")}
                  label={t("futbuynow.metrics.yearsLabel")}
                  period={t("futbuynow.metrics.yearsPeriod")}
                />
                <Metric
                  className="bg-background p-6"
                  value={t("futbuynow.metrics.ordersValue")}
                  label={t("futbuynow.metrics.ordersLabel")}
                  period={t("futbuynow.metrics.ordersPeriod")}
                />
                <Metric
                  className="bg-background p-6"
                  value={t("futbuynow.metrics.coinsValue")}
                  label={t("futbuynow.metrics.coinsLabel")}
                  period={t("futbuynow.metrics.coinsPeriod")}
                />
                <div className="bg-background p-6 sm:col-span-2 lg:col-span-3 lg:p-9">
                  <div className="flex items-center gap-3">
                    <SearchCheck
                      aria-hidden="true"
                      className="text-mineral size-5 shrink-0"
                    />
                    <p className="mono-label text-mineral">
                      {t("futbuynow.blocks.seo.label")}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-0">
                    <div>
                      <p className="font-display text-mineral text-5xl font-semibold sm:text-6xl">
                        {t("futbuynow.metrics.seoValue")}
                      </p>
                      <p className="font-heading mt-3 text-xl font-semibold">
                        {t("futbuynow.metrics.seoLabel")}
                      </p>
                      <p className="text-muted mt-2 font-mono text-[0.68rem]">
                        {t("futbuynow.metrics.seoPeriod")}
                      </p>
                    </div>
                    <div className="border-t border-white/15 pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                      <p className="font-display text-mineral text-5xl font-semibold sm:text-6xl">
                        {t("futbuynow.metrics.seoTotalValue")}
                      </p>
                      <p className="font-heading mt-3 text-xl font-semibold">
                        {t("futbuynow.metrics.seoTotalLabel")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-px bg-white/10 lg:grid-cols-3">
              {futbuynowBlocks.map(([block, Icon]) => (
                <Reveal key={block} className="bg-surface p-7 sm:p-9">
                  <Icon aria-hidden="true" className="text-mineral size-6" />
                  <p className="mono-label text-mineral mt-7">
                    {t(`futbuynow.blocks.${block}.label`)}
                  </p>
                  <h4 className="font-heading mt-4 text-2xl font-semibold">
                    {t(`futbuynow.blocks.${block}.title`)}
                  </h4>
                  <p className="text-secondary mt-4 leading-7">
                    {t(`futbuynow.blocks.${block}.detail`)}
                  </p>
                  <p className="text-muted mt-6 font-mono text-[0.68rem] leading-5 uppercase">
                    {t(`futbuynow.blocks.${block}.tools`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </ExperiencePeriod>
        </Container>
      </div>
    </section>
  );
}
