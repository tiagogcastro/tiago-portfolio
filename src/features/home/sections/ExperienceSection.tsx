import {
  Activity,
  Bot,
  Boxes,
  CloudCog,
  Code2,
  CreditCard,
  Database,
  DollarSign,
  SearchCheck,
  ShoppingBag,
  Store,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { TechnologyChips } from "@/components/ui/TechnologyChips";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/config/site";

const cases = [
  {
    key: "lakeit",
    href: siteConfig.lakeit,
    images: [
      {
        src: "/images/cases/lakeit_landingpage.png",
        altKey: "experience.lakeit.figures.product.alt",
        captionKey: "experience.lakeit.figures.product.caption",
        width: 1400,
        height: 1000,
      },
      {
        src: "/images/cases/lakeit_platform.png",
        altKey: "experience.lakeit.figures.platform.alt",
        captionKey: "experience.lakeit.figures.platform.caption",
        width: 1400,
        height: 857,
      },
    ],
    roleKey: "role",
    icons: [Database, CloudCog, Bot],
    highlights: ["data", "infra", "ai"],
    stacks: ["data", "infra"],
    stackProperty: "stack",
    metrics: [
      [
        "experience.lakeit.cost.homeSavingValue",
        "experience.lakeit.cost.homeSavingLabel",
        DollarSign,
      ],
      [
        "experience.lakeit.cost.homeAfterValue",
        "experience.lakeit.cost.homeAfterLabel",
        Activity,
      ],
      [
        "experience.lakeit.blocks.infra.metricModules",
        "experience.lakeit.blocks.infra.label",
        Boxes,
      ],
    ],
    accent: "mineral",
  },
  {
    key: "futbuynow",
    href: siteConfig.futbuynow,
    images: [
      {
        src: "/images/cases/futbuynow_homepage.png",
        altKey: "experience.futbuynow.figures.product.alt",
        captionKey: "experience.futbuynow.figures.product.caption",
        width: 1898,
        height: 1079,
      },
      {
        src: "/images/cases/futbuynow_marketplace.png",
        altKey: "experience.futbuynow.figures.marketplace.alt",
        captionKey: "experience.futbuynow.figures.marketplace.caption",
        width: 1899,
        height: 1079,
      },
      {
        src: "/images/cases/futbuynow_checkout.png",
        altKey: "experience.futbuynow.figures.checkout.alt",
        captionKey: "experience.futbuynow.figures.checkout.caption",
        width: 1901,
        height: 1079,
      },
    ],
    roleKey: "label",
    icons: [Store, CreditCard, Bot],
    highlights: ["product", "payments", "ai"],
    stacks: ["product", "payments"],
    stackProperty: "tools",
    metrics: [
      [
        "experience.futbuynow.metrics.ordersValue",
        "experience.futbuynow.metrics.ordersLabel",
        ShoppingBag,
      ],
      [
        "experience.futbuynow.metrics.monthlyValue",
        "experience.futbuynow.metrics.monthlyLabel",
        Activity,
      ],
      [
        "experience.futbuynow.metrics.seoTotalValue",
        "experience.futbuynow.metrics.seoTotalLabel",
        SearchCheck,
      ],
    ],
    accent: "accent",
  },
] as const;

export async function ExperienceSection() {
  const t = await getTranslations();
  const experience = await getTranslations("experience");
  const gallery = await getTranslations("common.gallery");
  const galleryLabels = {
    open: gallery("open"),
    close: gallery("close"),
    previous: gallery("previous"),
    next: gallery("next"),
    counter: gallery.raw("counter"),
  };

  return (
    <section
      id="experiencia"
      className="section-rule relative overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="border-mineral/15 absolute top-24 -right-72 size-[38rem] rounded-full border shadow-[0_0_140px_color-mix(in_srgb,var(--mineral)_10%,transparent)]"
      />
      <Container className="relative">
        <Reveal className="border-b border-white/15 pb-8">
          <p className="mono-label text-mineral">{experience("homeLabel")}</p>
          <h2 className="font-display mt-3 max-w-3xl text-[clamp(2.25rem,4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            {experience("title")}
          </h2>
          <p className="text-secondary mt-5 max-w-3xl leading-7">
            {experience("homeIntro")}
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {cases.map((item) => (
            <Reveal
              key={item.key}
              className={`bg-surface-soft relative overflow-hidden border ${
                item.accent === "mineral"
                  ? "border-mineral/35"
                  : "border-accent/35"
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute -top-32 -right-24 size-80 rounded-full border ${
                  item.accent === "mineral"
                    ? "border-mineral/20"
                    : "border-accent/20"
                }`}
              />
              <article id={item.key} className="relative scroll-mt-24">
                <header className="grid gap-6 border-b border-white/15 p-6 sm:p-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12 lg:p-9">
                  <div>
                    <p className="text-muted text-sm font-semibold">
                      {t(`experience.${item.key}.period`)}
                    </p>
                    <p
                      className={`mt-2 max-w-xs text-sm leading-6 font-semibold whitespace-pre-line ${
                        item.accent === "mineral"
                          ? "text-mineral-bright"
                          : "text-accent"
                      }`}
                    >
                      {t(`experience.${item.key}.${item.roleKey}`)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display max-w-4xl text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
                      <ExternalLink
                        href={item.href}
                        className="no-underline hover:no-underline"
                      >
                        {t(`experience.${item.key}.company`)}
                      </ExternalLink>
                    </h3>
                    <p className="text-secondary mt-4 max-w-3xl leading-7">
                      {t(`experience.${item.key}.description`)}
                    </p>
                  </div>
                </header>

                <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="border-white/15 p-4 sm:p-6 lg:border-r lg:p-7">
                    <ImageGallery
                      images={item.images.map((image) => ({
                        src: image.src,
                        alt: t(image.altKey),
                        caption: t(image.captionKey),
                        width: image.width,
                        height: image.height,
                      }))}
                      labels={galleryLabels}
                      compact
                    />
                  </div>

                  <div className="p-6 sm:p-8 lg:p-9">
                    <div className="mb-6 flex items-center gap-3">
                      <Code2
                        aria-hidden="true"
                        className={
                          item.accent === "mineral"
                            ? "text-mineral size-5"
                            : "text-accent size-5"
                        }
                      />
                      <p className="text-sm font-bold tracking-[0.1em] uppercase">
                        {experience("contributionsLabel")}
                      </p>
                    </div>
                    <div className="space-y-6">
                      {item.highlights.map((highlight, index) => {
                        const Icon = item.icons[index];

                        return (
                          <div
                            key={highlight}
                            className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0"
                          >
                            <span
                              className={`grid size-10 place-items-center rounded-full border ${
                                item.accent === "mineral"
                                  ? "border-mineral/40 bg-mineral/10 text-mineral-bright"
                                  : "border-accent/40 bg-accent/10 text-accent"
                              }`}
                            >
                              <Icon aria-hidden="true" className="size-4" />
                            </span>
                            <div>
                              <h4 className="font-heading text-lg leading-snug font-semibold">
                                {t(
                                  `experience.${item.key}.blocks.${highlight}.title`,
                                )}
                              </h4>
                              <p className="text-secondary mt-2 text-sm leading-6">
                                {t(
                                  `experience.${item.key}.blocks.${highlight}.detail`,
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid gap-px border-t border-white/15 bg-white/15 lg:grid-cols-3">
                  {item.metrics.map(([value, label, MetricIcon]) => (
                    <div
                      key={value}
                      className="bg-background grid grid-cols-[auto_1fr] items-center gap-4 p-5 sm:p-6"
                    >
                      <MetricIcon
                        aria-hidden="true"
                        className={
                          item.accent === "mineral"
                            ? "text-mineral-bright size-5"
                            : "text-accent size-5"
                        }
                      />
                      <div className="min-w-0">
                        <strong className="font-display text-accent block text-[clamp(1.1rem,1.45vw,1.4rem)] leading-tight font-semibold whitespace-nowrap">
                          {t(value)}
                        </strong>
                        <p className="text-secondary mt-1 text-xs leading-5">
                          {t(label)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-white/15 px-6 py-5 sm:px-8 lg:px-9">
                  <p className="text-muted mb-3 text-xs font-bold tracking-[0.1em] uppercase">
                    {experience("technologyHelp")}
                  </p>
                  <TechnologyChips
                    technologies={[
                      ...new Set(
                        item.stacks.flatMap((block) =>
                          t(
                            `experience.${item.key}.blocks.${block}.${item.stackProperty}`,
                          )
                            .split(" · ")
                            .slice(0, 6),
                        ),
                      ),
                    ]}
                  />
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
