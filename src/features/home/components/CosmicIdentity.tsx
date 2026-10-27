import { Logo } from "@/components/brand/Logo";

export function CosmicIdentity({ name }: { name: string }) {
  return (
    <div className="cosmic-identity">
      <Logo name={name} wordmark={name} variant="mark" linked={false} />
      <span>{name}</span>
    </div>
  );
}
