import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types/icons";

type ExternalLinkProps = React.ComponentProps<"a"> & {
  showIcon?: boolean;
  icon?: IconComponent;
};

export function ExternalLink({
  className,
  children,
  showIcon = true,
  icon: LeadingIcon,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group hover:text-accent inline-flex cursor-pointer items-center gap-1.5 underline-offset-4 transition-colors hover:underline",
        className,
      )}
      {...props}
    >
      {LeadingIcon ? (
        <LeadingIcon aria-hidden="true" className="size-4" />
      ) : null}
      {children}
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </a>
  );
}
