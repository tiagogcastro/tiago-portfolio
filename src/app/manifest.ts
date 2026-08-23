import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} · Desenvolvedor Full Stack e Cloud`,
    short_name: "Tiago Castro",
    description:
      "Portfólio de Tiago Castro, desenvolvedor full stack que cria e evolui sites, sistemas e produtos digitais.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#141815",
    theme_color: "#141815",
    lang: "pt-BR",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
