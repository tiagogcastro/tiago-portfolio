import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { buttonStyles } from "@/components/ui/Button";
import { ProjectLinkChips } from "@/components/ui/ProjectLinkChips";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { Reveal } from "@/components/visual/Reveal";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";

const selectedIds = ["kaguya", "pagarme-simplified-psp"] as const;

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const tr = await getTranslations();
  const featured = projects.find((project) => project.id === "nexsift")!;
  const selected = selectedIds.map((id) =>
    projects.find((project) => project.id === id)!,
  );

  return (
    <section id="projetos" className="section-rule bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="mono-label text-mineral">{t("homeLabel")}</p>
            <h2 className="font-display mt-5 max-w-2xl text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
              {t("homeTitle")}
            </h2>
          </div>
          <p className="text-secondary max-w-2xl text-base leading-7">
            {t("homeIntro")}
          </p>
        </Reveal>

        <article className="mt-14 border-t border-white/15 pt-10 lg:mt-20 lg:pt-14">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-mineral font-mono text-sm">
                {t("items.nexsift.type")}
              </p>
              <h3 className="font-display mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
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
              <div className="mt-6">
                <ProjectLinkChips project={featured} />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <figure>
              <div className="bg-background overflow-hidden border border-white/20 p-2 sm:p-3">
                <Image
                  src="/projects/nexsift/home.png"
                  alt={t("items.nexsift.homeAlt")}
                  width={1200}
                  height={750}
                  sizes="(max-width: 1536px) 100vw, 1440px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="text-muted mt-3 font-mono text-sm leading-6">
                {t("items.nexsift.homeCaption")}
              </figcaption>
            </figure>
          </Reveal>
        </article>

        <div className="mt-16 grid gap-px border border-white/15 bg-white/15 lg:mt-24 lg:grid-cols-2">
          {selected.map((project, index) => {
            const base = project.translationKey;
            const cover = project.cover!;

            return (
              <Reveal
                key={project.id}
                delay={index * 0.08}
                className="bg-surface flex flex-col p-6 sm:p-8"
              >
                <figure className="bg-background overflow-hidden border border-white/15 p-2">
                  <Image
                    src={cover.src}
                    alt={tr(`${base}.coverAlt`)}
                    width={cover.width}
                    height={cover.height}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-[8/5] h-auto w-full object-cover object-top"
                  />
                </figure>
                <p className="text-mineral mt-7 font-mono text-xs">
                  {tr(`${base}.type`)}
                </p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {tr(`${base}.name`)}
                </h3>
                <p className="text-secondary mt-4 line-clamp-4 leading-7">
                  {tr(`${base}.description`)}
                </p>
                <p className="text-muted mt-5 font-mono text-xs leading-6">
                  {project.technologies.slice(0, 6).join(" · ")}
                </p>
                <div className="mt-auto pt-6">
                  <ProjectLinkChips project={project} />
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="relative mt-16 overflow-hidden border border-white/15">
          <BackgroundGrid />
          <div className="bg-background/60 relative flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <p className="mono-label text-mineral">{t("cta.label")}</p>
              <p className="font-display mt-3 max-w-xl text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
                {t("cta.title")}
              </p>
              <p className="text-secondary mt-3 max-w-xl text-base leading-7">
                {t("cta.text")}
              </p>
            </div>
            <Link href="/projects" className={buttonStyles("primary")}>
              {t("cta.action")}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
