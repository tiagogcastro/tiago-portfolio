import { Award, BookOpenCheck, GraduationCap, Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

const languages = ["portuguese", "english", "spanish"] as const;

export async function EducationCredentials() {
  const t = await getTranslations("profile.education");

  return (
    <Reveal className="mt-12 border-t border-white/15 pt-10 lg:mt-16 lg:pt-12">
      <div className="grid gap-5 lg:grid-cols-[0.3fr_1.7fr] lg:items-end lg:gap-10">
        <p className="mono-label text-accent">{t("label")}</p>
        <h3 className="font-display max-w-4xl text-2xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
          {t("title")}
        </h3>
      </div>

      <div className="mt-8 grid gap-px bg-white/10 lg:grid-cols-[0.9fr_1.35fr_0.75fr]">
        <article className="border-accent/40 bg-background relative overflow-hidden border p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="bg-accent absolute inset-x-0 top-0 h-1"
          />
          <span
            aria-hidden="true"
            className="font-display text-accent absolute top-2 right-5 text-7xl font-semibold opacity-10"
          >
            01
          </span>
          <div
            aria-hidden="true"
            className="border-accent/25 absolute -right-14 -bottom-14 size-40 rotate-45 border"
          />
          <div className="relative">
            <span className="bg-accent text-background grid size-12 place-items-center">
              <GraduationCap aria-hidden="true" className="size-6" />
            </span>
            <p className="mono-label text-accent mt-7">{t("degree.label")}</p>
            <h4 className="font-heading mt-3 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
              {t("degree.title")}
            </h4>
            <p className="text-accent mt-5 font-semibold">
              {t("degree.institution")}
            </p>
            <p className="text-secondary mt-2 text-sm leading-6">
              {t("degree.detail")}
            </p>
            <p className="text-muted mt-6 border-t border-white/15 pt-5 font-mono text-[0.68rem] font-semibold uppercase">
              {t("degree.period")}
            </p>
            <ExternalLink
              href={siteConfig.credentials.degree}
              className="text-accent mt-5 text-sm font-semibold"
            >
              {t("degree.action")}
            </ExternalLink>
          </div>
        </article>

        <article className="bg-surface-soft p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <Award aria-hidden="true" className="text-mineral size-6" />
            <p className="mono-label text-accent">{t("credentials.label")}</p>
          </div>

          <div className="mt-7 space-y-6">
            <div>
              <h4 className="font-heading text-lg font-semibold">
                {t("credentials.serverless.title")}
              </h4>
              <p className="text-mineral mt-1 text-sm font-semibold">
                {t("credentials.serverless.issuer")}
              </p>
              <p className="text-secondary mt-3 max-w-xl text-sm leading-6">
                {t("credentials.serverless.detail")}
              </p>
              <ExternalLink
                href={siteConfig.credentials.awsServerless}
                className="mt-4 text-sm font-semibold"
              >
                {t("credentials.serverless.action")}
              </ExternalLink>
            </div>

            <div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2">
              <div>
                <BookOpenCheck
                  aria-hidden="true"
                  className="text-mineral mb-3 size-5"
                />
                <h4 className="font-heading font-semibold">
                  {t("credentials.technical.title")}
                </h4>
                <p className="text-secondary mt-2 text-sm">
                  {t("credentials.technical.issuer")}
                </p>
                <p className="text-muted mt-2 font-mono text-[0.68rem] uppercase">
                  {t("credentials.technical.period")}
                </p>
              </div>
              <div>
                <BookOpenCheck
                  aria-hidden="true"
                  className="text-accent mb-3 size-5"
                />
                <h4 className="font-heading font-semibold">
                  {t("credentials.javascript.title")}
                </h4>
                <p className="text-secondary mt-2 text-sm">
                  {t("credentials.javascript.issuer")}
                </p>
                <p className="text-muted mt-2 font-mono text-[0.68rem] uppercase">
                  {t("credentials.javascript.period")}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-background p-7 sm:p-9">
          <Languages aria-hidden="true" className="text-mineral size-6" />
          <p className="mono-label text-accent mt-7">{t("languages.label")}</p>
          <dl className="mt-6 divide-y divide-white/15">
            {languages.map((language) => (
              <div key={language} className="py-4 first:pt-0 last:pb-0">
                <dt className="font-heading font-semibold">
                  {t(`languages.${language}.name`)}
                </dt>
                <dd className="text-secondary mt-1 text-sm leading-6">
                  {t(`languages.${language}.level`)}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </Reveal>
  );
}
