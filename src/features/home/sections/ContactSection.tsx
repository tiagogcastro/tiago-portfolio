import { FileDown, Mail, MessageCircle } from "lucide-react";
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
  const channels = [
    {
      key: "hiring",
      value: identity("email"),
      href: `mailto:${siteConfig.email}`,
      external: false,
      icon: Mail,
    },
    {
      key: "project",
      value: common("whatsapp"),
      href: siteConfig.whatsappUrl,
      external: true,
      icon: MessageCircle,
    },
    {
      key: "networking",
      value: common("linkedin"),
      href: siteConfig.linkedin,
      external: true,
      icon: LinkedInIcon,
    },
    {
      key: "code",
      value: common("github"),
      href: siteConfig.github,
      external: true,
      icon: GitHubIcon,
    },
    {
      key: "resume",
      value: common("downloadResume"),
      href: siteConfig.resume["pt-BR"],
      external: false,
      icon: FileDown,
    },
  ] as const;

  return (
    <section
      id="contato"
      className="section-rule bg-surface py-20 sm:py-28 lg:py-36"
    >
      <Container>
        <Reveal>
          <p className="mono-label text-accent">{t("index")}</p>
          <h2 className="font-display mt-8 text-[clamp(4rem,12vw,12rem)] leading-[0.78] font-semibold tracking-[-0.075em]">
            {t("title")}
          </h2>
          <p className="text-secondary mt-8 text-lg">{t("intro")}</p>
        </Reveal>
        <div className="mt-14 border-t border-white/15 lg:mt-20">
          {channels.map((channel) => (
            <Reveal
              key={channel.key}
              className="grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[0.6fr_1.4fr] sm:items-center lg:py-7"
            >
              <p className="mono-label text-muted">
                {t(`channels.${channel.key}`)}
              </p>
              {channel.external ? (
                <ExternalLink
                  href={channel.href}
                  icon={channel.icon}
                  className="font-heading w-fit text-xl font-semibold sm:text-2xl"
                >
                  {channel.value}
                </ExternalLink>
              ) : (
                <a
                  href={channel.href}
                  download={channel.key === "resume" ? true : undefined}
                  className="group font-heading hover:text-accent flex w-fit items-center gap-3 text-xl font-semibold transition-colors sm:text-2xl"
                >
                  <channel.icon aria-hidden="true" className="size-5" />
                  {channel.value}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
