import {
  BriefcaseBusiness,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "../brand/SocialIcons";
import { Wordmark } from "../brand/Wordmark";
import { ExternalLink } from "../ui/ExternalLink";
import { siteConfig } from "@/config/site";
import { workModes } from "@/content/contact";
import { Container } from "./Container";

export async function Footer() {
  const t = await getTranslations("footer");
  const modes = await getTranslations("contactBreak.modes");
  const common = await getTranslations("common");
  const identity = await getTranslations("identity");
  const projects = await getTranslations("projects");
  const hero = await getTranslations("hero");
  const experience = await getTranslations("experience");

  return (
    <footer className="border-mineral/20 bg-surface-soft text-foreground border-t py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Wordmark
              label={identity("wordmark")}
              className="text-foreground max-w-md"
            />
            <p className="font-heading mt-6 text-xl font-semibold uppercase sm:text-2xl">
              {t("role")}
            </p>
            <p className="text-secondary mt-5 max-w-xl text-lg leading-8">
              {hero("statement")}
            </p>
          </div>

          <div className="grid content-end gap-7">
            <div>
              <p className="mono-label text-mineral">
                {hero("availabilityLabel")}
              </p>
              <p className="font-heading mt-3 text-lg font-semibold">
                {hero("availability")}
              </p>
            </div>
            <div className="text-secondary grid gap-4 text-sm sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="text-mineral size-4" />
                {t("location")}
              </p>
              <p className="flex items-center gap-2">
                <Globe2 aria-hidden="true" className="text-mineral size-4" />
                {hero("remote")}
              </p>
            </div>
            <div className="text-secondary flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase">
              {workModes.map((mode) => (
                <span key={mode}>{modes(mode)}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-b border-white/15 py-9 lg:grid-cols-[0.45fr_1.55fr]">
          <p className="mono-label text-muted flex items-center gap-2">
            <BriefcaseBusiness aria-hidden="true" className="size-4" />
            {hero("statusLabel")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <ExternalLink
                href={siteConfig.lakeit}
                className="font-heading text-lg font-semibold"
              >
                {experience("lakeit.company")}
              </ExternalLink>
              <p className="text-secondary mt-2 text-sm">
                {hero("lakeitRole")}
              </p>
              <p className="text-muted mt-2 font-mono text-[0.68rem]">
                {hero("lakeitPeriod")}
              </p>
            </div>
            <div className="border-white/15 sm:border-l sm:pl-6">
              <ExternalLink
                href={siteConfig.futbuynow}
                className="font-heading text-lg font-semibold"
              >
                {experience("futbuynow.company")}
              </ExternalLink>
              <p className="text-secondary mt-2 text-sm">
                {hero("futbuynowRole")}
              </p>
              <p className="text-muted mt-2 font-mono text-[0.68rem]">
                {hero("futbuynowPeriod")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
