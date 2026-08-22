import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | Desenvolvedor Full Stack`,
    short_name: siteConfig.name,
    description:
      "Portfólio de Tiago Castro, Desenvolvedor Full Stack especializado em Cloud e AWS.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#12161c",
    theme_color: "#12161c",
    lang: "pt-BR",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
