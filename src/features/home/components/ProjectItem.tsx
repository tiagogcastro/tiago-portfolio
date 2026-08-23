import { Globe2, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { projects } from "@/content/projects";

type Project = (typeof projects)[number];

export async function ProjectItem({ project }: { project: Project }) {
  const t = await getTranslations();
  const common = await getTranslations("common");
  const base = project.translationKey;

  return (
    <article className="group hover:border-accent grid gap-6 border-b border-white/15 py-8 transition-colors lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
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
              ? common("source", { name: t(`${base}.name`) })
              : link.type === "npm"
                ? common("npm", { name: t(`${base}.name`) })
                : common("website", { name: t(`${base}.name`) })}
          </ExternalLink>
        ))}
      </div>
    </article>
  );
}
