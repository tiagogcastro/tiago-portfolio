import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import {
  siDatefns,
  siDocker,
  siExpress,
  siGithubactions,
  siGraphql,
  siModelcontextprotocol,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPaypal,
  siPrisma,
  siPython,
  siReact,
  siStripe,
  siTerraform,
  siTypescript,
  siVite,
  siVitest,
  siZod,
} from "simple-icons/icons";
import { cn } from "@/lib/utils";

type TechnologyChipsProps = {
  technologies: readonly string[];
  className?: string;
};

function technologyIcon(technology: string): SimpleIcon | "aws" | null {
  const name = technology.toLowerCase();

  if (/aws|amazon|glue|\becs\b/.test(name)) return "aws";
  if (/github actions/.test(name)) return siGithubactions;
  if (/node/.test(name)) return siNodedotjs;
  if (/typescript/.test(name)) return siTypescript;
  if (/react/.test(name)) return siReact;
  if (/next/.test(name)) return siNextdotjs;
  if (/express/.test(name)) return siExpress;
  if (/nestjs/.test(name)) return siNestjs;
  if (/graphql/.test(name)) return siGraphql;
  if (/prisma/.test(name)) return siPrisma;
  if (/python/.test(name)) return siPython;
  if (/terraform/.test(name) && !/terragrunt/.test(name)) return siTerraform;
  if (/docker/.test(name)) return siDocker;
  if (/vite(?!st)/.test(name)) return siVite;
  if (/vitest/.test(name)) return siVitest;
  if (/stripe/.test(name)) return siStripe;
  if (/paypal/.test(name)) return siPaypal;
  if (/zod/.test(name)) return siZod;
  if (/date-fns/.test(name)) return siDatefns;
  if (/\bmcp\b/.test(name)) return siModelcontextprotocol;

  return null;
}

function TechnologyIcon({ technology }: { technology: string }) {
  const icon = technologyIcon(technology);

  if (!icon) return null;

  if (icon === "aws") {
    return (
      <span className="bg-paper grid size-5 shrink-0 place-items-center rounded-sm p-0.5">
        <Image src="/brand/aws.svg" alt="" width={18} height={11} />
      </span>
    );
  }

  return (
    <span className="bg-paper grid size-5 shrink-0 place-items-center rounded-sm p-1">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-3.5"
        style={{ color: `#${icon.hex}` }}
      >
        <path fill="currentColor" d={icon.path} />
      </svg>
    </span>
  );
}

export function TechnologyChips({
  technologies,
  className,
}: TechnologyChipsProps) {
  return (
    <div
      className={cn(
        "flex max-w-full min-w-0 [scrollbar-width:none] flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {technologies.map((technology) => (
        <span
          key={technology}
          className="bg-background/70 text-secondary inline-flex shrink-0 items-center gap-2 border border-white/15 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap"
        >
          <TechnologyIcon technology={technology} />
          {technology}
        </span>
      ))}
    </div>
  );
}
