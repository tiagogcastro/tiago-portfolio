import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div">;

export function Reveal({ className, children, ...props }: RevealProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
