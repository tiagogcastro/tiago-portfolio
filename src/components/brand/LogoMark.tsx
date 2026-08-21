import { cn } from "@/lib/utils";

type LogoMarkProps = React.ComponentProps<"svg">;

export function LogoMark({ className, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 52 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-11", className)}
      {...props}
    >
      <path
        d="M3 5.5H30M16.5 5.5V35"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
      <path
        d="M48 10.5C44.8 6 40.2 3.8 34.2 3.8C23.6 3.8 16.5 10.5 16.5 20.2C16.5 29.6 23.6 36.2 34.2 36.2C40.3 36.2 44.9 33.9 48 29.3V22H36"
        stroke="var(--mineral)"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
