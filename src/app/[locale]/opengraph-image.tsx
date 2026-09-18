import { ImageResponse } from "next/og";
import { SiteOgImage } from "@/components/og/SiteOgImage";
import { getOgCopy } from "@/lib/messages-static";
import { fonts, size } from "@/lib/og";

export const contentType = "image/png";
export const alt = "Tiago Castro, Full Stack Developer";

type ImageProps = { params: Promise<{ locale: string }> };

export default async function Image({ params }: ImageProps) {
  const { locale } = await params;
  const copy = getOgCopy(locale);

  return new ImageResponse(
    <SiteOgImage
      title={copy.homeTitle}
      titleHighlight={copy.homeTitleHighlight}
      subtitle={copy.homeSubtitle}
      footerRole={copy.footerRole}
      expertise={copy.expertise}
    />,
    {
      ...size,
      fonts,
    },
  );
}
