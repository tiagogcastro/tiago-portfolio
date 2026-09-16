import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { CosmicHero } from "../components/CosmicHero";

const topics = ["development", "cloud", "data", "seo", "product"] as const;

export async function HeroSection() {
  const t = await getTranslations("hero.cosmic");
  const common = await getTranslations("common");
  const identity = await getTranslations("identity");

  return (
    <CosmicHero
      labels={{
        soundOn: t("soundOn"),
        soundOff: t("soundOff"),
        scroll: t("scroll"),
        interaction: t("interaction"),
        reset: t("reset"),
        coordinates: t("coordinates"),
        terminal: t("terminal"),
        command: t("command"),
        sequence: t("sequence"),
        chapters: Array.from({ length: 6 }, (_, i) => t(`chapters.${i}`)),
        problem: t("problem"),
        result: t("result"),
        tools: t("tools"),
        coreTitle: t("coreTitle"),
        coreDescription: t("coreDescription"),
        terminalLines: Array.from({ length: 4 }, (_, i) =>
          t(`terminalLines.${i}`),
        ),
        finalTitle: t("finalTitle"),
        finalDescription: t("finalDescription"),
        continue: t("continue"),
        identity: identity("fullName"),
        topics: topics.map((key) => ({
          title: t(`topics.${key}.title`),
          detail: t(`topics.${key}.detail`),
          tools: t(`topics.${key}.tools`),
          problem: t(`topics.${key}.problem`),
          result: t(`topics.${key}.result`),
        })),
      }}
    >
      <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
        {identity("fullName")} / {t("role")}
      </p>
      <h1 className="font-display mt-5 text-[clamp(3.8rem,7.5vw,8rem)] leading-[0.95] tracking-[-0.045em]">
        <span className="block">{t("titleFirst")}</span>
        <span className="text-accent block">{t("titleSecond")}</span>
      </h1>
      <p className="text-secondary mt-6 max-w-[38ch] text-base leading-7 sm:text-lg">
        {t("description")}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="#experiencia" direction="down">
          {common("viewExperience")}
        </Button>
        <Button href="#contato" variant="outline">
          {common("talkToMe")}
        </Button>
      </div>
    </CosmicHero>
  );
}
