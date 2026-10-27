"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type GalleryLabels = {
  open: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
};

type ImageGalleryProps = {
  images: readonly GalleryImage[];
  labels: GalleryLabels;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  compact?: boolean;
};

export function ImageGallery({
  images,
  labels,
  className,
  imageClassName,
  priority = false,
  compact = false,
}: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const image = images[active];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  useEffect(() => {
    if (!expanded || !hasMultiple) return;

    const navigate = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setActive(
        (current) => (current + direction + images.length) % images.length,
      );
    };

    document.addEventListener("keydown", navigate);
    return () => document.removeEventListener("keydown", navigate);
  }, [expanded, hasMultiple, images.length]);

  function move(direction: -1 | 1) {
    setActive(
      (current) => (current + direction + images.length) % images.length,
    );
  }

  function close() {
    setExpanded(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <div className={cn("group/gallery", className)}>
      <figure>
        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setExpanded(true)}
            className="bg-background hover:border-accent focus-visible:border-accent relative block w-full overflow-hidden border border-white/20 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_80px_color-mix(in_srgb,var(--accent)_12%,transparent)]"
            aria-label={`${labels.open}: ${image.alt}`}
          >
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={priority}
              className={cn(
                "animate-gallery-enter w-full object-cover object-top transition-transform duration-500 group-hover/gallery:scale-[1.012]",
                compact ? "aspect-[16/10]" : "aspect-[16/9]",
                imageClassName,
              )}
            />
            <span className="bg-background/75 text-accent absolute top-3 right-3 grid size-9 place-items-center border border-white/15 opacity-75 backdrop-blur-md transition-opacity group-hover/gallery:opacity-100">
              <Expand aria-hidden="true" className="size-3.5" />
              <span className="sr-only">{labels.open}</span>
            </span>
          </button>

          {hasMultiple ? (
            <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
              <button
                type="button"
                onClick={() => move(-1)}
                className="bg-background/80 hover:border-accent hover:text-accent pointer-events-auto grid size-10 place-items-center border border-white/15 backdrop-blur-md transition-colors"
                aria-label={labels.previous}
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="bg-background/80 hover:border-accent hover:text-accent pointer-events-auto grid size-10 place-items-center border border-white/15 backdrop-blur-md transition-colors"
                aria-label={labels.next}
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          ) : null}
        </div>

        <figcaption className="mt-2 flex h-10 items-start justify-between gap-4 overflow-hidden">
          <p className="text-muted line-clamp-2 max-w-[72ch] text-xs leading-5">
            {image.caption}
          </p>
          {hasMultiple ? (
            <span className="text-accent shrink-0 text-xs font-bold tracking-[0.1em]">
              {labels.counter
                .replace("{current}", String(active + 1))
                .replace("{total}", String(images.length))}
            </span>
          ) : null}
        </figcaption>
      </figure>

      <dialog
        ref={dialogRef}
        onClose={() => setExpanded(false)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="text-foreground m-auto h-[100dvh] w-screen max-w-none bg-transparent p-4 backdrop:bg-black/90 sm:p-8"
        aria-label={image.alt}
      >
        <div className="flex h-full flex-col">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-secondary line-clamp-1 text-sm">
              {image.caption}
            </p>
            <button
              type="button"
              onClick={close}
              className="bg-surface hover:border-accent hover:text-accent grid size-12 shrink-0 place-items-center border border-white/20 transition-colors"
              aria-label={labels.close}
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="animate-gallery-enter object-contain"
            />
          </div>

          {hasMultiple ? (
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                className="bg-surface hover:border-accent grid size-12 place-items-center border border-white/20"
                aria-label={labels.previous}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <span className="min-w-20 text-center text-sm font-semibold">
                {labels.counter
                  .replace("{current}", String(active + 1))
                  .replace("{total}", String(images.length))}
              </span>
              <button
                type="button"
                onClick={() => move(1)}
                className="bg-surface hover:border-accent grid size-12 place-items-center border border-white/20"
                aria-label={labels.next}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
