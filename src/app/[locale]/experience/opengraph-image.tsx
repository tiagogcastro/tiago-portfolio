import { ImageResponse } from "next/og";
import { SiteOgImage } from "@/components/og/SiteOgImage";
import { fonts, size } from "@/lib/og";
import { getOgCopy } from "@/lib/messages-static";

export const contentType = "image/png";
export const alt = "Tiago Castro · Experiência profissional";

type ImageProps = { params: Promise<{ locale: string }> };

export default async function Image({ params }: ImageProps) {
  const { locale } = await params;
  const copy = getOgCopy(locale);

  return new ImageResponse(
    <SiteOgImage
      label={copy.experienceLabel}
      title={copy.experienceTitle}
      subtitle={copy.experienceSubtitle}
    />,
    {
      ...size,
      fonts,
    },
  );
}
