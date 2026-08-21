import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

const scope = ["development", "seo", "cloud", "data"] as const;

export async function HeroSection() {
  const t = await getTranslations("hero");
  const common = await getTranslations("common");
  const experience = await getTranslations("experience");

  return (
    <section
      id="top"
      className="contour-background relative min-h-[100svh] overflow-hidden pt-[var(--header-height)]"
    >
      <BackgroundGrid />
      <div
        aria-hidden="true"
        className="border-mineral/20 absolute top-[18%] right-[-9rem] size-[30rem] rounded-full border sm:size-[42rem]"
      />
      <div
        aria-hidden="true"
        className="border-accent/15 absolute top-[24%] right-[-4rem] size-[20rem] rounded-full border sm:size-[31rem]"
      />

      <Container className="relative grid min-h-[calc(100svh-var(--header-height))] gap-8 py-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.55fr)] lg:items-center lg:gap-12 lg:py-20 xl:py-24">
        <Reveal className="flex min-w-0 flex-col gap-8 lg:gap-10">
          <div>
            <h1 className="font-display text-[clamp(3.75rem,12.2vw,11.5rem)] leading-[0.72] font-semibold tracking-[-0.08em] uppercase">
              <span className="block">{t("firstName")}</span>
              <span className="text-secondary block">{t("lastName")}</span>
            </h1>
            <div className="border-accent mt-8 max-w-3xl border-l-2 pl-5 lg:mt-10">
              <p className="text-secondary max-w-2xl text-lg leading-8 text-balance sm:text-xl">
                {t("narrative")}
              </p>
              <div className="mt-5 flex gap-5 text-sm font-semibold">
                <ExternalLink href={siteConfig.linkedin} icon={LinkedInIcon}>
                  {common("linkedin")}
                </ExternalLink>
                <ExternalLink href={siteConfig.github} icon={GitHubIcon}>
                  {common("github")}
                </ExternalLink>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="#experiencia" direction="down">
              {common("viewExperience")}
            </Button>
            <Button href="#contato" variant="outline">
              {common("talkToMe")}
            </Button>
          </div>
        </Reveal>

        <Reveal
          className="flex flex-col gap-8 border-t border-white/15 pt-7 lg:gap-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
          transition={{ delay: 0.12, duration: 0.55 }}
        >
          <div>
            <p className="mono-label text-muted mb-5">{t("statusLabel")}</p>
            <div className="relative space-y-1 before:absolute before:top-3 before:bottom-3 before:left-[5px] before:w-px before:bg-white/20">
              <div className="relative grid grid-cols-[12px_1fr] gap-4 pb-7">
                <span className="bg-mineral mt-1.5 size-[11px]" />
                <div>
                  <a
                    href="#lakeit"
                    className="font-heading hover:text-mineral inline-flex text-lg font-semibold underline-offset-4 transition-colors hover:underline"
                  >
                    {experience("lakeit.company")}
                  </a>
                  <p className="text-secondary mt-1 text-sm">
                    {t("lakeitRole")}
                  </p>
                  <p className="text-secondary mt-3 max-w-xs text-sm leading-6">
                    {t("lakeitContext")}
                  </p>
                  <p className="text-muted mt-2 font-mono text-xs">
                    {t("lakeitPeriod")}
                  </p>
                </div>
              </div>
              <div className="relative grid grid-cols-[12px_1fr] gap-4">
                <span className="border-mineral bg-background mt-1.5 size-[11px] border-2" />
                <div>
                  <a
                    href="#futbuynow"
                    className="font-heading hover:text-mineral inline-flex text-lg font-semibold underline-offset-4 transition-colors hover:underline"
                  >
                    {experience("futbuynow.company")}
                  </a>
                  <p className="text-secondary mt-1 text-sm">
                    {t("futbuynowRole")}
                  </p>
                  <p className="text-secondary mt-3 max-w-xs text-sm leading-6">
                    {t("futbuynowContext")}
                  </p>
                  <p className="text-muted mt-2 font-mono text-xs">
                    {t("futbuynowPeriod")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-6">
            <p className="mono-label text-muted">{t("scopeLabel")}</p>
            <p className="text-secondary mt-3 max-w-xs text-sm leading-6">
              {t("scopeText")}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {scope.map((item) => (
                <li
                  key={item}
                  className="font-heading flex items-center gap-2 text-sm font-semibold"
                >
                  <span aria-hidden="true" className="bg-mineral size-1.5" />
                  {t(`scope.${item}`)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
