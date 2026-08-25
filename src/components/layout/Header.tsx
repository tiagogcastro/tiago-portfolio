"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig, resumeHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "../brand/Logo";
import { GitHubIcon, LinkedInIcon } from "../brand/SocialIcons";
import { BrazilFlag } from "../brand/BrazilFlag";
import { SpainFlag, USFlag } from "../brand/LocaleFlags";
import { Container } from "./Container";

const localeLabels = {
  "pt-BR": "languages.portuguese",
  "en-US": "languages.english",
  "es-ES": "languages.spanish",
} as const;

const localeFlags = {
  "pt-BR": BrazilFlag,
  "en-US": USFlag,
  "es-ES": SpainFlag,
} as const;

export function Header() {
  const t = useTranslations("header");
  const common = useTranslations("common");
  const accessibility = useTranslations("accessibility");
  const identity = useTranslations("identity");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const navItems = [
    { key: "experience", kind: "route", href: "/experience" },
    { key: "projects", kind: "route", href: "/projects" },
    {
      key: "profile",
      kind: "anchor",
      href: isHome ? "#perfil" : { pathname: "/", hash: "perfil" },
    },
    {
      key: "contact",
      kind: "anchor",
      href: isHome ? "#contato" : { pathname: "/", hash: "contato" },
    },
  ] as const;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !menuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <header className="bg-background/90 fixed inset-x-0 top-0 z-40 border-b border-white/10 backdrop-blur-xl">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-5">
        <Logo name={identity("wordmark")} wordmark={identity("wordmark")} />

        <nav
          aria-label={t("navLabel")}
          className="hidden items-center gap-6 xl:flex"
        >
          {navItems.map((item) =>
            typeof item.href === "string" && item.href.startsWith("#") ? (
              <a
                key={item.key}
                href={item.href}
                className="font-heading text-secondary hover:text-foreground text-xs font-medium tracking-wide transition-colors"
              >
                {t(item.key)}
              </a>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="font-heading text-secondary hover:text-foreground text-xs font-medium tracking-wide transition-colors"
              >
                {t(item.key)}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <div className="group relative">
            <button
              type="button"
              className="mono-label text-foreground flex min-h-11 items-center gap-2 px-2"
              aria-label={t("languageLabel")}
              aria-haspopup="true"
            >
              {(() => {
                const Flag = localeFlags[locale as keyof typeof localeFlags];
                return <Flag />;
              })()}
              {t(localeLabels[locale as keyof typeof localeLabels])}
            </button>
            <div className="bg-surface invisible absolute top-full right-0 w-40 border border-white/15 p-2 opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {routing.locales.map((item) => {
                const Flag = localeFlags[item as keyof typeof localeFlags];

                return (
                  <Link
                    key={item}
                    href={pathname}
                    locale={item}
                    className={cn(
                      "hover:text-accent flex items-center justify-between gap-2 px-3 py-2 text-xs transition-colors",
                      item === locale ? "text-accent" : "text-secondary",
                    )}
                    aria-current={item === locale ? "true" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <Flag />
                      {t(localeLabels[item as keyof typeof localeLabels])}
                    </span>
                    {item === locale ? (
                      <Check aria-hidden="true" className="size-3.5" />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
          <a
            className="mono-label text-secondary hover:text-accent flex items-center gap-1.5"
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon aria-hidden="true" className="size-3.5" />
            {common("linkedin")}
          </a>
          <a
            className="mono-label text-secondary hover:text-accent flex items-center gap-1.5"
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon aria-hidden="true" className="size-3.5" />
            {common("github")}
          </a>
          <a
            className="mono-label text-secondary hover:text-accent flex items-center gap-1.5 border-l border-white/15 pl-4"
            href={resumeHref(locale)}
            download
          >
            <FileDown aria-hidden="true" className="size-3.5" />
            {common("downloadResume")}
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="grid size-11 place-items-center xl:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={
            isOpen ? accessibility("closeMenu") : accessibility("openMenu")
          }
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={cn(
          "bg-background absolute inset-x-0 top-full border-b border-white/10 px-5 transition-all xl:hidden",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav className="flex flex-col py-5" aria-label={t("navLabel")}>
          {navItems.map((item) =>
            typeof item.href === "string" && item.href.startsWith("#") ? (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-heading border-b border-white/10 py-4 text-xl"
              >
                {t(item.key)}
              </a>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-heading border-b border-white/10 py-4 text-xl"
              >
                {t(item.key)}
              </Link>
            ),
          )}
          <div className="text-secondary flex flex-wrap gap-x-6 gap-y-3 pt-5 text-sm">
            {routing.locales.map((item) => {
              const Flag = localeFlags[item as keyof typeof localeFlags];

              return (
                <Link
                  key={item}
                  href={pathname}
                  locale={item}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "hover:text-accent flex items-center gap-2 transition-colors",
                    item === locale && "text-foreground",
                  )}
                  aria-current={item === locale ? "true" : undefined}
                >
                  <Flag />
                  {t(localeLabels[item as keyof typeof localeLabels])}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-5 pt-5">
            <a
              className="flex items-center gap-2"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <LinkedInIcon aria-hidden="true" className="size-4" />
              {common("linkedin")}
            </a>
            <a
              className="flex items-center gap-2"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <GitHubIcon aria-hidden="true" className="size-4" />
              {common("github")}
            </a>
            <a
              className="flex items-center gap-2"
              href={resumeHref(locale)}
              download
              onClick={() => setIsOpen(false)}
            >
              <FileDown aria-hidden="true" className="size-4" />
              {common("downloadResume")}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
