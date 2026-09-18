import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { HomePage } from "@/features/home/HomePage";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/", "metadata");
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const metadata = await getTranslations({ locale, namespace: "metadata" });
  const identity = await getTranslations({ locale, namespace: "identity" });
  const structuredData = await getTranslations({
    locale,
    namespace: "structuredData",
  });
  const education = await getTranslations({
    locale,
    namespace: "profile.education",
  });
  const localizedPath = locale === routing.defaultLocale ? "" : `/${locale}`;
  const pageUrl = `${siteConfig.domain}${localizedPath}`;
  const profileId = `${pageUrl}#profile`;
  const personId = `${siteConfig.domain}/#person`;
  const websiteId = `${siteConfig.domain}/#website`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": profileId,
        url: pageUrl,
        name: metadata("title"),
        description: metadata("description"),
        inLanguage: structuredData("language"),
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: identity("fullName"),
        alternateName: identity("displayName"),
        url: siteConfig.domain,
        jobTitle: identity("role"),
        description: metadata("description"),
        sameAs: [siteConfig.linkedin, siteConfig.github],
        knowsAbout: structuredData.raw("knowsAbout"),
        knowsLanguage: [
          structuredData("languages.portuguese"),
          structuredData("languages.english"),
          structuredData("languages.spanish"),
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: education("degree.institution"),
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: education("degree.title"),
            credentialCategory: education("degree.detail"),
            dateCreated: "2026-07",
            url: siteConfig.credentials.degree,
            recognizedBy: {
              "@type": "EducationalOrganization",
              name: education("degree.institution"),
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: education("credentials.serverless.title"),
            credentialCategory: "Digital badge",
            url: siteConfig.credentials.awsServerless,
            recognizedBy: {
              "@type": "Organization",
              name: education("credentials.serverless.issuer"),
            },
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: identity("city"),
          addressCountry: identity("countryCode"),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: identity("displayName"),
        url: siteConfig.domain,
        inLanguage: routing.locales,
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
