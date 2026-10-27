import { Award, GraduationCap, Languages } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

export async function CredentialsSection() {
  const t = await getTranslations("profile");

  const primaryCredentials = [
    {
      key: "cloudPractitioner",
      href: siteConfig.credentials.awsCloudPractitioner,
    },
    {
      key: "aiPractitioner",
      href: siteConfig.credentials.awsAiPractitioner,
    },
  ] as const;

  return (
    <section
      id="perfil"
      className="section-rule relative overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="border-accent/15 absolute -top-40 -left-48 size-[32rem] rounded-full border shadow-[0_0_140px_color-mix(in_srgb,var(--accent)_10%,transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <p className="mono-label text-mineral">{t("education.label")}</p>
          <h2 className="font-display mt-3 max-w-3xl text-[clamp(2.25rem,4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            {t("education.title")}
          </h2>
          <p className="text-secondary mt-5 max-w-3xl text-base leading-7">
            {t("education.intro")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <a
              href={siteConfig.credentials.degree}
              target="_blank"
              rel="noreferrer"
              className="bg-mineral-deep border-mineral/35 hover:border-accent group flex h-full flex-col border p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_80px_color-mix(in_srgb,var(--mineral)_14%,transparent)] sm:p-7"
            >
              <span className="bg-accent text-background grid size-12 place-items-center rounded-full shadow-lg">
                <GraduationCap aria-hidden="true" className="size-6" />
              </span>
              <p className="text-mineral-bright mt-7 text-xs font-bold tracking-[0.12em] uppercase">
                {t("education.degree.label")}
              </p>
              <h3 className="font-heading group-hover:text-accent mt-2 text-xl leading-tight font-semibold transition-colors sm:text-2xl">
                {t("education.degree.title")}
              </h3>
              <p className="text-secondary mt-3 text-sm leading-6">
                {t("education.degree.institution")}
              </p>
              <p className="text-secondary mt-4 text-sm leading-6">
                {t("education.degree.detail")}
              </p>
              <p className="text-accent mt-auto pt-5 text-xs font-bold tracking-[0.08em] uppercase">
                {t("education.degree.period")}
              </p>
            </a>
          </Reveal>

          {primaryCredentials.map(({ key, href }, index) => (
            <Reveal key={key} delay={(index + 1) * 0.06}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-surface-soft border-accent/40 hover:border-accent group relative flex h-full flex-col overflow-hidden border p-6 shadow-[0_18px_60px_color-mix(in_srgb,var(--accent)_8%,transparent)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_90px_color-mix(in_srgb,var(--accent)_16%,transparent)] sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="border-accent/20 absolute -top-20 -right-16 size-44 rounded-full border"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="bg-paper grid h-12 w-20 place-items-center rounded-sm p-2 shadow-lg">
                    <Image
                      src="/brand/aws.svg"
                      alt=""
                      width={64}
                      height={38}
                      className="h-auto w-12"
                    />
                  </span>
                  <Award aria-hidden="true" className="text-accent size-7" />
                </div>
                <h3 className="font-heading group-hover:text-accent relative mt-7 text-xl leading-tight font-semibold transition-colors sm:text-2xl">
                  {t(`education.credentials.${key}.title`)}
                </h3>
                <p className="text-secondary mt-4 text-sm leading-6">
                  {t(`education.credentials.${key}.detail`)}
                </p>
                <p className="text-accent mt-auto pt-5 text-xs font-bold tracking-[0.08em] uppercase">
                  {t(`education.credentials.${key}.period`)}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Reveal>
            <a
              href={siteConfig.credentials.awsServerless}
              target="_blank"
              rel="noreferrer"
              className="bg-background/60 hover:border-mineral group flex h-full gap-4 border border-white/15 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
            >
              <span className="bg-paper grid h-10 w-14 shrink-0 place-items-center rounded-sm p-2">
                <Image
                  src="/brand/aws.svg"
                  alt=""
                  width={42}
                  height={25}
                  className="h-auto w-9"
                />
              </span>
              <div>
                <h3 className="font-heading group-hover:text-mineral-bright font-semibold transition-colors">
                  {t("education.credentials.serverless.title")}
                </h3>
                <p className="text-muted mt-2 text-xs leading-5">
                  {t("education.credentials.serverless.period")}
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={siteConfig.credentials.udemyJavaScript}
              target="_blank"
              rel="noreferrer"
              className="bg-background/60 hover:border-accent group flex h-full gap-4 border border-white/15 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
            >
              <span className="bg-paper grid size-10 shrink-0 place-items-center rounded-sm p-2">
                <Image
                  src="/brand/udemy.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </span>
              <div>
                <h3 className="font-heading group-hover:text-accent font-semibold transition-colors">
                  {t("education.credentials.javascript.title")}
                </h3>
                <p className="text-muted mt-2 text-xs leading-5">
                  {t("education.credentials.javascript.issuer")} ·{" "}
                  {t("education.credentials.javascript.period")}
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal
            delay={0.12}
            className="bg-background/60 flex h-full gap-4 border border-white/15 p-5"
          >
            <span className="bg-paper grid h-10 w-14 shrink-0 place-items-center rounded-sm p-2">
              <Image
                src="/brand/aws.svg"
                alt=""
                width={42}
                height={25}
                className="h-auto w-9"
              />
            </span>
            <div>
              <h3 className="font-heading font-semibold">
                {t("education.credentials.technical.title")}
              </h3>
              <p className="text-muted mt-2 text-xs leading-5">
                {t("education.credentials.technical.issuer")} ·{" "}
                {t("education.credentials.technical.period")}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="bg-surface-soft mt-4 grid gap-6 border border-white/15 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-3">
            <Languages aria-hidden="true" className="text-accent size-6" />
            <p className="font-heading font-semibold">
              {t("education.languages.label")}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {(["portuguese", "english", "spanish"] as const).map((language) => (
              <div key={language} className="border-mineral/35 border-l-2 pl-4">
                <p className="font-heading font-semibold">
                  {t(`education.languages.${language}.name`)}
                </p>
                <p className="text-secondary mt-1 text-sm leading-5">
                  {t(`education.languages.${language}.level`)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
