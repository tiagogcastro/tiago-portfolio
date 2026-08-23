import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "../brand/SocialIcons";
import { Mark } from "../brand/Mark";
import { Wordmark } from "../brand/Wordmark";
import { ExternalLink } from "../ui/ExternalLink";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";

export async function Footer() {
  const t = await getTranslations("footer");
  const common = await getTranslations("common");
  const identity = await getTranslations("identity");
  const projects = await getTranslations("projects");
  const hero = await getTranslations("hero");

  return (
    <footer className="border-mineral/20 bg-surface-soft text-foreground border-t py-12 sm:py-14">
      <Container>
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <Mark className="size-9 shrink-0" />
              <Wordmark
                label={identity("wordmark")}
                className="text-foreground w-32 sm:w-36"
              />
            </div>
            <p className="font-heading text-secondary mt-5 text-lg leading-7 sm:text-xl">
              {hero("statement")}
            </p>
          </div>
          <p className="text-secondary flex items-center gap-2 text-sm">
            <MapPin aria-hidden="true" className="text-mineral size-4" />
            {t("location")}
          </p>
        </div>

        <div className="flex flex-col gap-6 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted font-mono text-xs">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            <ExternalLink href={siteConfig.linkedin} icon={LinkedInIcon}>
              {common("linkedin")}
            </ExternalLink>
            <ExternalLink href={siteConfig.github} icon={GitHubIcon}>
              {common("github")}
            </ExternalLink>
            <ExternalLink href={siteConfig.nexsift}>
              {projects("items.nexsift.name")}
            </ExternalLink>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-accent flex items-center gap-1.5 transition-colors"
            >
              <Mail aria-hidden="true" className="size-4" />
              {common("email")}
            </a>
            <ExternalLink href={siteConfig.whatsappUrl} icon={MessageCircle}>
              {common("whatsapp")}
            </ExternalLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
