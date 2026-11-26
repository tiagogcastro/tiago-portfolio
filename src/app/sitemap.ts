import type { MetadataRoute } from "next";
import { headers } from "next/headers";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host")?.split(":")[0];
  if (host === "contato.tiagogcastro.com.br") {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${siteConfig.cardDomain}${locale === routing.defaultLocale ? "" : `/${locale}`}`,
      ]),
    );
    return routing.locales.map((locale) => ({
      url: `${siteConfig.cardDomain}${locale === routing.defaultLocale ? "" : `/${locale}`}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: { ...languages, "x-default": siteConfig.cardDomain },
      },
    }));
  }
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
