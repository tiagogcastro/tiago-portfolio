import { ImageResponse } from "next/og";
import { SiteOgImage } from "@/components/og/SiteOgImage";
import { fonts, size } from "@/lib/og";
import messages from "../../../messages/pt-BR.json";

export { size };

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    <SiteOgImage
      title={messages.hero.firstName}
      titleHighlight={messages.hero.lastName}
      subtitle={messages.hero.positioning}
    />,
    {
      ...size,
      fonts,
    },
  );
}
