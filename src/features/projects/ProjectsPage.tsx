import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";
import { projects } from "@/content/projects";
import { ProjectItem } from "@/features/home/components/ProjectItem";

export async function ProjectsPage() {
  const t = await getTranslations("projects");

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

      <section className="section-rule bg-surface pb-20 sm:pb-28">
        <Container>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              showCover={Boolean(project.cover)}
            />
          ))}
        </Container>
      </section>
    </main>
  );
}
