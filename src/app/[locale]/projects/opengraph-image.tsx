import { ImageResponse } from "next/og";
import { SiteOgImage } from "@/components/og/SiteOgImage";
import { fonts, size } from "@/lib/og";
import { getOgCopy } from "@/lib/messages-static";

export const contentType = "image/png";
export const alt = "Tiago Castro · Projetos autorais e open source";

type ImageProps = { params: Promise<{ locale: string }> };

export default async function Image({ params }: ImageProps) {
  const { locale } = await params;
  const copy = getOgCopy(locale);

  return new ImageResponse(
    <SiteOgImage
      label={copy.projectsLabel}
      title={copy.projectsTitle}
      subtitle={copy.projectsSubtitle}
    />,
    {
      ...size,
      fonts,
    },
  );
}
