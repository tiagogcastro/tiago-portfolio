import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

const scope = ["development", "cloud", "data", "seo"] as const;

export async function HeroSection() {
  const t = await getTranslations("hero");
  const common = await getTranslations("common");
  const experience = await getTranslations("experience");

  return (
    <section
      id="top"
      className="hero-field relative min-h-[88svh] pt-[var(--header-height)]"
    >
      <Container className="grid min-h-[calc(88svh-var(--header-height))] gap-8 py-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:order-1">
          <Reveal>
            <h1 className="font-display text-[clamp(3.5rem,12vw,9.5rem)] leading-[0.82] font-semibold tracking-[-0.045em]">
              <span className="block">{t("firstName")}</span>
              <span className="text-mineral-bright block">{t("lastName")}</span>
            </h1>
            <p className="font-heading mt-6 max-w-2xl text-lg leading-7 font-medium sm:text-2xl sm:leading-8">
              {t("positioning")}
            </p>
          </Reveal>

          <Reveal>
            <p className="text-secondary max-w-[62ch] text-base leading-7">
              {t("narrative")}
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {scope.map((item) => (
                <li
                  key={item}
                  className="border-mineral/35 bg-background/80 flex items-center gap-3 border-l-2 px-4 py-3 text-sm leading-6"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 bg-white/30"
                  />
                  {t(`scope.${item}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            <Button href="#experiencia" direction="down">
              {common("viewExperience")}
            </Button>
            <Button href="#contato" variant="outline">
              {common("talkToMe")}
            </Button>
          </div>
        </div>

        <Reveal className="bg-surface-soft border border-white/15 p-5 sm:p-9 lg:order-2">
          <p className="text-accent font-mono text-sm">{t("statusLabel")}</p>
          <div className="mt-5 space-y-5">
            <div>
              <a
                href="#lakeit"
                className="font-heading hover:text-accent text-lg font-semibold underline-offset-4 hover:underline"
              >
                {experience("lakeit.company")}
              </a>
              <p className="text-secondary mt-1.5 text-sm leading-6">
                {t("lakeitRole")} · {t("lakeitPeriod")}
              </p>
              <p className="text-muted mt-1 hidden text-sm leading-5 sm:block">
                {t("lakeitStatus")}
              </p>
            </div>
            <div className="border-t border-white/15 pt-5">
              <a
                href="#futbuynow"
                className="font-heading hover:text-accent text-lg font-semibold underline-offset-4 hover:underline"
              >
                {experience("futbuynow.company")}
              </a>
              <p className="text-secondary mt-1.5 text-sm leading-6">
                {t("futbuynowRole")} · {t("futbuynowPeriod")}
              </p>
              <p className="text-muted mt-1 hidden text-sm leading-5 sm:block">
                {t("futbuynowStatus")}
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 text-sm">
            <div>
              <ExternalLink href={siteConfig.linkedin} icon={LinkedInIcon}>
                {common("linkedin")}
              </ExternalLink>
              <p className="text-muted mt-1 hidden leading-5 sm:block">
                {t("linkedinStatus")}
              </p>
            </div>
            <div>
              <ExternalLink href={siteConfig.github} icon={GitHubIcon}>
                {common("github")}
              </ExternalLink>
              <p className="text-muted mt-1 hidden leading-5 sm:block">
                {t("githubStatus")}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
