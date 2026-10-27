import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

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
  return routing.locales.map((locale) => {
    const suffix = localizedPath(locale, "/");

    return {
      url: suffix === "/" ? siteConfig.domain : `${siteConfig.domain}${suffix}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: languageAlternates("/"),
    };
  });
}
