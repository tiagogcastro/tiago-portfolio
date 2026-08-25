import Image from "next/image";
import { Reveal } from "@/components/visual/Reveal";

type CaseFigureProps = {
  src: string;
  title: string;
  caption: string;
};

export function CaseFigure({ src, title, caption }: CaseFigureProps) {
  return (
    <Reveal className="bg-surface-soft mt-12 border border-white/15">
      <figure className="p-7 sm:p-10">
        <div className="bg-background border-accent/30 flex items-center justify-center border p-6 sm:p-10">
          <Image
            src={src}
            alt=""
            width={920}
            height={520}
            sizes="(max-width: 1536px) 100vw, 1296px"
            className="h-auto w-full max-w-3xl"
          />
        </div>
        <figcaption className="mt-6">
          <p className="font-display text-2xl leading-tight font-semibold sm:text-3xl">
            {title}
          </p>
          <p className="text-muted mt-3 max-w-[75ch] font-mono text-sm leading-6">
            {caption}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}
