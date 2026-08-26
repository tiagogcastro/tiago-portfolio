"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { LinkedInIcon } from "@/components/brand/SocialIcons";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "tiago-portfolio-engagement-dismissed";
const SHOW_DELAY_MS = 6000;
const DISMISS_OFFSET_Y = 120;
const DISMISS_VELOCITY_Y = 700;

export function EngagementBox() {
  const t = useTranslations("engagement");
  const identity = useTranslations("identity");
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;

    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      dismissed = false;
    }

    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (typeof window === "undefined") return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable, dismissal applies to this visit only
    }
    setVisible(false);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_OFFSET_Y || info.velocity.y > DISMISS_VELOCITY_Y) {
      dismiss();
    }
  };

  const whatsappHref = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  return (
    <AnimatePresence>
      {visible ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center">
          <motion.aside
            role="complementary"
            aria-label={t("label")}
            initial={reduceMotion ? { opacity: 0 } : { y: 180, opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 210, damping: 26 },
                  }
            }
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    y: 180,
                    opacity: 0,
                    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
                  }
            }
            drag={reduceMotion ? false : "y"}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.55 }}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className="bg-surface/90 shadow-accent/10 pointer-events-auto relative w-full border-t border-white/15 p-5 shadow-2xl backdrop-blur-xl sm:border-x sm:px-8 sm:py-6"
          >
            <div
              aria-hidden="true"
              onPointerDown={(event) => dragControls.start(event)}
              className="group absolute inset-x-0 top-0 z-10 flex cursor-grab touch-none items-center justify-center pt-3 pb-2 select-none active:cursor-grabbing"
            >
              <span className="h-1 w-12 rounded-full bg-white/25 transition-colors group-hover:bg-white/40" />
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label={t("dismiss")}
              className="text-muted hover:text-accent absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center transition-colors"
            >
              <X aria-hidden="true" className="size-4" />
            </button>

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
              <div className="min-w-0 flex-1">
                <div>
                  <Logo
                    name={identity("fullName")}
                    wordmark={identity("wordmark")}
                    linked={false}
                  />
                  <p className="mono-label text-muted mt-1 ml-12">
                    {identity("role")}
                  </p>
                </div>
                <p className="mono-label text-accent mt-4 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-accent size-1.5 animate-pulse rounded-full"
                  />
                  {t("label")}
                </p>
                <p className="font-heading mt-2 pr-6 text-sm leading-6 font-medium sm:text-base sm:leading-7">
                  {t("text")}
                </p>
              </div>

              <div className="flex shrink-0 gap-3 max-sm:[&>a]:flex-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group font-heading bg-accent text-background hover:bg-accent-hover inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  {t("whatsapp")}
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group font-heading hover:border-accent hover:text-accent text-foreground inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <LinkedInIcon aria-hidden="true" className="size-4" />
                  {t("linkedin")}
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
