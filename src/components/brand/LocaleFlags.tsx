import { cn } from "@/lib/utils";

export function USFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 20"
      aria-hidden="true"
      className={cn("h-4 w-[1.4rem] overflow-hidden rounded-[2px]", className)}
    >
      <rect width="28" height="20" fill="#f3f1eb" />
      {[0, 2, 4, 6, 8].map((row) => (
        <rect
          key={row}
          y={row * 2.22 + 1.54}
          width="28"
          height="1.54"
          fill="#b8443c"
        />
      ))}
      <rect width="12" height="10.8" fill="#31586f" />
      {[1.6, 4.2, 6.8, 9.4].map((x) =>
        [1.8, 4.5, 7.2, 9].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.75" fill="#f3f1eb" />
        )),
      )}
    </svg>
  );
}

export function SpainFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 20"
      aria-hidden="true"
      className={cn("h-4 w-[1.4rem] overflow-hidden rounded-[2px]", className)}
    >
      <rect width="28" height="20" fill="#c53f38" />
      <rect y="5" width="28" height="10" fill="#e6c84f" />
      <rect x="5.5" y="8.2" width="3.4" height="3.6" rx="0.6" fill="#c53f38" />
    </svg>
  );
}
