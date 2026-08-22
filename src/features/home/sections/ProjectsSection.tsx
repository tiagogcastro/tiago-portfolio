import { Globe2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { projects } from "@/content/projects";
import { NexSiftDiagram } from "../components/NexSiftDiagram";
import { ProjectItem } from "../components/ProjectItem";

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const common = await getTranslations("common");
  const featured = projects.find((project) => project.featured)!;
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section
      id="projetos"
      className="section-rule contour-background relative overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <Container className="relative">
        <Reveal className="grid gap-8 lg:grid-cols-[0.4fr_1.6fr] lg:items-end">
          <p className="mono-label text-accent">{t("index")}</p>
          <div>
            <h2 className="font-display max-w-5xl text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">
              {t("title")}
            </h2>
            <p className="text-secondary mt-5 max-w-xl text-base leading-7">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-8 border-t border-white/15 py-8 lg:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-12">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="mono-label text-accent">{t("featured")}</p>
              <p className="text-mineral mt-6 font-mono text-xs uppercase">
                {t("items.nexsift.type")}
              </p>
              <h3 className="font-display mt-3 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                {t("items.nexsift.name")}
              </h3>
              <p className="text-secondary mt-6 max-w-xl text-lg leading-8">
                {t("items.nexsift.description")}
              </p>
              <p className="text-muted mt-7 font-mono text-[0.68rem] leading-5 uppercase">
                {featured.technologies.join(" · ")}
              </p>
            </div>
            <div className="flex gap-5 font-semibold">
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
          <NexSiftDiagram />
        </Reveal>

        <div className="border-t border-white/15">
          {otherProjects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
