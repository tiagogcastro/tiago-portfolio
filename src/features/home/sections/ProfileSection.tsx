import {
  CloudCog,
  Code2,
  FileDown,
  GraduationCap,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

const capabilities = [
  ["backend", Code2],
  ["frontend", PanelsTopLeft],
  ["cloudData", CloudCog],
  ["delivery", Workflow],
] as const;

export async function ProfileSection() {
  const t = await getTranslations("profile");
  const common = await getTranslations("common");

  return (
    <section
      id="perfil"
      className="section-rule route-background bg-surface relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <Container className="relative">
        <Reveal className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr]">
          <p className="mono-label text-accent">{t("index")}</p>
          <div>
            <h2 className="font-display max-w-4xl text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">
              {t("title")}
            </h2>
            <p className="text-secondary mt-5 max-w-2xl text-lg leading-8">
              {t("intro")}
            </p>
            <div className="text-secondary mt-6 flex flex-wrap gap-3 text-sm">
              <span className="bg-background/50 flex items-center gap-2 border border-white/10 px-3 py-2">
                <GraduationCap
                  aria-hidden="true"
                  className="text-mineral size-4"
                />
                {t("credentials.degree")}
              </span>
              <span className="bg-background/50 flex items-center gap-2 border border-white/10 px-3 py-2">
                <Code2 aria-hidden="true" className="text-accent size-4" />
                {t("credentials.focus")}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:mt-16">
          {capabilities.map(([capability, Icon], index) => (
            <Reveal key={capability} className="bg-surface p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <Icon aria-hidden="true" className="text-mineral size-6" />
                <span className="text-muted font-mono text-[0.65rem]">
                  0{index + 1}
                </span>
              </div>
              <p className="mono-label text-accent mt-8">
                {t(`capabilities.${capability}.label`)}
              </p>
              <h3 className="font-heading mt-3 text-2xl font-semibold">
                {t(`capabilities.${capability}.title`)}
              </h3>
              <p className="text-secondary mt-4 max-w-xl leading-7">
                {t(`capabilities.${capability}.detail`)}
              </p>
              <p className="text-muted mt-6 font-mono text-[0.68rem] uppercase">
                {t(`capabilities.${capability}.tools`)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-secondary max-w-md">{t("resumeText")}</p>
          <Button
            href={siteConfig.resume["pt-BR"]}
            download
            variant="outline"
            icon={FileDown}
            trailingIcon={false}
          >
            {common("downloadResume")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
