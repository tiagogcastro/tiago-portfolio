import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ProjectLinkChips } from "@/components/ui/ProjectLinkChips";
import type { projects } from "@/content/projects";
import { formatProjectDates } from "@/lib/projectDates";

type Project = (typeof projects)[number];

type ProjectItemProps = {
  project: Project;
  showCover?: boolean;
};

export async function ProjectItem({
  project,
  showCover = false,
}: ProjectItemProps) {
  const t = await getTranslations();
  const base = project.translationKey;
  const cover = project.cover;
  const datesLabel = await formatProjectDates(project);

  return (
    <article className="group hover:border-accent border-b border-white/15 py-8 transition-colors">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
        <div>
          <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
            {t(`${base}.name`)}
          </h3>
          <p className="text-mineral mt-2 font-mono text-sm">
            {t(`${base}.type`)}
          </p>
          <p className="text-secondary mt-3 max-w-2xl leading-7">
            {t(`${base}.description`)}
          </p>
          <p className="text-muted mt-5 font-mono text-sm leading-6">
            {project.technologies.join(" · ")}
          </p>
        </div>
        <div className="flex flex-col gap-5 sm:items-end">
          <ProjectLinkChips project={project} />
          {datesLabel ? (
            <p className="mono-label text-muted sm:text-right">{datesLabel}</p>
          ) : null}
        </div>
      </div>

      {showCover && cover ? (
        <figure className="bg-background mt-8 max-w-3xl overflow-hidden border border-white/20 p-2">
          <Image
            src={cover.src}
            alt={t(`${base}.coverAlt`)}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 1024px) 100vw, 700px"
            className="h-auto w-full"
          />
        </figure>
      ) : null}
    </article>
  );
}
