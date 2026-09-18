import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Familjen_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { EngagementBox } from "@/components/layout/EngagementBox";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});
const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen-grotesk",
  weight: "variable",
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
  const identity = await getTranslations({ locale, namespace: "identity" });

  return {
    metadataBase: new URL(siteConfig.domain),
    applicationName: identity("displayName"),
    title: {
      default: identity("displayName"),
      template: `%s · ${identity("displayName")}`,
    },
    authors: [{ name: identity("fullName"), url: "/" }],
    creator: identity("fullName"),
    publisher: identity("displayName"),
    category: "technology",
    manifest: `/manifest/${locale}`,
    icons: {
      icon: "/brand/tiago-g-castro-mark.svg",
      apple: "/brand/tiago-g-castro-mark.png",
    },
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

  const accessibility = await getTranslations("accessibility");
  const structuredData = await getTranslations("structuredData");

  return (
    <html
      lang={structuredData("language")}
      className={`${fraunces.variable} ${familjenGrotesk.variable} ${plexMono.variable}`}
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
          <EngagementBox />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
