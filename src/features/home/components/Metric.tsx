import { cn } from "@/lib/utils";

type MetricProps = {
  value: string;
  label: string;
  period?: string;
  accent?: boolean;
  className?: string;
};

export function Metric({
  value,
  label,
  period,
  accent,
  className,
}: MetricProps) {
  return (
    <div className={cn("border-t border-current/20 pt-4", className)}>
      <p
        className={cn(
          "font-display text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl",
          accent && "text-mineral",
        )}
      >
        {value}
      </p>
      <p className="mt-3 text-sm font-semibold">{label}</p>
      {period ? (
        <p className="mt-1 font-mono text-[0.68rem] text-current/55 uppercase">
          {period}
        </p>
      ) : null}
    </div>
  );
}
