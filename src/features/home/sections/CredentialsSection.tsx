import { BadgeCheck, FileDown, GraduationCap, Languages } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { resumeHref, siteConfig } from "@/config/site";

export async function CredentialsSection() {
  const t = await getTranslations("profile");
  const common = await getTranslations("common");
  const locale = await getLocale();

  return (
    <section id="perfil" className="section-rule py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="mono-label text-mineral">{t("education.label")}</p>
            <h2 className="font-display mt-5 text-[clamp(2.75rem,4.5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
              {t("education.title")}
            </h2>
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
              {(["technical", "javascript"] as const).map((credential) => (
                <div key={credential}>
                  <p className="font-heading font-semibold">
                    {t(`education.credentials.${credential}.title`)}
                  </p>
                  <p className="text-muted mt-2 text-sm">
                    {t(`education.credentials.${credential}.issuer`)} ·{" "}
                    {t(`education.credentials.${credential}.period`)}
                  </p>
                </div>
              ))}
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
    </section>
  );
}
