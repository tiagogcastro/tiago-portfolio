import { Link } from "@/i18n/navigation";
import { Mark } from "./Mark";
import { Wordmark } from "./Wordmark";

type LogoProps = {
  name: string;
  wordmark: string;
};

export function Logo({ name, wordmark }: LogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={name}>
      <Mark className="size-9 shrink-0 transition-transform group-hover:-translate-y-0.5" />
      <Wordmark
        label={wordmark}
        className="text-foreground w-32 transition-transform group-hover:-translate-y-0.5 sm:w-36"
      />
    </Link>
  );
}
