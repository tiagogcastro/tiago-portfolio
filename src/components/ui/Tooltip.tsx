"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TooltipProps = {
  label: string;
  content: string;
  children?: React.ReactNode;
  className?: string;
};

export function Tooltip({ label, content, children, className }: TooltipProps) {
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const cancelScheduledOpen = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  };

  const openWithDelay = () => {
    cancelScheduledOpen();
    openTimerRef.current = setTimeout(() => setIsOpen(true), 320);
  };

  useEffect(() => {
    if (!isOpen) return () => cancelScheduledOpen();

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      cancelScheduledOpen();
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <span
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={openWithDelay}
      onMouseLeave={() => {
        cancelScheduledOpen();
        if (!rootRef.current?.contains(document.activeElement)) setIsOpen(false);
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) {
          cancelScheduledOpen();
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          cancelScheduledOpen();
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-describedby={isOpen ? id : undefined}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        className="text-accent hover:text-accent-hover inline-flex min-h-8 cursor-default items-center text-left text-sm font-semibold"
      >
        {children}
      </button>
      <span
        id={id}
        role="tooltip"
        aria-hidden={!isOpen}
        className={cn(
          "bg-surface-soft text-foreground border-accent/35 absolute right-0 bottom-full z-50 mb-2 w-[min(19rem,calc(100vw-3rem))] border-t-2 p-4 text-left text-sm leading-6 font-normal shadow-2xl transition duration-200 ease-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-1 opacity-0",
        )}
      >
        {content}
      </span>
    </span>
  );
}
