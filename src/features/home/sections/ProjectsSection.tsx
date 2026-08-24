import Image from "next/image";
import { Globe2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { projects } from "@/content/projects";
import { ProjectItem } from "../components/ProjectItem";

const nexsiftFigures = [
  {
    src: "/projects/nexsift/ai.png",
    altKey: "aiAlt",
    captionKey: "aiCaption",
  },
  {
    src: "/projects/nexsift/topics.png",
    altKey: "topicsAlt",
    captionKey: "topicsCaption",
  },
] as const;

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const common = await getTranslations("common");
  const featured = projects.find((project) => project.featured)!;
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projetos" className="section-rule bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <h2 className="font-display max-w-2xl text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.035em]">
            {t("title")}
          </h2>
          <p className="text-secondary max-w-2xl text-base leading-7">
            {t("intro")}
          </p>
        </Reveal>

        <article className="mt-14 border-t border-white/15 pt-10 lg:mt-20 lg:pt-14">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-mineral font-mono text-sm">
                {t("items.nexsift.type")}
              </p>
              <h3 className="font-display mt-4 text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">
                {t("items.nexsift.name")}
              </h3>
            </div>
            <div>
              <p className="text-secondary max-w-2xl text-base leading-7">
                {t("items.nexsift.description")}
              </p>
              <p className="text-muted mt-5 max-w-2xl font-mono text-sm leading-6">
                {featured.technologies.join(" · ")}
              </p>
              <div className="mt-6 flex flex-wrap gap-5 font-semibold">
                {featured.links.map((link) => (
                  <ExternalLink
                    key={link.href}
                    href={link.href}
                    icon={link.type === "github" ? GitHubIcon : Globe2}
                  >
                    {link.type === "github"
                      ? common("source", { name: t("items.nexsift.name") })
                      : common("website", { name: t("items.nexsift.name") })}
                  </ExternalLink>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <figure>
              <div className="bg-background overflow-hidden border border-white/20 p-2 sm:p-3">
                <Image
                  src="/projects/nexsift/home.png"
                  alt={t("items.nexsift.homeAlt")}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 1536px) 100vw, 1440px"
                  className="h-auto w-full"
                  priority
                />
              </div>
              <figcaption className="text-muted mt-3 font-mono text-sm leading-6">
                {t("items.nexsift.homeCaption")}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="mt-8 grid gap-8 border-y border-white/15 py-8 lg:grid-cols-[0.38fr_1.62fr] lg:items-center lg:gap-16">
            <figure className="mx-auto max-w-[390px] lg:mx-0">
              <div className="bg-background overflow-hidden border border-white/20 p-2">
                <Image
                  src="/projects/nexsift/mobile.png"
                  alt={t("items.nexsift.mobileAlt")}
                  width={390}
                  height={844}
                  sizes="(max-width: 1024px) 90vw, 390px"
                  className="h-auto w-full"
                />
              </div>
            </figure>
            <div>
              <p className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                {t("items.nexsift.mobileTitle")}
              </p>
              <p className="text-secondary mt-5 max-w-xl text-base leading-7">
                {t("items.nexsift.mobileCaption")}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {nexsiftFigures.map((figure) => (
              <Reveal key={figure.src}>
                <figure>
                  <div className="bg-background overflow-hidden border border-white/20 p-2">
                    <Image
                      src={figure.src}
                      alt={t(`items.nexsift.${figure.altKey}`)}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="text-muted mt-3 font-mono text-sm leading-6">
                    {t(`items.nexsift.${figure.captionKey}`)}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </article>

        <div className="mt-16 border-t border-white/15 lg:mt-24">
          {otherProjects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
