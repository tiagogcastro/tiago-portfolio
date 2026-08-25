import { ArrowUpRight, Globe2, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon } from "@/components/brand/SocialIcons";
import type { Project } from "@/content/projects";

export async function ProjectLinkChips({ project }: { project: Project }) {
  const common = await getTranslations("common");

  return (
    <div className="flex flex-wrap gap-2">
      {project.links.map((link) => {
        const LinkIcon =
          link.type === "github"
            ? GitHubIcon
            : link.type === "npm"
              ? Package
              : Globe2;

        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="mono-label text-secondary hover:border-accent hover:text-accent inline-flex cursor-pointer items-center gap-1.5 border border-white/20 px-3 py-1.5 transition-colors"
          >
            <LinkIcon aria-hidden="true" className="size-3.5" />
            {link.type === "github"
              ? common("github")
              : link.type === "npm"
                ? common("npmShort")
                : common("siteShort")}
            <ArrowUpRight
              aria-hidden="true"
              className="size-3 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        );
      })}
    </div>
  );
}
