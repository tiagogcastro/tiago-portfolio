import { Button } from "@/components/ui/Button";
import { CosmicHero } from "@/features/home/components/CosmicHero";
import { CosmicIdentity } from "@/features/home/components/CosmicIdentity";
import { DISCOVERY_IDS } from "@/features/home/components/cosmicTypes";
import { getTranslations } from "next-intl/server";

const topics = ["development", "cloud", "data", "seo", "product"] as const;

export async function HeroSection() {
  const t = await getTranslations("hero.cosmic");
  const common = await getTranslations("common");

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
        discoveries: Object.fromEntries(
          DISCOVERY_IDS.map((id) => [
            id,
            {
              title: t(`discoveries.${id}.title`),
              text: t(`discoveries.${id}.text`),
              action: t(`discoveries.${id}.action`),
            },
          ]),
        ) as Record<
          (typeof DISCOVERY_IDS)[number],
          { title: string; text: string; action: string }
        >,
        targets: {
          universe: t("targets.universe"),
          core: t("targets.core"),
          avatar: t("targets.avatar"),
          orbit: t("targets.orbit"),
        },
        explore: t("explore"),
        close: t("close"),
        visit: t("visit"),
        control: t("control"),
        soundError: t("soundError"),
        volume: t("volume"),
        linkedin: common("linkedin"),
        github: common("github"),
        tiktok: t("tiktok"),
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
        identity: t("name"),
        topics: topics.map((key) => ({
          key,
          title: t(`topics.${key}.title`),
          detail: t(`topics.${key}.detail`),
          tools: t(`topics.${key}.tools`),
          problem: t(`topics.${key}.problem`),
          result: t(`topics.${key}.result`),
        })),
      }}
    >
      <div className="flex flex-col gap-6">
        <div>
          <CosmicIdentity name={t("name")} />
        </div>

        <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
          {t("role")}
        </p>

        <h1 className="font-display text-[clamp(3.2rem,6vw,6.4rem)] leading-[0.96] tracking-[-0.04em]">
          <span className="text-foreground block">{t("titleFirst")}</span>
          <span className="text-accent block">{t("titleSecond")}</span>
        </h1>

        <p className="text-secondary max-w-[40ch] text-base leading-7 sm:text-lg">
          {t("description")}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="#experiencia" direction="down">
            {common("viewExperience")}
          </Button>
          <Button href="#contato" variant="outline">
            {common("talkToMe")}
          </Button>
        </div>
      </div>
    </CosmicHero>
  );
}
