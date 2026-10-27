import {
  FileDown,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ContactSignalField } from "@/components/visual/ContactSignalField";
import { Reveal } from "@/components/visual/Reveal";
import { linkedinHref, resumeHref, siteConfig } from "@/config/site";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const identity = await getTranslations("identity");
  const hero = await getTranslations("hero");
  const engagement = await getTranslations("engagement");
  const locale = await getLocale();
  const whatsappHref = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    engagement("whatsappMessage"),
  )}`;
  const secondaryChannels = [
    {
      value: t("channels.linkedinAction"),
      href: linkedinHref(locale),
      icon: LinkedInIcon,
      download: false,
    },
    {
      value: t("channels.githubAction"),
      href: siteConfig.github,
      icon: GitHubIcon,
      download: false,
    },
    {
      value: t("channels.resumeAction"),
      href: resumeHref(locale),
      icon: FileDown,
      download: true,
    },
  ] as const;

  return (
    <section
      id="contato"
      className="green-panel section-rule bg-mineral-deep relative overflow-hidden py-16 sm:py-20"
    >
      <ContactSignalField />
      <div
        aria-hidden="true"
        className="border-accent/20 absolute -right-40 -bottom-64 size-[34rem] rounded-full border shadow-[0_0_120px_color-mix(in_srgb,var(--accent)_10%,transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <p className="mono-label text-mineral-bright">{t("status")}</p>
          <h2 className="font-display mt-3 max-w-5xl text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.035em]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {t.rich("availabilityTitle", {
              highlight: (chunks) => (
                <span className="text-accent font-semibold">{chunks}</span>
              ),
            })}
          </p>
        </Reveal>

        <Reveal className="bg-background/85 border-accent/40 mt-10 overflow-hidden border backdrop-blur-sm">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:p-10">
            <div>
              <span className="border-accent/35 bg-accent/10 text-accent inline-flex items-center gap-2 border px-3 py-2 text-xs font-bold tracking-[0.1em] uppercase">
                <Sparkles aria-hidden="true" className="size-4" />
                {t("response")}
              </span>
              <h3 className="font-display mt-6 max-w-3xl text-3xl leading-[1.12] font-semibold sm:text-4xl">
                {t.rich("ctaTitle", {
                  highlight: (chunks) => (
                    <span className="text-accent">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-secondary mt-4 max-w-2xl leading-7">
                {t("ctaText")}
              </p>
            </div>

            <div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button
                  href={`mailto:${siteConfig.email}`}
                  icon={Mail}
                  trailingIcon={false}
                >
                  {t("emailAction")}
                </Button>
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  icon={MessageCircle}
                  trailingIcon={false}
                >
                  {t("whatsappAction")}
                </Button>
              </div>
              <p className="text-secondary mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin aria-hidden="true" className="text-mineral size-4" />
                  {hero("location")}
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 aria-hidden="true" className="text-mineral size-4" />
                  {hero("remote")}
                </span>
              </p>
            </div>
          </div>

          <div className="grid border-t border-white/15 sm:grid-cols-3">
            {secondaryChannels.map((channel) => (
              <ExternalLink
                key={channel.href}
                href={channel.href}
                icon={channel.icon}
                target={channel.download ? "_self" : "_blank"}
                download={channel.download}
                className="hover:bg-surface-soft group/channel flex min-h-24 items-center justify-between border-b border-white/15 p-5 no-underline transition-[background-color,color] hover:no-underline sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <span className="font-semibold">{channel.value}</span>
              </ExternalLink>
            ))}
          </div>
        </Reveal>

        <p className="text-mineral-bright mt-6 text-sm">{identity("email")}</p>
      </Container>
    </section>
  );
}
