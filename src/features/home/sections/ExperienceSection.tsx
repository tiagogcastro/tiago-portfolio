import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const cases = [
  {
    key: "lakeit",
    href: siteConfig.lakeit,
    highlights: ["data", "infra", "ai"],
    metrics: [
      [
        "experience.lakeit.cost.savingValue",
        "experience.lakeit.cost.savingLabel",
      ],
      [
        "experience.lakeit.blocks.infra.metricModules",
        "experience.lakeit.blocks.infra.label",
      ],
    ],
  },
  {
    key: "futbuynow",
    href: siteConfig.futbuynow,
    highlights: ["product", "payments", "ai"],
    metrics: [
      [
        "experience.futbuynow.metrics.monthlyValue",
        "experience.futbuynow.metrics.monthlyLabel",
      ],
      [
        "experience.futbuynow.metrics.ordersValue",
        "experience.futbuynow.metrics.ordersLabel",
      ],
      [
        "experience.futbuynow.metrics.seoTotalValue",
        "experience.futbuynow.metrics.seoTotalLabel",
      ],
    ],
  },
] as const;

export async function ExperienceSection() {
  const t = await getTranslations();
  const experience = await getTranslations("experience");

  return (
    <section id="experiencia" className="section-rule py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="mono-label text-mineral">{experience("homeLabel")}</p>
            <h2 className="font-display mt-5 text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
              {experience("title")}
            </h2>
          </div>
          <p className="text-secondary max-w-2xl text-base leading-7">
            {experience("homeIntro")}
          </p>
        </Reveal>

        {cases.map((item, caseIndex) => (
          <article
            key={item.key}
            id={item.key}
            className="border-b border-white/15 py-16 lg:py-24"
          >
            <Reveal className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-muted font-mono text-sm">
                  {t(`experience.${item.key}.period`)}
                </p>
                <p className="text-mineral mt-3 font-mono text-sm whitespace-pre-line">
                  {t(
                    `experience.${item.key}.${item.key === "lakeit" ? "role" : "label"}`,
                  )}
                </p>
                <span className="text-muted mt-10 block font-mono text-xs">
                  0{caseIndex + 1} / 02
                </span>
              </div>

              <div>
                <h3 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
                  <ExternalLink
                    href={item.href}
                    className="no-underline hover:no-underline"
                  >
                    {t(`experience.${item.key}.company`)}
                  </ExternalLink>
                </h3>
                <p className="text-secondary mt-6 max-w-[68ch] text-lg leading-8">
                  {t(`experience.${item.key}.description`)}
                </p>

                <div
                  className={`mt-10 grid gap-px border border-white/15 bg-white/15 ${
                    item.metrics.length === 3
                      ? "sm:grid-cols-3"
                      : "sm:grid-cols-2"
                  }`}
                >
                  {item.metrics.map(([value, label]) => (
                    <div key={value} className="bg-surface p-6 sm:p-8">
                      <strong className="font-display text-accent block text-4xl font-semibold">
                        {t(value)}
                      </strong>
                      <p className="text-secondary mt-3 text-sm leading-6">
                        {t(label)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-white/15">
                  {item.highlights.map((highlight, index) => (
                    <Reveal
                      key={highlight}
                      delay={index * 0.06}
                      className="grid gap-4 border-b border-white/15 py-6 sm:grid-cols-[2rem_1fr] sm:gap-6"
                    >
                      <span className="text-muted font-mono text-xs">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-heading text-xl font-semibold">
                          {t(
                            `experience.${item.key}.blocks.${highlight}.title`,
                          )}
                        </h4>
                        <p className="text-secondary mt-3 max-w-2xl leading-7">
                          {t(
                            `experience.${item.key}.blocks.${highlight}.detail`,
                          )}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </article>
        ))}

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-secondary max-w-xl leading-7">
            {experience("homeCtaText")}
          </p>
          <Link href="/experience" className={buttonStyles("outline")}>
            {experience("homeCta")}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
