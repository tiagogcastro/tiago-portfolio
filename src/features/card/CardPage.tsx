"use client";

import { track } from "@vercel/analytics";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CircuitBoard,
  Cloud,
  CodeXml,
  Database,
  Download,
  Globe2,
  LaptopMinimal,
  Mail,
  Network,
  QrCode,
  Share2,
  Terminal,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import QRCode from "qrcode";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  siGithub,
  siGithubactions,
  siDocker,
  siExpress,
  siGooglecloud,
  siGraphql,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siTerraform,
  siTiktok,
  siTypescript,
  siWhatsapp,
} from "simple-icons";
import { siteConfig, resumeHref } from "@/config/site";
import { cardProjectIds, projects } from "@/content/projects";
import { AwsLogo } from "@/components/brand/AwsLogo";
import { BrazilFlag } from "@/components/brand/BrazilFlag";
import { GlobalHitssLogo } from "@/components/brand/GlobalHitssLogo";
import { SpainFlag, USFlag } from "@/components/brand/LocaleFlags";
import { TerragruntLogo } from "@/components/brand/TerragruntLogo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type IconData = { path: string; hex: string; title: string };
function BrandIcon({
  icon,
  className = "size-5",
  color,
}: {
  icon: IconData;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={color ?? `#${icon.hex}`}
      viewBox="0 0 24 24"
    >
      <path d={icon.path} />
    </svg>
  );
}

type Technology = { key: string; name: string; icon: IconData | null };

function TechnologyBadge({ technology }: { technology: Technology }) {
  const { key, name, icon } = technology;
  return (
    <span className="bg-background/65 text-secondary inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-1.5 py-1 text-[11px] font-medium whitespace-nowrap">
      {icon ? (
        <BrandIcon
          icon={icon}
          className="size-3 shrink-0"
          color={
            ["next", "express", "prisma"].includes(key)
              ? "var(--text)"
              : undefined
          }
        />
      ) : key === "aws" ? (
        <span className="bg-paper grid size-3.5 shrink-0 place-items-center rounded-[2px]">
          <AwsLogo aria-hidden="true" className="h-2 w-3" />
        </span>
      ) : key === "terragrunt" ? (
        <TerragruntLogo aria-hidden="true" className="size-3.5 shrink-0" />
      ) : (
        <BrainCircuit
          aria-hidden="true"
          className="text-accent size-3 shrink-0"
        />
      )}
      {name}
    </span>
  );
}

const contacts = [
  {
    key: "linkedin",
    href: siteConfig.linkedin,
    icon: {
      path: "M5.34 3.3A2.34 2.34 0 1 1 .66 3.3a2.34 2.34 0 0 1 4.68 0ZM.94 7.2h4.8V22H.94V7.2Zm7.7 0h4.6v2.02h.06c.64-1.21 2.2-2.49 4.53-2.49 4.85 0 5.74 3.19 5.74 7.34V22h-4.79v-7.03c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V22H8.95V7.2h-.31Z",
      hex: "0A66C2",
      title: "LinkedIn",
    },
    priority: "primary",
  },
  {
    key: "whatsapp",
    href: siteConfig.whatsappUrl,
    icon: siWhatsapp,
    priority: "primary",
  },
  {
    key: "email",
    href: `mailto:${siteConfig.email}`,
    icon: null,
    priority: "secondary",
  },
  {
    key: "github",
    href: siteConfig.github,
    icon: siGithub,
    priority: "secondary",
  },
  {
    key: "tiktok",
    href: siteConfig.tiktok,
    icon: siTiktok,
    priority: "secondary",
  },
] as const;

const credentials = [
  { key: "degree", href: siteConfig.credentials.degree, kind: "degree" },
  {
    key: "cloud",
    href: siteConfig.credentials.awsCloudPractitioner,
    kind: "aws",
  },
  { key: "ai", href: siteConfig.credentials.awsAiPractitioner, kind: "aws" },
  {
    key: "serverless",
    href: siteConfig.credentials.awsServerless,
    kind: "aws",
  },
] as const;

const highlightedProjects = cardProjectIds.map((id) =>
  projects.find((project) => project.id === id)!,
);

const showcaseItems = [
  {
    kind: "experience" as const,
    key: "lakeit" as const,
    href: siteConfig.globalHitss,
  },
  {
    kind: "experience" as const,
    key: "futbuynow" as const,
    logo: "/brand/futbuynow.png",
    href: siteConfig.futbuynow,
  },
  ...highlightedProjects.map((project) => ({
    kind: "project" as const,
    key: project.id,
    project,
  })),
] as const;

