import { FileDown, Globe2, Mail, MapPin, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const common = await getTranslations("common");
  const identity = await getTranslations("identity");
  const hero = await getTranslations("hero");
  const channels = [
    {
      value: identity("email"),
      href: `mailto:${siteConfig.email}`,
      icon: Mail,
      target: "_self",
      download: false,
    },
    {
      value: common("whatsapp"),
      href: siteConfig.whatsappUrl,
      icon: MessageCircle,
      target: "_blank",
      download: false,
    },
    {
      value: common("linkedin"),
      href: siteConfig.linkedin,
      icon: LinkedInIcon,
      target: "_blank",
      download: false,
    },
    {
      value: common("github"),
      href: siteConfig.github,
      icon: GitHubIcon,
      target: "_blank",
      download: false,
    },
    {
      value: common("downloadResume"),
      href: siteConfig.resume["pt-BR"],
      icon: FileDown,
      target: "_self",
      download: true,
    },
  ] as const;

  return (
    <section
      id="contato"
      className="green-panel section-rule bg-mineral-deep py-20 sm:py-28"
    >
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] font-semibold tracking-[-0.035em]">
            {t("title")}
          </h2>
          <p className="text-secondary max-w-xl text-lg leading-8">
            {t.rich("availabilityTitle", {
              highlight: (chunks) => (
                <span className="text-accent font-semibold">{chunks}</span>
              ),
            })}
          </p>
        </Reveal>

        <Reveal className="bg-surface-soft border-accent/40 mt-12 grid gap-8 border-t-2 p-8 sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <h3 className="font-display max-w-3xl text-3xl leading-[1.25] font-semibold sm:text-4xl">
            {t.rich("ctaTitle", {
              highlight: (chunks) => (
                <span className="text-accent">{chunks}</span>
              ),
            })}
          </h3>
          <div>
            <p className="text-secondary max-w-xl text-lg leading-8">
              {t("ctaText")}
            </p>
            <p className="text-secondary mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4" />
                {hero("location")}
              </span>
              <span className="flex items-center gap-2">
                <Globe2 aria-hidden="true" className="size-4" />
                {hero("remote")}
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid border-t border-l border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Reveal
              key={channel.href}
              className="border-r border-b border-white/15 p-6 sm:p-8"
            >
              <ExternalLink
                href={channel.href}
                icon={channel.icon}
                target={channel.target}
                download={channel.download}
                className="font-heading w-fit text-lg font-semibold sm:text-xl"
              >
                {channel.value}
              </ExternalLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
