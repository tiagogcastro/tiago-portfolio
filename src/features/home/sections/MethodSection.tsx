import {
  Blocks,
  CloudCog,
  Code2,
  Gauge,
  SearchCheck,
  ServerCog,
  Sparkles,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/visual/Reveal";

const capabilities = [
  { key: "backend", icon: ServerCog, tone: "accent" },
  { key: "frontend", icon: Code2, tone: "mineral" },
  { key: "cloudData", icon: CloudCog, tone: "mineral" },
  { key: "delivery", icon: Gauge, tone: "accent" },
] as const;

const process = [
  { key: "understand", icon: SearchCheck },
  { key: "build", icon: Blocks },
  { key: "improve", icon: Workflow },
] as const;

export async function MethodSection() {
  const t = await getTranslations("profile");

  return (
    <section
      id="metodo"
      className="section-rule bg-surface relative overflow-hidden py-14 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="border-mineral/15 absolute -right-32 bottom-20 size-80 rounded-full border shadow-[0_0_100px_color-mix(in_srgb,var(--mineral)_8%,transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <p className="mono-label text-mineral">{t("methodLabel")}</p>
          <h2 className="font-display mt-3 max-w-3xl text-[clamp(2.25rem,4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            {t("title")}
          </h2>
          <p className="text-secondary mt-5 max-w-3xl text-base leading-7">
            {t("methodIntro")}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="bg-background/70 border border-white/15 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Sparkles aria-hidden="true" className="text-accent size-5" />
              <h3 className="font-heading font-semibold">
                {t("processVisual.title")}
              </h3>
            </div>
            <div className="mt-5 space-y-2">
              {process.map(({ key, icon: Icon }, index) => (
                <div
                  key={key}
                  className="bg-surface-soft hover:border-accent/35 relative grid grid-cols-[auto_1fr] gap-4 border border-white/10 p-4 transition-[border-color,transform] duration-300 hover:translate-x-1"
                >
                  <span className="bg-background border-accent/35 text-accent grid size-10 place-items-center rounded-full border">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="pr-6">
                    <p className="font-semibold">
                      {t(`processVisual.items.${key}`)}
                    </p>
                    <p className="text-secondary mt-1 text-sm leading-5">
                      {t(`processVisual.details.${key}`)}
                    </p>
                  </div>
                  <span className="text-muted absolute top-4 right-4 text-xs font-bold">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map(({ key, icon: Icon, tone }, index) => (
              <Reveal
                key={key}
                delay={index * 0.05}
                className="bg-surface-soft group relative overflow-hidden border border-white/15 p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_18px_60px_color-mix(in_srgb,var(--mineral)_8%,transparent)]"
              >
                <div
                  aria-hidden="true"
                  className={`absolute -top-20 -right-20 size-40 rounded-full border transition-transform duration-500 group-hover:scale-110 ${
                    tone === "accent" ? "border-accent/20" : "border-mineral/20"
                  }`}
                />
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full border ${
                      tone === "accent"
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-mineral/40 bg-mineral/10 text-mineral-bright"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <p className="text-mineral text-xs font-bold tracking-[0.1em] uppercase">
                    {t(`capabilities.${key}.label`)}
                  </p>
                </div>
                <h3 className="font-display mt-3 max-w-md text-xl leading-tight font-semibold">
                  {t(`capabilities.${key}.title`)}
                </h3>
                <p className="text-secondary mt-2 max-w-xl text-sm leading-5">
                  {t(`capabilities.${key}.detail`)}
                </p>
                <p className="border-mineral/20 text-muted mt-3 border-t pt-3 text-xs leading-5 font-semibold">
                  {t(`capabilities.${key}.tools`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
