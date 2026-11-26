import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CardPage } from "@/features/card/CardPage";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "card.metadata" });
  const identity = await getTranslations({ locale, namespace: "identity" });
  const structuredData = await getTranslations({
    locale,
    namespace: "structuredData",
  });
  const suffix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((value) => [
      value,
      `${siteConfig.cardDomain}${value === routing.defaultLocale ? "" : `/${value}`}`,
    ]),
  );
  const image = `${siteConfig.cardDomain}/og/card-${locale}.png`;
  return {
    metadataBase: new URL(siteConfig.cardDomain),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteConfig.cardDomain}${suffix}`,
      languages: { ...languages, "x-default": siteConfig.cardDomain },
    },
    openGraph: {
      type: "profile",
      url: `${siteConfig.cardDomain}${suffix}`,
      siteName: identity("displayName"),
      title: t("title"),
      description: t("description"),
      locale: structuredData("openGraphLocale"),
      images: [{ url: image, width: 1200, height: 630, alt: t("imageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [image],
    },
  };
}

export default async function ContactCard({ params }: Props) {
  const { locale } = await params;
  const identity = await getTranslations({ locale, namespace: "identity" });
  const t = await getTranslations({ locale, namespace: "card" });
  const url = `${siteConfig.cardDomain}${locale === routing.defaultLocale ? "" : `/${locale}`}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    inLanguage: locale,
    name: t("metadata.title"),
    description: t("metadata.description"),
    mainEntity: {
      "@type": "Person",
      "@id": `${siteConfig.domain}/#person`,
      name: identity("fullName"),
      alternateName: "Tiago Castro",
      jobTitle: t("role"),
      url: siteConfig.domain,
      image: `${siteConfig.cardDomain}/images/tiago-profile.webp`,
      sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.tiktok],
      email: siteConfig.email,
    },
  };
  return (
    <>
      <CardPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
