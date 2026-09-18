import { ArrowDownRight, BriefcaseBusiness, Layers3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/visual/Reveal";

const paths = [
  { key: "team", icon: BriefcaseBusiness, href: "#experiencia" },
  { key: "project", icon: Layers3, href: "#contato" },
] as const;

const metrics = ["savings", "orders", "search"] as const;
const modes = ["clt", "pj", "freelance", "consulting", "recurring"] as const;

export async function WorkSection() {
  const t = await getTranslations("work");
  const modesT = await getTranslations("contactBreak.modes");

  return (
    <section
      id="contratar"
      className="section-rule editorial-grid relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="border-mineral/20 absolute top-[-18rem] right-[-16rem] size-[34rem] rounded-full border"
      />
      <div
        aria-hidden="true"
        className="border-accent/15 absolute top-[-10rem] right-[-8rem] size-[20rem] rounded-full border"
      />

      <Container className="relative">
        <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
          <div>
            <p className="mono-label text-mineral">{t("label")}</p>
            <h2 className="font-display mt-5 max-w-xl text-[clamp(2.75rem,5.5vw,5.75rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              {t("title")}
            </h2>
          </div>
          <div>
            <p className="text-secondary max-w-2xl text-lg leading-8">
              {t("intro")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {modes.map((mode) => (
                <span
                  key={mode}
                  className="border-mineral/30 text-muted bg-background/60 border px-3 py-2 font-mono text-xs"
                >
                  {modesT(mode)}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-2">
          {paths.map(({ key, icon: Icon, href }, index) => (
            <Reveal
              key={key}
              delay={index * 0.08}
              className="bg-surface group relative flex min-h-72 flex-col p-7 sm:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <Icon aria-hidden="true" className="text-accent size-7" />
                <span className="text-muted font-mono text-xs">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-display mt-12 max-w-md text-3xl leading-tight font-semibold sm:text-4xl">
                {t(`paths.${key}.title`)}
              </h3>
              <p className="text-secondary mt-4 max-w-xl leading-7">
                {t(`paths.${key}.text`)}
              </p>
              <Button href={href} variant="text" className="mt-auto pt-8">
                {t(`paths.${key}.action`)}
              </Button>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid border-y border-white/15 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <Reveal
              key={metric}
              delay={0.08 + index * 0.08}
              className="relative border-b border-white/15 py-7 sm:border-r sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <ArrowDownRight
                aria-hidden="true"
                className="text-mineral size-5"
              />
              <strong className="font-display text-accent mt-7 block text-4xl font-semibold sm:text-5xl">
                {t(`metrics.${metric}.value`)}
              </strong>
              <p className="text-secondary mt-3 max-w-[22ch] leading-6">
                {t(`metrics.${metric}.label`)}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
