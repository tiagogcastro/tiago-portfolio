import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] =
      locale === routing.defaultLocale
        ? path
        : `/${locale}${path === "/" ? "" : path}`;
  }

  return { canonical: path, languages: { ...languages, "x-default": path } };
}

export async function buildPageMetadata(
  locale: string,
  path: string,
  namespace: string,
) {
  const t = await getTranslations({ locale, namespace });
  const identity = await getTranslations({
    locale,
    namespace: "identity",
  });
  const structuredData = await getTranslations({
    locale,
    namespace: "structuredData",
  });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: buildAlternates(path),
    openGraph: {
      type: "website" as const,
      url: path,
      siteName: identity("displayName"),
      title,
      description,
      locale: structuredData("openGraphLocale"),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
