import Image from "next/image";
import { CloudCog, Radar, SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { ProjectLinkChips } from "@/components/ui/ProjectLinkChips";
import { TechnologyChips } from "@/components/ui/TechnologyChips";
import { Reveal } from "@/components/visual/Reveal";
import { projects } from "@/content/projects";

const selectedIds = ["kaguya", "pagarme-simplified-psp"] as const;

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const tr = await getTranslations();
  const featured = projects.find((project) => project.id === "nexsift")!;
  const selected = selectedIds.map((id) =>
    projects.find((project) => project.id === id)!,
  );
  const galleryLabels = {
    open: tr("common.gallery.open"),
    close: tr("common.gallery.close"),
    previous: tr("common.gallery.previous"),
    next: tr("common.gallery.next"),
    counter: tr.raw("common.gallery.counter"),
  };
  const nexsiftImages = [
    { key: "home", width: 1200, height: 800 },
    { key: "blog", width: 1200, height: 800 },
    { key: "topics", width: 1200, height: 800 },
    { key: "mobile", width: 390, height: 844 },
  ] as const;
  const proofPoints = [
    { key: "problem", icon: SearchX },
    { key: "solution", icon: Radar },
    { key: "results", icon: CloudCog },
  ] as const;

  return (
    <section
      id="projetos"
      className="section-rule bg-surface relative overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="border-accent/15 absolute top-24 -left-64 size-[36rem] rounded-full border shadow-[0_0_120px_color-mix(in_srgb,var(--accent)_8%,transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <p className="mono-label text-mineral">{t("homeLabel")}</p>
          <h2 className="font-display mt-3 max-w-3xl text-[clamp(2.25rem,4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            {t("homeTitle")}
          </h2>
          <p className="text-secondary mt-5 line-clamp-3 max-w-3xl text-base leading-7 sm:line-clamp-none">
            {t("homeIntro")}
          </p>
        </Reveal>

        <article className="mt-10 border-t border-white/15 pt-8 lg:mt-14 lg:pt-10">
          <Reveal>
            <p className="text-mineral font-mono text-sm">
              {t("items.nexsift.type")}
            </p>
            <h3 className="font-display mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              {t("items.nexsift.name")}
            </h3>
            <p className="text-secondary mt-5 line-clamp-2 max-w-3xl text-base leading-7 sm:line-clamp-none">
              {t("items.nexsift.description")}
            </p>
            <TechnologyChips
              technologies={featured.technologies}
              className="mt-5"
            />
            <div className="mt-6">
              <ProjectLinkChips project={featured} />
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <ImageGallery
              images={nexsiftImages.map((image) => ({
                src: `/projects/nexsift/${image.key}.png`,
                alt: t(`items.nexsift.${image.key}Alt`),
                caption: t(`items.nexsift.${image.key}Caption`),
                width: image.width,
                height: image.height,
              }))}
              labels={galleryLabels}
              priority
              className="mx-auto max-w-5xl"
            />
          </Reveal>

          <Reveal className="mt-8 grid gap-px bg-white/15 md:grid-cols-3">
            {proofPoints.map(({ key, icon: Icon }) => (
              <div key={key} className="bg-surface-soft p-5 sm:p-6">
                <Icon aria-hidden="true" className="text-accent size-5" />
                <p className="text-mineral mt-4 text-xs font-bold tracking-[0.1em] uppercase">
                  {t(`details.${key}`)}
                </p>
                <p className="text-secondary mt-3 line-clamp-2 text-sm leading-6 md:line-clamp-none">
                  {t(`items.nexsift.homeProofs.${key}`)}
                </p>
              </div>
            ))}
          </Reveal>
        </article>

        <div className="mt-12 grid min-w-0 gap-px border border-white/15 bg-white/15 lg:mt-16 lg:grid-cols-2">
          {selected.map((project, index) => {
            const base = project.translationKey;
            const cover = project.cover!;

            return (
              <Reveal
                key={project.id}
                delay={index * 0.08}
                className="bg-surface hover:border-accent/60 group/card relative flex min-w-0 flex-col border border-transparent p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_color-mix(in_srgb,var(--accent)_10%,transparent)] sm:p-8"
              >
                <figure className="bg-background overflow-hidden border border-white/15 p-2">
                  <Image
                    src={cover.src}
                    alt={tr(`${base}.coverAlt`)}
                    width={cover.width}
                    height={cover.height}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-48 w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.015] sm:h-56"
                  />
                </figure>
                <p className="text-mineral mt-7 font-mono text-xs">
                  {tr(`${base}.type`)}
                </p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {tr(`${base}.name`)}
                </h3>
                <p className="text-secondary mt-4 line-clamp-2 leading-7 sm:line-clamp-4">
                  {tr(`${base}.description`)}
                </p>
                <TechnologyChips
                  technologies={project.technologies.slice(0, 6)}
                  className="mt-5"
                />
                <div className="mt-auto pt-6">
                  <ProjectLinkChips project={project} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
