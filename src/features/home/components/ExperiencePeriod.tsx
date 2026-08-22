import { ExternalLink } from "@/components/ui/ExternalLink";

type ExperiencePeriodProps = {
  id?: string;
  label: string;
  company: string;
  role?: string;
  period: string;
  description: string;
  href: string;
  children: React.ReactNode;
  priority?: boolean;
};

export function ExperiencePeriod({
  id,
  label,
  company,
  role,
  period,
  description,
  href,
  children,
  priority,
}: ExperiencePeriodProps) {
  return (
    <article id={id} className="py-20 sm:py-28 lg:py-36">
      <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
        <div>
          <p className="mono-label text-accent leading-5 whitespace-pre-line">
            {label.split("\n").map((line, index) => (
              <span
                key={line}
                className={index > 0 ? "block font-bold" : "block"}
              >
                {line}
              </span>
            ))}
          </p>
          <p className="text-muted mt-5 font-mono text-xs">{period}</p>
        </div>
        <div>
          <h3>
            <ExternalLink
              href={href}
              className="font-display text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.88] font-semibold tracking-[-0.055em] no-underline hover:no-underline"
            >
              {company}
            </ExternalLink>
          </h3>
          {role ? (
            <p className="font-heading mt-6 text-xl font-semibold uppercase sm:text-2xl">
              {role}
            </p>
          ) : null}
          <p className="text-secondary mt-6 max-w-3xl text-xl leading-8 text-balance sm:text-2xl">
            {description}
          </p>
          {priority ? (
            <div className="from-accent mt-12 h-px w-full bg-gradient-to-r via-white/15 to-transparent" />
          ) : null}
        </div>
      </div>
      <div className="mt-16 lg:mt-24">{children}</div>
    </article>
  );
}
