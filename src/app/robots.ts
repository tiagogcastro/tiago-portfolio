import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.split(":")[0];
  const domain =
    host === "contato.tiagogcastro.com.br"
      ? siteConfig.cardDomain
      : siteConfig.domain;
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
