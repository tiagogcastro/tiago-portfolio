"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  FileDown,
  FolderKanban,
  Menu,
  Send,
  UserRound,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrazilFlag } from "../brand/BrazilFlag";
import { Logo } from "../brand/Logo";
import { GitHubIcon, LinkedInIcon } from "../brand/SocialIcons";
import { Container } from "./Container";

const navItems = [
  ["profile", "#perfil", UserRound],
  ["experience", "#experiencia", BriefcaseBusiness],
  ["projects", "#projetos", FolderKanban],
  ["contact", "#contato", Send],
] as const;

export function Header() {
  const t = useTranslations("header");
  const common = useTranslations("common");
  const accessibility = useTranslations("accessibility");
  const identity = useTranslations("identity");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background/90 fixed inset-x-0 top-0 z-40 border-b border-white/10 backdrop-blur-xl">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-5">
        <Logo name={identity("wordmark")} wordmark={identity("wordmark")} />

        <nav
          aria-label={t("navLabel")}
          className="hidden items-center gap-6 xl:flex"
        >
          {navItems.map(([key, href, Icon]) => (
            <a
              key={key}
              href={href}
              className="font-heading text-secondary hover:text-foreground flex items-center gap-2 text-xs font-medium tracking-wide transition-colors"
            >
              <Icon aria-hidden="true" className="size-3.5" />
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="group relative">
            <button
              type="button"
              className="mono-label text-foreground flex min-h-11 items-center gap-2 px-2"
              aria-label={t("languageLabel")}
            >
              <BrazilFlag />
              {t("languages.portuguese")}
            </button>
            <div className="bg-surface invisible absolute top-full right-0 w-36 border border-white/15 p-2 opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <span className="text-foreground block px-3 py-2 text-xs">
                {t("languages.portuguese")}
              </span>
              <span
                className="text-muted block cursor-not-allowed px-3 py-2 text-xs"
                aria-disabled="true"
              >
                {t("languages.english")} · {t("comingSoon")}
              </span>
              <span
                className="text-muted block cursor-not-allowed px-3 py-2 text-xs"
                aria-disabled="true"
              >
                {t("languages.spanish")} · {t("comingSoon")}
              </span>
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
            href={siteConfig.resume["pt-BR"]}
            download
          >
            <FileDown aria-hidden="true" className="size-3.5" />
            {common("downloadResume")}
          </a>
        </div>

        <button
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
        id="mobile-menu"
        className={cn(
          "bg-background absolute inset-x-0 top-full border-b border-white/10 px-5 transition-all xl:hidden",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav className="flex flex-col py-5" aria-label={t("navLabel")}>
          {navItems.map(([key, href, Icon]) => (
            <a
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-heading flex items-center gap-3 border-b border-white/10 py-4 text-xl"
            >
              <Icon aria-hidden="true" className="text-mineral size-5" />
              {t(key)}
            </a>
          ))}
          <div className="text-secondary flex flex-wrap gap-x-6 gap-y-3 pt-5 text-sm">
            <span className="text-foreground flex items-center gap-2">
              <BrazilFlag />
              {t("languages.portuguese")}
            </span>
            <span aria-disabled="true" className="text-muted">
              {t("languages.english")} · {t("comingSoon")}
            </span>
            <span aria-disabled="true" className="text-muted">
              {t("languages.spanish")} · {t("comingSoon")}
            </span>
          </div>
          <div className="flex flex-wrap gap-5 pt-5">
            <a
              className="flex items-center gap-2"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon aria-hidden="true" className="size-4" />
              {common("linkedin")}
            </a>
            <a
              className="flex items-center gap-2"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon aria-hidden="true" className="size-4" />
              {common("github")}
            </a>
            <a
              className="flex items-center gap-2"
              href={siteConfig.resume["pt-BR"]}
              download
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
