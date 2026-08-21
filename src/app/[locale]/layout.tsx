import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Fraunces,
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NoiseTexture } from "@/components/visual/NoiseTexture";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const identity = await getTranslations({ locale, namespace: "identity" });
  const structuredData = await getTranslations({
    locale,
    namespace: "structuredData",
  });

  return {
    metadataBase: new URL(siteConfig.domain),
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: structuredData("openGraphLocale"),
      url: "/",
      siteName: identity("displayName"),
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const accessibility = await getTranslations("accessibility");
  const metadata = await getTranslations("metadata");
  const identity = await getTranslations("identity");
  const structuredData = await getTranslations("structuredData");
  const education = await getTranslations("profile.education");
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity("fullName"),
    url: siteConfig.domain,
    jobTitle: identity("role"),
    sameAs: [siteConfig.linkedin, siteConfig.github],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education("degree.institution"),
    },
    knowsLanguage: [
      structuredData("languages.portuguese"),
      structuredData("languages.english"),
      structuredData("languages.spanish"),
    ],
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
      {
        "@type": "EducationalOccupationalCredential",
        name: education("credentials.technical.title"),
        credentialCategory: "Course completion",
        dateCreated: "2025-07",
        recognizedBy: {
          "@type": "Organization",
          name: education("credentials.technical.issuer"),
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: education("credentials.javascript.title"),
        credentialCategory: "Course completion",
        dateCreated: "2023-02",
        recognizedBy: {
          "@type": "Organization",
          name: education("credentials.javascript.issuer"),
        },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: identity("city"),
      addressCountry: identity("countryCode"),
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity("displayName"),
    url: siteConfig.domain,
    inLanguage: structuredData("language"),
    description: metadata("description"),
  };

  return (
    <html
      lang={structuredData("language")}
      className={`${fraunces.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <a
            href="#conteudo"
            className="bg-accent text-background fixed top-2 left-2 z-[100] -translate-y-20 px-4 py-3 font-semibold focus:translate-y-0"
          >
            {accessibility("skip")}
          </a>
          <Header />
          {children}
          <Footer />
          <NoiseTexture />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
