import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { Reveal } from "@/components/visual/Reveal";
import { formatMonthDate } from "@/lib/utils";
import {
  projects,
} from "@/content/projects";
import { ProjectLinkChips } from "@/components/ui/ProjectLinkChips";

const nexsiftFigures = [
  {
    src: "/projects/nexsift/blog.png",
    altKey: "blogAlt",
    captionKey: "blogCaption",
    width: 1200,
    height: 750,
  },
  {
    src: "/projects/nexsift/topics.png",
    altKey: "topicsAlt",
    captionKey: "topicsCaption",
    width: 1200,
    height: 750,
  },
] as const;

const sideImageIds = new Set(["kaguya", "monkeynauts"]);

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const tr = await getTranslations();
  const locale = await getLocale();
  const common = await getTranslations("common");
  const featured = projects.find((project) => project.id === "nexsift")!;
  const sideImageProjects = projects.filter((project) =>
    sideImageIds.has(project.id),
  );
  const cardProjects = projects.filter(
    (project) => project.id !== "nexsift" && !sideImageIds.has(project.id),
  );

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
                      width={figure.width}
                      height={figure.height}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="text-muted mt-3 max-w-[65ch] font-mono text-sm leading-6">
                    {t(`items.nexsift.${figure.captionKey}`)}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </article>

        <div className="mt-16 border-t border-white/15 lg:mt-24">
          {sideImageProjects.map((project) => {
            const base = project.translationKey;
            const cover = project.cover;
            const datesLabel = project.dates
              ? [
                  project.dates.created
                    ? tr("projects.dates.created", {
                        date: formatMonthDate(locale, project.dates.created),
                      })
                    : null,
                  project.dates.restored
                    ? tr("projects.dates.restored", {
                        date: formatMonthDate(locale, project.dates.restored),
                      })
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")
              : null;

            return (
              <article
                key={project.id}
                className="border-b border-white/15 py-12 lg:py-16"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
                  <div>
                    <p className="text-mineral font-mono text-sm">
                      {tr(`${base}.type`)}
                    </p>
                    <h3 className="font-display mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                      {tr(`${base}.name`)}
                    </h3>
                    <p className="text-secondary mt-4 max-w-2xl leading-7 line-clamp-3 lg:line-clamp-none">
                      {tr(`${base}.description`)}
                    </p>
                    <p className="text-muted mt-5 font-mono text-xs leading-6">
                      {project.technologies.join(" · ")}
                    </p>
                    {datesLabel ? (
                      <p className="mono-label text-muted mt-4">{datesLabel}</p>
                    ) : null}
                    <div className="mt-6">
                      <ProjectLinkChips project={project} />
                    </div>
                  </div>
                  {cover ? (
                    <figure className="bg-background overflow-hidden border border-white/20 p-2 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
                      <Image
                        src={cover.src}
                        alt={tr(`${base}.coverAlt`)}
                        width={cover.width}
                        height={cover.height}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="h-auto w-full"
                      />
                    </figure>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-px grid gap-px border-x border-b border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {cardProjects.map((project) => {
            const base = project.translationKey;
            const datesLabel = project.dates
              ? [
                  project.dates.created
                    ? tr("projects.dates.created", {
                        date: formatMonthDate(locale, project.dates.created),
                      })
                    : null,
                  project.dates.restored
                    ? tr("projects.dates.restored", {
                        date: formatMonthDate(locale, project.dates.restored),
                      })
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")
              : null;

            return (
              <article
                key={project.id}
                className="bg-surface flex flex-col p-5 sm:p-6"
              >
                <p className="mono-label text-mineral">{tr(`${base}.type`)}</p>
                <h3 className="font-heading mt-2 text-lg font-semibold">
                  {tr(`${base}.name`)}
                </h3>
                <p className="text-secondary mt-3 line-clamp-3 text-sm leading-6">
                  {tr(`${base}.description`)}
                </p>
                {datesLabel ? (
                  <p className="mono-label text-muted mt-auto pt-4">
                    {datesLabel}
                  </p>
                ) : null}
                <div className="mt-4">
                  <ProjectLinkChips project={project} />
                </div>
              </article>
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
            <Link
              href="/projects"
              className="font-heading bg-accent text-background hover:bg-accent-hover inline-flex min-h-11 shrink-0 items-center gap-3 self-start px-6 py-3 text-sm font-semibold transition-colors lg:self-center"
            >
              {common("viewProjects")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
