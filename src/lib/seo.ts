import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function localizedPath(locale: string, path: string) {
  return locale === routing.defaultLocale
    ? path
    : `/${locale}${path === "/" ? "" : path}`;
}

export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] =
      locale === routing.defaultLocale
        ? path
        : `/${locale}${path === "/" ? "" : path}`;
  }

  return {
    canonical: localizedPath(locale, path),
    languages: { ...languages, "x-default": path },
  };
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
  const imageAlt = t("imageAlt");
  const imagePath = `/og/${locale}.png`;
  const image = {
    url: imagePath,
    width: 1200,
    height: 630,
    alt: imageAlt,
  };

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: "website" as const,
      url: localizedPath(locale, path),
      siteName: identity("displayName"),
      title,
      description,
      locale: structuredData("openGraphLocale"),
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}
