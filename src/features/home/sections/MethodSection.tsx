import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";
import { TechnicalInterlude } from "@/components/visual/TechnicalInterlude";

const capabilities = ["backend", "frontend", "cloudData", "delivery"] as const;

export async function MethodSection() {
  const t = await getTranslations("profile");

  return (
    <section id="metodo" className="section-rule bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="mono-label text-mineral">{t("methodLabel")}</p>
            <h2 className="font-display mt-5 text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
              {t("title")}
            </h2>
          </div>
          <p className="text-secondary max-w-2xl text-base leading-7">
            {t("methodIntro")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:mt-20">
          {capabilities.map((capability, index) => (
            <Reveal
              key={capability}
              delay={index * 0.06}
              className="bg-surface-soft relative min-h-64 p-7 sm:p-9"
            >
              <span className="text-muted font-mono text-xs">0{index + 1}</span>
              <p className="text-mineral mt-8 font-mono text-xs">
                {t(`capabilities.${capability}.label`)}
              </p>
              <h3 className="font-display mt-3 max-w-md text-2xl leading-tight font-semibold sm:text-3xl">
                {t(`capabilities.${capability}.title`)}
              </h3>
              <p className="text-secondary mt-4 max-w-xl leading-7">
                {t(`capabilities.${capability}.detail`)}
              </p>
              <p className="border-mineral/30 text-muted mt-6 border-t pt-4 font-mono text-xs leading-6">
                {t(`capabilities.${capability}.tools`)}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <TechnicalInterlude
            title={t("processVisual.title")}
            caption={t("processVisual.caption")}
            image="/images/work-loop.svg"
            items={[
              t("processVisual.items.understand"),
              t("processVisual.items.build"),
              t("processVisual.items.improve"),
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
