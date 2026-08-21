import { Wordmark } from "./Wordmark";

type LogoProps = {
  name: string;
  wordmark: string;
};

export function Logo({ name, wordmark }: LogoProps) {
  return (
    <a
      href="#top"
      className="group block w-[10.5rem] sm:w-[12.5rem]"
      aria-label={name}
    >
      <Wordmark
        label={wordmark}
        className="text-foreground transition-transform group-hover:-translate-y-0.5"
      />
    </a>
  );
}
