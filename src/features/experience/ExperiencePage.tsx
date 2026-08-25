import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";
import { TechnicalInterlude } from "@/components/visual/TechnicalInterlude";
import { FutbuynowCase, LakeItCase } from "./components/Cases";

export async function ExperiencePage() {
  const t = await getTranslations("experience");

  return (
    <main id="conteudo" className="pt-[var(--header-height)]">
      <section className="data-field">
        <Container className="py-16 sm:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <h1 className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.035em]">
              {t("title")}
            </h1>
            <p className="text-secondary max-w-2xl text-lg leading-8">
              {t("intro")}
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="section-rule">
        <Container>
          <LakeItCase />

          <TechnicalInterlude
            title={t("interlude.title")}
            caption={t("interlude.caption")}
            image="/images/impact-route.svg"
            items={[
              t("interlude.items.understand"),
              t("interlude.items.change"),
              t("interlude.items.measure"),
            ]}
          />

          <FutbuynowCase />
        </Container>
      </div>
    </main>
  );
}
