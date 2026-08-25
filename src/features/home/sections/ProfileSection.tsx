import { BadgeCheck, FileDown, GraduationCap, Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { resumeHref, siteConfig } from "@/config/site";
import { getLocale } from "next-intl/server";
import { TechnicalInterlude } from "@/components/visual/TechnicalInterlude";

const capabilities = ["backend", "frontend", "cloudData", "delivery"] as const;

export async function ProfileSection() {
  const t = await getTranslations("profile");
  const common = await getTranslations("common");
  const locale = await getLocale();

  return (
    <section id="perfil" className="section-rule bg-surface">
      <div className="py-20 sm:py-28">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.035em]">
              {t("title")}
            </h2>
            <p className="text-secondary max-w-2xl text-base leading-7">
              {t("intro")}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:mt-20">
            {capabilities.map((capability) => (
              <Reveal key={capability} className="bg-surface-soft p-7 sm:p-9">
                <h3 className="font-heading text-xl font-semibold">
                  {t(`capabilities.${capability}.title`)}
                </h3>
                <p className="text-secondary mt-5 max-w-xl leading-7">
                  {t(`capabilities.${capability}.detail`)}
                </p>
                <p className="border-mineral/30 text-muted mt-6 border-t pt-4 font-mono text-sm leading-6">
                  {t(`capabilities.${capability}.tools`)}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-surface pb-20 sm:pb-28">
        <Container>
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
        </Container>
      </div>

      <div className="bg-background text-foreground border-t border-white/15 py-20 sm:py-28">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <h3 className="font-display text-[clamp(2.5rem,4.5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.035em]">
                {t("education.title")}
              </h3>
              <p className="text-secondary mt-5 max-w-md text-base leading-7">
                {t("education.intro")}
              </p>
            </div>

            <div className="border-t border-white/15">
              <div className="grid gap-6 border-b border-white/15 py-7 sm:grid-cols-[auto_1fr] sm:items-start">
                <GraduationCap
                  aria-hidden="true"
                  className="text-accent size-7"
                />
                <div>
                  <ExternalLink
                    href={siteConfig.credentials.degree}
                    className="font-heading text-xl font-semibold"
                  >
                    {t("education.degree.title")}
                  </ExternalLink>
                  <p className="text-secondary mt-2 max-w-xl">
                    {t("education.degree.institution")} ·{" "}
                    {t("education.degree.period")}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 border-b border-white/15 py-7 sm:grid-cols-[auto_1fr] sm:items-start">
                <BadgeCheck aria-hidden="true" className="text-accent size-7" />
                <div>
                  <ExternalLink
                    href={siteConfig.credentials.awsServerless}
                    className="font-heading text-xl font-semibold"
                  >
                    {t("education.credentials.serverless.title")}
                  </ExternalLink>
                  <p className="text-secondary mt-2 max-w-2xl">
                    {t("education.credentials.serverless.detail")}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 border-b border-white/15 py-7 sm:grid-cols-2">
                <div>
                  <p className="font-heading font-semibold">
                    {t("education.credentials.technical.title")}
                  </p>
                  <p className="text-muted mt-2 text-sm">
                    {t("education.credentials.technical.issuer")} ·{" "}
                    {t("education.credentials.technical.period")}
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold">
                    {t("education.credentials.javascript.title")}
                  </p>
                  <p className="text-muted mt-2 text-sm">
                    {t("education.credentials.javascript.issuer")} ·{" "}
                    {t("education.credentials.javascript.period")}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 py-7 sm:grid-cols-[auto_1fr] sm:items-start">
                <Languages aria-hidden="true" className="text-accent size-7" />
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
                  {(["portuguese", "english", "spanish"] as const).map(
                    (language) => (
                      <div
                        key={language}
                        className="border-mineral/35 border-l-2 pl-4"
                      >
                        <p className="font-heading font-semibold">
                          {t(`education.languages.${language}.name`)}
                        </p>
                        <p className="text-secondary mt-2 text-sm leading-6">
                          {t(`education.languages.${language}.level`)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
            <p className="text-secondary max-w-md">{t("resumeText")}</p>
            <Button
              href={resumeHref(locale)}
              download
              variant="outline"
              icon={FileDown}
              trailingIcon={false}
            >
              {common("downloadResume")}
            </Button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
