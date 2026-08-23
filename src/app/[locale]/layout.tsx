import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "600"],
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#141815",
};

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
    applicationName: identity("displayName"),
    title: {
      default: t("title"),
      template: `%s · ${identity("displayName")}`,
    },
    description: t("description"),
    authors: [{ name: identity("fullName"), url: "/" }],
    creator: identity("fullName"),
    publisher: identity("displayName"),
    category: "technology",
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: structuredData("openGraphLocale"),
      url: "/",
      siteName: identity("displayName"),
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
    appleWebApp: {
      capable: true,
      title: identity("displayName"),
      statusBarStyle: "black-translucent",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.domain}/#profile`,
        url: siteConfig.domain,
        name: metadata("title"),
        description: metadata("description"),
        inLanguage: structuredData("language"),
        isPartOf: { "@id": `${siteConfig.domain}/#website` },
        mainEntity: { "@id": `${siteConfig.domain}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.domain}/#person`,
        name: identity("fullName"),
        alternateName: identity("displayName"),
        url: siteConfig.domain,
        jobTitle: identity("role"),
        description: metadata("description"),
        sameAs: [siteConfig.linkedin, siteConfig.github],
        mainEntityOfPage: { "@id": `${siteConfig.domain}/#profile` },
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
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        name: identity("displayName"),
        url: siteConfig.domain,
        inLanguage: structuredData("language"),
        description: metadata("description"),
        publisher: { "@id": `${siteConfig.domain}/#person` },
      },
    ],
  };

  return (
    <html
      lang={structuredData("language")}
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
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
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
