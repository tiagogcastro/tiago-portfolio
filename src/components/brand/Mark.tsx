import { cn } from "@/lib/utils";

type MarkProps = React.ComponentProps<"svg">;

export function Mark({ className, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
      {...props}
    >
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="13"
        fill="var(--mineral-deep)"
        stroke="var(--mineral)"
        strokeWidth="2"
      />
      <path
        d="M8 18.5H38L38 25Q23 22 8 25ZM20.25 21.75H25.75V41L29.75 46H16.25L20.25 41Z"
        fill="var(--text)"
      />
      <path
        d="M57 23Q50 28 43 33M43 33Q50 38 57 43"
        stroke="var(--accent)"
        strokeWidth="7"
        strokeLinecap="round"
        className="transition-transform duration-300 ease-out [transform-box:fill-box] group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
      />
    </svg>
  );
}
