import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type SitemapPath = {
  path: string;
  priority: number;
};

const paths: SitemapPath[] = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.8 },
  { path: "/experience", priority: 0.8 },
];

function languageAlternates(path: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const suffix =
      locale === routing.defaultLocale
        ? path
        : `/${locale}${path === "/" ? "" : path}`;
    languages[locale] = `${siteConfig.domain}${suffix}`;
  }

  languages["x-default"] =
    path === "/" ? siteConfig.domain : `${siteConfig.domain}${path}`;

  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map(({ path, priority }) => ({
    url: path === "/" ? siteConfig.domain : `${siteConfig.domain}${path}`,
    changeFrequency: "monthly",
    priority,
    alternates: languageAlternates(path),
  }));
}
