import { Globe2, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { projects } from "@/content/projects";

type Project = (typeof projects)[number];

export async function ProjectItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const t = await getTranslations();
  const common = await getTranslations("common");
  const base = project.translationKey;

  return (
    <article className="group hover:border-accent grid gap-5 border-b border-white/15 py-7 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-8 lg:py-9">
      <span className="text-muted font-mono text-xs">0{index + 1}</span>
      <div>
        <p className="mono-label text-mineral">{t(`${base}.type`)}</p>
        <h3 className="font-heading mt-3 text-2xl font-semibold sm:text-3xl">
          {t(`${base}.name`)}
        </h3>
        <p className="text-secondary mt-3 max-w-2xl leading-7">
          {t(`${base}.description`)}
        </p>
        <p className="text-muted mt-5 font-mono text-[0.68rem] uppercase">
          {project.technologies.join(" · ")}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm sm:justify-end">
        {project.links.map((link) => (
          <ExternalLink
            key={link.href}
            href={link.href}
            icon={
              link.type === "github"
                ? GitHubIcon
                : link.type === "npm"
                  ? Package
                  : Globe2
            }
          >
            {link.type === "github"
              ? common("source")
              : link.type === "npm"
                ? common("npm")
                : common("website")}
          </ExternalLink>
        ))}
      </div>
    </article>
  );
}
