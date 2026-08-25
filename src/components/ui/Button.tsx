import { ArrowDown, ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "text";

export function buttonStyles(variant: ButtonVariant = "primary") {
  return cn(
    "group font-heading inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 px-5 py-3 text-sm font-semibold transition-colors",
    variant === "primary" && "bg-accent text-background hover:bg-accent-hover",
    variant === "outline" &&
      "text-foreground hover:border-accent hover:text-accent border border-white/25",
    variant === "text" && "text-foreground hover:text-accent px-0",
  );
}

type ButtonProps = React.ComponentProps<"a"> & {
  variant?: ButtonVariant;
  direction?: "right" | "down";
  icon?: LucideIcon;
  trailingIcon?: boolean;
};

export function Button({
  className,
  variant = "primary",
  direction = "right",
  icon,
  trailingIcon = true,
  children,
  ...props
}: ButtonProps) {
  const Icon = icon ?? (direction === "down" ? ArrowDown : ArrowRight);

  return (
    <a className={cn(buttonStyles(variant), className)} {...props}>
      {!trailingIcon ? <Icon aria-hidden="true" className="size-4" /> : null}
      {children}
      {trailingIcon ? (
        <Icon
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      ) : null}
    </a>
  );
}
