import { cn } from "@/lib/utils";

type WordmarkProps = React.ComponentProps<"svg"> & {
  label: string;
};

export function Wordmark({ label, className, ...props }: WordmarkProps) {
  return (
    <svg
      viewBox="0 0 260 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
      {...props}
    >
      <rect x="1" y="8" width="3" height="24" fill="var(--mineral)" />
      <text
        x="15"
        y="29"
        fill="currentColor"
        style={{ fontFamily: "var(--font-newsreader), serif" }}
        fontSize="23"
        fontWeight="600"
        letterSpacing="0.6"
      >
        {label}
      </text>
    </svg>
  );
}
