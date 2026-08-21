import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}
