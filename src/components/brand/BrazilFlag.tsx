import { cn } from "@/lib/utils";

export function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 20"
      aria-hidden="true"
      className={cn("h-4 w-[1.4rem] overflow-hidden rounded-[2px]", className)}
    >
      <rect width="28" height="20" fill="#2d7d4d" />
      <path d="M14 2.4 25 10 14 17.6 3 10Z" fill="#e6c84f" />
      <circle cx="14" cy="10" r="4.3" fill="#31586f" />
      <path
        d="M10.2 9.2c2.7-.8 5.5-.4 7.8 1.1"
        fill="none"
        stroke="#f3f1eb"
        strokeWidth=".8"
      />
    </svg>
  );
}
