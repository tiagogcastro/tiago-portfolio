import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { getMessagesForLocale } from "@/lib/messages-static";

type RouteContext = { params: Promise<{ locale: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return new NextResponse(null, { status: 404 });
  }

  const messages = getMessagesForLocale(locale);
  const isCardHost =
    request.headers.get("host")?.split(":")[0] ===
    new URL(siteConfig.cardDomain).hostname;

  return NextResponse.json(
    {
      name: isCardHost ? messages.card.metadata.title : messages.metadata.title,
      short_name: messages.identity.displayName,
      description: isCardHost
        ? messages.card.metadata.description
        : messages.metadata.description,
      start_url: locale === routing.defaultLocale ? "/" : `/${locale}`,
      display: "minimal-ui",
      background_color: "#141815",
      theme_color: "#141815",
      lang: locale,
      categories: ["portfolio", "technology"],
      icons: [
        {
          src: "/brand/tiago-g-castro-mark.png",
          sizes: "1024x1024",
          type: "image/png",
        },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
