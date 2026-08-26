import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Mark } from "./Mark";
import { Wordmark } from "./Wordmark";

type LogoProps = {
  name: string;
  wordmark: string;
  variant?: "mark" | "lockup";
  size?: "header" | "hero";
  linked?: boolean;
  className?: string;
};

export function Logo({
  name,
  wordmark,
  variant = "lockup",
  size = "header",
  linked = true,
  className,
}: LogoProps) {
  const content = (
    <span
      className={cn(
        "group flex items-center",
        size === "hero" ? "gap-4 sm:gap-5" : "gap-3",
        className,
      )}
    >
      <Mark
        className={cn(
          "shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[4deg] motion-reduce:transform-none motion-reduce:transition-none",
          size === "hero" ? "size-16 sm:size-20 lg:size-24" : "size-9",
        )}
      />
      {variant === "lockup" ? (
        <Wordmark
          label={wordmark}
          className={cn(
            "text-foreground",
            size === "hero"
              ? "w-[min(68vw,20rem)] sm:w-96 lg:w-[30rem]"
              : "w-32 sm:w-36",
          )}
        />
      ) : null}
      {!linked ? <span className="sr-only">{name}</span> : null}
    </span>
  );

  return linked ? (
    <Link href="/" aria-label={name}>
      {content}
    </Link>
  ) : (
    content
  );
}