function wrapTechnologyOffset(offset: number, width: number) {
  const wrapped = ((offset % width) + width) % width;
  return wrapped === 0 ? 0 : wrapped - width;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction * 72, opacity: 0.75 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: -direction * 72, opacity: 0.75 }),
};

const cardUrl = siteConfig.cardDomain;
const profileImageSrc = "/images/tiago-profile.webp";
const localeOptions = [
  { value: "pt-BR", key: "portuguese", Flag: BrazilFlag },
  { value: "en-US", key: "english", Flag: USFlag },
  { value: "es-ES", key: "spanish", Flag: SpainFlag },
] as const;

export function CardPage() {
  const t = useTranslations("card");
  const content = useTranslations();
  const languages = useTranslations("structuredData.languages");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [showcaseActive, setShowcaseActive] = useState(0);
  const [credentialDirection, setCredentialDirection] = useState(1);
  const [showcaseDirection, setShowcaseDirection] = useState(1);
  const [interacting, setInteracting] = useState(false);
  const [showcaseInteracting, setShowcaseInteracting] = useState(false);
  const [activeModal, setActiveModal] = useState<"qr" | "avatar" | null>(null);
  const [qrUrl, setQrUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const technologyTrackRef = useRef<HTMLDivElement>(null);
  const technologyOffsetRef = useRef(0);
  const technologyDragRef = useRef<{ pointerId: number; x: number } | null>(
    null,
  );
  const technologyResumeAtRef = useRef(0);
  const showcaseInitialDelayRef = useRef(true);
  const cardDragRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const cardOffsetX = useSpring(0, { stiffness: 220, damping: 12, mass: 0.75 });
  const cardOffsetY = useSpring(0, { stiffness: 220, damping: 12, mass: 0.75 });
  const cardRotate = useSpring(0, { stiffness: 180, damping: 13, mass: 0.75 });

  useEffect(() => {
    QRCode.toDataURL(cardUrl, {
      width: 680,
      margin: 4,
      errorCorrectionLevel: "H",
      color: { dark: "#142019", light: "#ffffff" },
    })
      .then(setQrUrl)
      .catch(() => setFeedback(t("error")));
  }, [t]);

  useEffect(() => {
    if (
      interacting ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setTimeout(() => {
      setCredentialDirection(1);
      setActive((current) => (current + 1) % credentials.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [active, interacting]);

  useEffect(() => {
    if (
      showcaseInteracting ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setTimeout(
      () => {
        showcaseInitialDelayRef.current = false;
        setShowcaseDirection(1);
        setShowcaseActive((current) => (current + 1) % showcaseItems.length);
      },
      showcaseInitialDelayRef.current ? 9000 : 7000,
    );
    return () => window.clearTimeout(timer);
  }, [showcaseActive, showcaseInteracting]);

  useEffect(() => {
    const track = technologyTrackRef.current;
    if (!track) return;
    let frame = 0;
    let previous = 0;
    const animate = (now: number) => {
      const group = track.firstElementChild as HTMLElement | null;
      const width = group?.getBoundingClientRect().width ?? 0;
      if (width) {
        if (
          !reduceMotion &&
          !technologyDragRef.current &&
          now >= technologyResumeAtRef.current &&
          previous
        ) {
          technologyOffsetRef.current -= Math.min(now - previous, 64) * 0.018;
        }
        technologyOffsetRef.current = wrapTechnologyOffset(
          technologyOffsetRef.current,
          width,
        );
        track.style.transform = `translate3d(${technologyOffsetRef.current}px, 0, 0)`;
      }
      previous = now;
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (!activeModal) return;
    const prior = document.activeElement as HTMLElement | null;
    const opener =
      activeModal === "qr" ? openButtonRef.current : avatarButtonRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModal(null);
      if (event.key !== "Tab" || !modalRef.current) return;
      const elements = [
        ...modalRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
      ];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      (opener ?? prior)?.focus();
    };
  }, [activeModal]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 4000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (!shareCopied) return;
    const timer = window.setTimeout(() => setShareCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [shareCopied]);

  function move(direction: number) {
    setCredentialDirection(direction);
    setActive(
      (current) =>
        (current + direction + credentials.length) % credentials.length,
    );
  }

  function moveShowcase(direction: number) {
    showcaseInitialDelayRef.current = false;
    setShowcaseDirection(direction);
    setShowcaseActive(
      (current) =>
        (current + direction + showcaseItems.length) % showcaseItems.length,
    );
  }

  function startTechnologyDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    technologyDragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
    };
    technologyResumeAtRef.current = Number.POSITIVE_INFINITY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function dragTechnology(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = technologyDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    technologyOffsetRef.current += event.clientX - drag.x;
    drag.x = event.clientX;
  }

  function finishTechnologyDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (technologyDragRef.current?.pointerId !== event.pointerId) return;
    technologyDragRef.current = null;
    technologyResumeAtRef.current = performance.now() + 900;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function startCardDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || (event.pointerType === "mouse" && event.button !== 0))
      return;
    cardDragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function dragCard(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = cardDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = Math.max(-26, Math.min(26, (event.clientX - drag.x) * 0.7));
    const maxDrop = window.innerHeight < 700 ? 22 : 36;
    const dy = Math.max(-12, Math.min(maxDrop, (event.clientY - drag.y) * 0.7));
    cardOffsetX.set(dx);
    cardOffsetY.set(dy);
    cardRotate.set(dx * 0.14);
  }

  function finishCardDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (cardDragRef.current?.pointerId !== event.pointerId) return;
    cardDragRef.current = null;
    cardOffsetX.set(0);
    cardOffsetY.set(0);
    cardRotate.set(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setFeedback(t("copied"));
      return true;
    } catch {
      setFeedback(t("error"));
      return false;
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: t("shareTitle"), url: cardUrl });
        track("card_share");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }
    if (await copyLink()) {
      setShareCopied(true);
      track("card_copy_link");
    }
  }

  async function saveImage() {
    if (!qrUrl) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.fillStyle = "#141815";
      ctx.fillRect(0, 0, 1080, 1920);
      ctx.strokeStyle = "#29362d";
      ctx.lineWidth = 1;
      for (let x = 0; x < 1080; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1920);
        ctx.stroke();
      }
      for (let y = 0; y < 1920; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1080, y);
        ctx.stroke();
      }
      ctx.fillStyle = "#1b211d";
      ctx.fillRect(70, 110, 940, 1700);
      ctx.strokeStyle = "#789987";
      ctx.strokeRect(70, 110, 940, 1700);
      ctx.fillStyle = "#26372e";
      ctx.beginPath();
      ctx.arc(540, 364, 114, 0, Math.PI * 2);
      ctx.fill();
      const photo = new window.Image();
      photo.src = profileImageSrc;
      await photo.decode();
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, 364, 114, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(photo, 426, 250, 228, 228);
      ctx.restore();
      ctx.strokeStyle = "#789987";
      ctx.beginPath();
      ctx.arc(540, 364, 114, 0, Math.PI * 2);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = "#f2f0e8";
      ctx.font = "bold 82px Georgia";
      ctx.fillText("Tiago Castro", 540, 610);
      ctx.fillStyle = "#a8bdae";
      ctx.font = "42px Arial";
      ctx.fillText(t("role"), 540, 680);
      const qr = new window.Image();
      qr.src = qrUrl;
      await qr.decode();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(190, 810, 700, 700);
      ctx.drawImage(qr, 200, 820, 680, 680);
      ctx.fillStyle = "#c9aa70";
      ctx.font = "34px Arial";
      ctx.fillText("contato.tiagogcastro.com.br", 540, 1610);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "tiago-castro-cartao-digital.png";
      link.click();
      setFeedback(t("saved"));
      track("card_qr_download");
    } catch {
      setFeedback(t("error"));
    }
  }

  const portfolioHref = `${siteConfig.domain}${locale === "pt-BR" ? "" : `/${locale}`}`;
  const cardLocaleHref = (value: string) =>
    value === "pt-BR" ? "/" : `/${value}`;
  const localCardHref = (value: string) =>
    value === "pt-BR" ? "/contato" : `/${value}/contato`;
  const isCardHost =
    typeof window !== "undefined" &&
    window.location.hostname === "contato.tiagogcastro.com.br";
  const current = credentials[active];
  const currentShowcase = showcaseItems[showcaseActive];
  const showcaseTitle =
    currentShowcase.kind === "experience"
      ? currentShowcase.key === "lakeit"
        ? t("experienceItems.lakeit.company")
        : content("experience.futbuynow.company")
      : content(`${currentShowcase.project.translationKey}.name`);
  const showcaseActionLabel = `${t(currentShowcase.kind === "experience" ? "visitExperience" : "viewProject")}: ${showcaseTitle}`;
  const CurrentFlag =
    localeOptions.find((item) => item.value === locale)?.Flag ?? BrazilFlag;
  const contactHref = (contact: (typeof contacts)[number]) => {
    if (contact.key === "whatsapp") {
      return `${contact.href}?text=${encodeURIComponent(t("contactMessage"))}`;
    }
    if (contact.key === "email") {
      return `${contact.href}?subject=${encodeURIComponent(t("emailSubject"))}&body=${encodeURIComponent(t("contactMessage"))}`;
    }
    return contact.href;
  };
  const technologies: Technology[] = [
    { key: "node", name: "Node.js", icon: siNodedotjs },
    { key: "typescript", name: "TypeScript", icon: siTypescript },
    { key: "react", name: "React", icon: siReact },
    { key: "aws", name: "AWS", icon: null },
    { key: "ai", name: t("ai"), icon: null },
    { key: "next", name: "Next.js", icon: siNextdotjs },
    { key: "terraform", name: "Terraform", icon: siTerraform },
    { key: "docker", name: "Docker", icon: siDocker },
    { key: "postgres", name: "PostgreSQL", icon: siPostgresql },
    { key: "gcp", name: "GCP", icon: siGooglecloud },
    { key: "redis", name: "Redis", icon: siRedis },
    { key: "mysql", name: "MySQL", icon: siMysql },
    { key: "terragrunt", name: "Terragrunt", icon: null },
    { key: "github-actions", name: "GitHub Actions", icon: siGithubactions },
    { key: "express", name: "Express", icon: siExpress },
    { key: "prisma", name: "Prisma", icon: siPrisma },
    { key: "python", name: "Python", icon: siPython },
    { key: "graphql", name: "GraphQL", icon: siGraphql },
  ];

  return (
    <main
      id="conteudo"
      className="card-grid grid min-h-dvh grid-cols-[minmax(0,1fr)] place-items-center px-3 pt-4 pb-8 sm:px-5 sm:pt-4 sm:pb-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="text-mineral absolute top-[8%] left-[7%] font-mono text-[clamp(3rem,10vw,8rem)] opacity-[0.065]">
          {"{ }"}
        </span>
        <CodeXml className="text-mineral absolute top-[25%] right-[7%] size-14 opacity-[0.065]" />
        <span className="text-accent absolute top-[44%] left-[4%] font-mono text-3xl opacity-[0.055] sm:text-5xl">
          {"</>"}
        </span>
        <Network className="text-mineral absolute top-[7%] right-[12%] size-10 opacity-[0.06] sm:size-14" />
        <CircuitBoard className="text-mineral absolute right-[4%] bottom-[37%] size-12 opacity-[0.06]" />
        <Terminal className="text-mineral absolute bottom-[23%] left-[10%] size-12 opacity-[0.07]" />
        <Database className="text-accent absolute bottom-[12%] left-[23%] size-9 opacity-[0.055] sm:size-12" />
        <Cloud className="text-mineral absolute right-[24%] bottom-[7%] size-11 opacity-[0.055] sm:size-14" />
        <LaptopMinimal className="text-accent absolute right-[8%] bottom-[9%] size-14 opacity-[0.06]" />
        <span className="text-mineral absolute top-[61%] right-[3%] hidden font-mono text-xs opacity-[0.075] sm:block">
          {"const build = () => deploy();"}
        </span>
      </div>
      <div className="card-entry relative z-10 mx-auto w-full max-w-[540px] min-w-0">
        <motion.div
          className="relative"
          style={{ x: cardOffsetX, y: cardOffsetY, rotate: cardRotate }}
        >
          <div aria-hidden="true" className="card-lanyard" />
          <div aria-hidden="true" className="card-clip" />
          <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {siteConfig.professionalAvailability && (
              <span className="border-mineral/50 bg-mineral-deep text-mineral-bright inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold whitespace-nowrap shadow-[0_4px_16px_#0005]">
                <span className="bg-mineral-bright size-1.5 shrink-0 rounded-full" />
                {t("availability")}
              </span>
            )}
            <Select
              value={locale}
              onValueChange={(value) =>
                window.location.assign(
                  isCardHost ? cardLocaleHref(value) : localCardHref(value),
                )
              }
            >
              <SelectTrigger
                aria-label={`${t("language")}: ${languages(localeOptions.find((item) => item.value === locale)?.key ?? "portuguese")}`}
                className="bg-mineral-deep border-mineral/50 flex h-7 w-10 shrink-0 items-center justify-center gap-0.5 rounded-md border shadow-[0_4px_16px_#0005]"
              >
                <CurrentFlag className="h-3.5 w-5" />
                <ChevronDown
                  aria-hidden="true"
                  className="text-muted size-2.5"
                />
              </SelectTrigger>
              <SelectContent>
                {localeOptions.map(({ value, key, Flag }) => (
                  <SelectItem key={value} value={value}>
                    <span className="inline-flex items-center gap-2">
                      <Flag />
                      {languages(key)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <section className="card-shell bg-surface/85 relative isolate rounded-2xl border border-white/10 px-[18px] pt-7 pb-4 shadow-[0_20px_80px_#0005] sm:px-5 sm:pt-7 sm:pb-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <CodeXml className="text-mineral absolute top-[12%] right-[6%] size-8 opacity-[0.09]" />
              <span className="text-accent absolute top-[33%] left-[3%] font-mono text-2xl opacity-[0.07]">
                {"{ }"}
              </span>
              <Terminal className="text-mineral absolute top-[52%] right-[3%] size-7 opacity-[0.08]" />
              <BrainCircuit className="text-mineral absolute bottom-[23%] left-[4%] size-8 opacity-[0.08]" />
              <Cloud className="text-accent absolute right-[5%] bottom-[6%] size-8 opacity-[0.07]" />
            </div>
            <div
              aria-hidden="true"
              className="card-edge-grip absolute inset-y-4 left-0 z-20 w-4 touch-none"
              onPointerDown={startCardDrag}
              onPointerMove={dragCard}
              onPointerUp={finishCardDrag}
              onPointerCancel={finishCardDrag}
              onLostPointerCapture={finishCardDrag}
            />
            <div
              aria-hidden="true"
              className="card-edge-grip absolute inset-y-4 right-0 z-20 w-4 touch-none"
              onPointerDown={startCardDrag}
              onPointerMove={dragCard}
              onPointerUp={finishCardDrag}
              onPointerCancel={finishCardDrag}
              onLostPointerCapture={finishCardDrag}
            />
            <div
              aria-hidden="true"
              className="card-edge-grip card-bottom-grip absolute inset-x-4 bottom-0 z-20 h-4 touch-none"
              onPointerDown={startCardDrag}
              onPointerMove={dragCard}
              onPointerUp={finishCardDrag}
              onPointerCancel={finishCardDrag}
              onLostPointerCapture={finishCardDrag}
            />
            <div className="flex items-center justify-center gap-[18px]">
              <button
                ref={avatarButtonRef}
                type="button"
                onClick={() => setActiveModal("avatar")}
                aria-label={t("openAvatar")}
                className="border-mineral/50 bg-mineral-deep relative size-[76px] shrink-0 overflow-hidden rounded-full border shadow-[0_0_24px_#78998733] sm:size-[84px]"
              >
                <Image
                  src={profileImageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 84px, 76px"
                  className="object-cover"
                />
              </button>
              <div className="min-w-0">
                <p className="font-display text-[clamp(1.65rem,7vw,2.15rem)] leading-none font-semibold tracking-tight max-[350px]:text-2xl">
                  Tiago <span className="text-accent">Castro</span>
                </p>
                <p className="text-mineral-bright mt-1.5 text-xs sm:text-sm">
                  {t("role")}
                </p>
              </div>
            </div>
            <div
              tabIndex={0}
              aria-label={t("technologies")}
              onPointerDown={startTechnologyDrag}
              onPointerMove={dragTechnology}
              onPointerUp={finishTechnologyDrag}
              onPointerCancel={finishTechnologyDrag}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                  return;
                event.preventDefault();
                technologyOffsetRef.current +=
                  event.key === "ArrowLeft" ? 80 : -80;
                technologyResumeAtRef.current = performance.now() + 1200;
              }}
              onDragStart={(event) => event.preventDefault()}
              className="card-tech-viewport mt-4 min-w-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
            >
              <div ref={technologyTrackRef} className="card-tech-track">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1 ? true : undefined}
                    className="flex shrink-0 gap-1 pr-1"
                  >
                    {technologies.map((technology) => (
                      <TechnologyBadge
                        key={technology.key}
                        technology={technology}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <h2 className="font-heading text-base font-semibold max-[350px]:text-sm">
                {t("connect")}
              </h2>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  ref={openButtonRef}
                  type="button"
                  onClick={() => {
                    setActiveModal("qr");
                    track("card_qr_open");
                  }}
                  aria-label={t("openQr")}
                  className="bg-background grid size-7 place-items-center rounded-md border border-white/15"
                >
                  <QrCode className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={share}
                  aria-label={t("share")}
                  className="text-accent border-accent/30 hover:bg-accent/10 grid size-7 place-items-center rounded-md border"
                >
                  {shareCopied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Share2 className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {contacts
                .filter((item) => item.priority === "primary")
                .map((item) => (
                  <a
                    key={item.key}
                    href={contactHref(item)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("card_contact", { channel: item.key })}
                    className="bg-mineral-deep border-mineral/40 hover:border-mineral-bright flex min-h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold"
                  >
                    <BrandIcon icon={item.icon} />
                    {t(`contacts.${item.key}`)}
                  </a>
                ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {contacts
                .filter((item) => item.priority === "secondary")
                .map((item) => (
                  <a
                    key={item.key}
                    href={contactHref(item)}
                    target={item.key === "email" ? undefined : "_blank"}
                    rel={item.key === "email" ? undefined : "noreferrer"}
                    onClick={() => track("card_contact", { channel: item.key })}
                    className="bg-background hover:border-accent/60 flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/15 text-xs sm:text-sm"
                  >
                    {item.icon ? (
                      <BrandIcon
                        icon={item.icon}
                        className="size-4"
                        color={
                          item.key === "github" || item.key === "tiktok"
                            ? "var(--text)"
                            : undefined
                        }
                      />
                    ) : (
                      <Mail className="text-accent size-4" />
                    )}
                    {t(`contacts.${item.key}`)}
                  </a>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <h2 className="font-heading text-base font-semibold max-[350px]:text-[15px]">
                {t("credentials")}
              </h2>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={t("previous")}
                  className="grid size-7 place-items-center rounded-md border border-white/15"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={t("next")}
                  className="grid size-7 place-items-center rounded-md border border-white/15"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
            <div
              className="mt-2"
              onMouseEnter={() => setInteracting(true)}
              onMouseLeave={() => setInteracting(false)}
              onFocusCapture={() => setInteracting(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setInteracting(false);
              }}
            >
              <div className="relative h-[82px] overflow-hidden rounded-lg max-[350px]:h-[92px]">
                <AnimatePresence initial={false} custom={credentialDirection}>
                  <motion.article
                    key={current.key}
                    custom={credentialDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: reduceMotion ? 0 : 0.28,
                      ease: "easeOut",
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragStart={() => setInteracting(true)}
                    onDragEnd={(_, info) => {
                      if (
                        Math.abs(info.offset.x) > 45 ||
                        Math.abs(info.velocity.x) > 350
                      )
                        move(info.offset.x < 0 ? 1 : -1);
                      setInteracting(false);
                    }}
                    className="bg-background/65 absolute inset-0 grid touch-pan-y grid-cols-[32px_minmax(0,1fr)] content-start items-start gap-2.5 rounded-lg border border-white/15 pt-2 pr-3 pb-1.5 pl-[14px] select-none"
                  >
                    <div className="bg-paper grid size-8 shrink-0 place-items-center self-start rounded-md p-1">
                      {current.kind === "aws" ? (
                        <AwsLogo
                          role="img"
                          aria-label="AWS"
                          className="block h-auto w-full"
                        />
                      ) : (
                        <CodeXml
                          aria-hidden="true"
                          className="text-mineral-deep size-5"
                          strokeWidth={1.8}
                        />
                      )}
                    </div>
                    <div className="min-w-0 pr-5">
                      <h3 className="font-heading pr-2 text-[12px] leading-[1.15] font-semibold sm:text-[13px]">
                        {t(`items.${current.key}.title`)}
                      </h3>
                      <p className="text-secondary mt-0.5 text-[10.5px] leading-tight">
                        {t(`items.${current.key}.issuer`)}
                        <span className="text-muted whitespace-nowrap">
                          {" · "}
                          {t(`items.${current.key}.date`)}
                        </span>
                      </p>
                      <p className="text-muted mt-0.5 text-[10.5px] leading-tight">
                        {t(`items.${current.key}.detail`)}
                      </p>
                    </div>
                    <a
                      href={current.href}
                      target="_blank"
                      rel="noreferrer"
                      title={`${t("verify")}: ${t(`items.${current.key}.title`)}`}
                      aria-label={`${t("verify")}: ${t(`items.${current.key}.title`)}`}
                      onClick={() =>
                        track("card_credential", { credential: current.key })
                      }
                      className="text-accent absolute top-1 right-1 grid size-9 place-items-center rounded-md hover:bg-white/10"
                    >
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </motion.article>
                </AnimatePresence>
              </div>
              <div className="mt-2.5 flex items-center justify-center gap-2">
                {credentials.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      showcaseInitialDelayRef.current = false;
                      const distance =
                        (index - active + credentials.length) %
                        credentials.length;
                      setCredentialDirection(
                        distance <= credentials.length / 2 ? 1 : -1,
                      );
                      setActive(index);
                    }}
                    aria-label={t("goTo", { number: index + 1 })}
                    aria-current={index === active ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${index === active ? "bg-accent w-5" : "w-1.5 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <h2 className="font-heading text-base font-semibold max-[350px]:text-[15px]">
                {t("featuredProjects")}
              </h2>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveShowcase(-1)}
                  aria-label={t("previousShowcase")}
                  className="grid size-7 place-items-center rounded-md border border-white/15"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveShowcase(1)}
                  aria-label={t("nextShowcase")}
                  className="grid size-7 place-items-center rounded-md border border-white/15"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
            <div
              className="mt-2"
              onMouseEnter={() => setShowcaseInteracting(true)}
              onMouseLeave={() => setShowcaseInteracting(false)}
              onFocusCapture={() => setShowcaseInteracting(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setShowcaseInteracting(false);
              }}
            >
              <div className="relative h-[82px] overflow-hidden rounded-lg max-[350px]:h-[92px]">
                <AnimatePresence initial={false} custom={showcaseDirection}>
                  <motion.article
                    key={currentShowcase.key}
                    custom={showcaseDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: reduceMotion ? 0 : 0.28,
                      ease: "easeOut",
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragStart={() => setShowcaseInteracting(true)}
                    onDragEnd={(_, info) => {
                      if (
                        Math.abs(info.offset.x) > 45 ||
                        Math.abs(info.velocity.x) > 350
                      )
                        moveShowcase(info.offset.x < 0 ? 1 : -1);
                      setShowcaseInteracting(false);
                    }}
                    className="bg-background/65 absolute inset-0 grid touch-pan-y grid-cols-[32px_minmax(0,1fr)] content-start items-start gap-2.5 rounded-lg border border-white/15 pt-2 pr-3 pb-1.5 pl-[14px] select-none"
                  >
                    {currentShowcase.kind === "experience" ? (
                      <>
                        <span className="bg-paper grid size-8 place-items-center self-start rounded-md p-0.5">
                          {currentShowcase.key === "lakeit" ? (
                            <GlobalHitssLogo
                              role="img"
                              aria-label={t("experienceItems.lakeit.logoAlt")}
                              className="size-7"
                            />
                          ) : (
                            <Image
                              src={currentShowcase.logo}
                              alt={t("experienceItems.futbuynow.logoAlt")}
                              width={28}
                              height={28}
                              className="size-7 object-contain"
                            />
                          )}
                        </span>
                        <div className="min-w-0 pr-5">
                          <h3 className="font-heading flex flex-wrap items-baseline gap-x-1.5 pr-2 text-xs leading-tight font-semibold">
                            {showcaseTitle}
                            <span className="text-muted text-[10px] font-normal whitespace-nowrap">
                              {content(
                                `experience.${currentShowcase.key}.period`,
                              )}
                            </span>
                          </h3>
                          <p className="text-secondary mt-0.5 text-[10.5px] leading-tight">
                            {currentShowcase.key === "lakeit"
                              ? content("experience.lakeit.role")
                              : t("experienceItems.futbuynow.role")}
                          </p>
                          <p className="text-muted mt-0.5 line-clamp-2 text-[10.5px] leading-tight">
                            {t(
                              `experienceItems.${currentShowcase.key}.description`,
                            )}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {currentShowcase.project.cover && (
                          <Image
                            src={currentShowcase.project.cover.src}
                            alt=""
                            width={32}
                            height={32}
                            className="size-8 self-start rounded-md object-cover object-top"
                          />
                        )}
                        <div className="min-w-0 pr-5">
                          <h3 className="font-heading pr-2 text-xs leading-tight font-semibold">
                            {showcaseTitle}
                          </h3>
                          <p className="text-muted mt-0.5 line-clamp-2 text-[10.5px] leading-tight">
                            {t(
                              `projectItems.${currentShowcase.project.id}.description`,
                            )}
                          </p>
                        </div>
                      </>
                    )}
                    <a
                      href={
                        currentShowcase.kind === "experience"
                          ? currentShowcase.href
                          : currentShowcase.project.links[0]?.href
                      }
                      target="_blank"
                      rel="noreferrer"
                      title={showcaseActionLabel}
                      aria-label={showcaseActionLabel}
                      onClick={() =>
                        track(
                          currentShowcase.kind === "experience"
                            ? "card_experience"
                            : "card_project",
                          { item: currentShowcase.key },
                        )
                      }
                      className="text-accent absolute top-1 right-1 grid size-9 place-items-center rounded-md hover:bg-white/10"
                    >
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </motion.article>
                </AnimatePresence>
              </div>
              <div className="mt-2.5 flex items-center justify-center gap-2">
                {showcaseItems.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      const distance =
                        (index - showcaseActive + showcaseItems.length) %
                        showcaseItems.length;
                      setShowcaseDirection(
                        distance <= showcaseItems.length / 2 ? 1 : -1,
                      );
                      setShowcaseActive(index);
                    }}
                    aria-label={t("goToShowcase", { number: index + 1 })}
                    aria-current={index === showcaseActive ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${index === showcaseActive ? "bg-accent w-5" : "w-1.5 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <a
                href={resumeHref(locale)}
                download
                onClick={() => track("card_resume_download", { locale })}
                className="bg-accent text-background flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-lg px-1.5 text-center text-xs font-bold whitespace-nowrap max-[350px]:gap-1 max-[350px]:text-[11px] sm:text-sm"
              >
                <Download className="size-4 shrink-0" />
                {t("resume")}
              </a>
              <a
                href={portfolioHref}
                onClick={() => track("card_portfolio_open", { locale })}
                className="border-accent/50 text-accent flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-lg border px-1.5 text-center text-xs font-bold whitespace-nowrap max-[350px]:gap-1 max-[350px]:text-[11px] sm:text-sm"
              >
                <Globe2 className="size-4 shrink-0" />
                {t("portfolio")}
              </a>
            </div>
            {locale === "es-ES" && (
              <p className="text-muted mt-2 text-center text-xs">
                {t("resumeEnglish")}
              </p>
            )}
          </section>
        </motion.div>
      </div>
      {activeModal === "qr" && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-3 py-8 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveModal(null);
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("qrTitle")}
            tabIndex={-1}
            className="bg-surface border-mineral/40 relative w-full max-w-[390px] rounded-2xl border text-center shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label={t("close")}
              className="absolute top-2 left-2 z-10 grid size-10 place-items-center"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div
              role="img"
              aria-label={t("photoAlt")}
              className="border-mineral/50 bg-mineral-deep absolute -top-6 left-1/2 z-10 size-[76px] -translate-x-1/2 overflow-hidden rounded-full border shadow-[0_0_24px_#78998733]"
            >
              <Image
                src={profileImageSrc}
                alt=""
                fill
                sizes="76px"
                className="object-cover"
              />
            </div>
            <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pt-16 pb-4 sm:px-6 sm:pb-6">
              <h2 className="font-display text-[clamp(1.65rem,7vw,2.15rem)] leading-none font-semibold tracking-tight">
                Tiago <span className="text-accent">Castro</span>
              </h2>
              <p className="text-mineral-bright mt-1 text-xs sm:text-sm">
                {t("role")}
              </p>
              {qrUrl && (
                <Image
                  src={qrUrl}
                  alt={t("qrAlt")}
                  width={240}
                  height={240}
                  unoptimized
                  className="mx-auto mt-2.5 aspect-square w-full max-w-[240px] rounded-lg bg-white"
                />
              )}
              <p className="mt-2.5 text-sm font-semibold">{t("scan")}</p>
              <p className="text-muted mt-1 text-xs">
                contato.tiagogcastro.com.br
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={saveImage}
                  disabled={!qrUrl}
                  className="bg-accent text-background flex min-h-11 items-center justify-center gap-1.5 rounded-lg text-xs font-bold"
                >
                  <Download className="size-4" />
                  {t("save")}
                </button>
                <button
                  type="button"
                  onClick={copyLink}
                  className="border-accent/50 text-accent flex min-h-11 items-center justify-center gap-1.5 rounded-lg border text-xs font-bold"
                >
                  <Check className="size-4" />
                  {t("copy")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {activeModal === "avatar" && (
          <motion.div
            key="avatar-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveModal(null);
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("avatarTitle")}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: "easeOut",
              }}
              className="border-mineral/50 bg-mineral-deep relative aspect-square w-[min(82vw,58dvh,420px)] overflow-hidden rounded-full border shadow-[0_20px_70px_#0009] outline-none"
            >
              <Image
                src={profileImageSrc}
                alt={t("photoAlt")}
                fill
                sizes="(min-width: 640px) 420px, 82vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label={t("closeAvatar")}
                className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-black/50 text-white"
              >
                <ArrowLeft className="size-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {feedback && (
        <div
          role="status"
          className="bg-mineral-deep text-foreground fixed right-4 bottom-4 z-[60] rounded-lg border border-white/20 px-4 py-2 text-sm"
          onClick={() => setFeedback("")}
        >
          {feedback}
        </div>
      )}
    </main>
  );
}
