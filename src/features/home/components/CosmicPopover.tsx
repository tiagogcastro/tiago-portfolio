"use client";

import { X } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type CosmicPopoverProps = {
  anchor: RefObject<HTMLElement | null>;
  title: string;
  text: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

/** A small anchored disclosure: no backdrop, scroll lock or trapped focus. */
export function CosmicPopover({
  anchor,
  title,
  text,
  closeLabel,
  onClose,
  children,
}: CosmicPopoverProps) {
  const panel = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = panel.current;
    if (!element) return;
    const stage = element.parentElement!;
    const initialBounds = stage.getBoundingClientRect();
    const target = anchor.current?.isConnected
      ? anchor.current
      : stage.querySelector(".cosmic-navigation button:last-child");
    const rect = target?.getBoundingClientRect();

    // Capture the anchor once. The moving scene must not move the reading surface.
    const anchorLeft =
      ((rect?.left ?? initialBounds.left + 20) - initialBounds.left) /
      initialBounds.width;
    const anchorRight =
      ((rect?.right ?? initialBounds.left + 20) - initialBounds.left) /
      initialBounds.width;
    const anchorTop =
      ((rect?.top ?? initialBounds.top + 100) - initialBounds.top) /
      initialBounds.height;
    const placeRight =
      anchorRight * initialBounds.width + element.offsetWidth + 24 <
      initialBounds.width;

    const position = () => {
      const bounds = stage.getBoundingClientRect();
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const left = placeRight
        ? anchorRight * bounds.width + 12
        : anchorLeft * bounds.width - width - 12;
      const top = anchorTop * bounds.height;

      element.style.left = `${Math.round(Math.max(12, Math.min(left, bounds.width - width - 12)))}px`;
      element.style.top = `${Math.round(Math.max(90, Math.min(top, bounds.height - height - 80)))}px`;
    };

    position();
    const observer = new ResizeObserver(position);
    observer.observe(stage);
    observer.observe(element);
    return () => observer.disconnect();
  }, [anchor, title]);

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const outside = (event: PointerEvent) => {
      if (
        !element.contains(event.target as Node) &&
        !anchor.current?.contains(event.target as Node)
      )
        onClose();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (element.contains(document.activeElement)) anchor.current?.focus();
      onClose();
    };

    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [anchor, onClose]);

  return (
    <div
      ref={panel}
      id="cosmic-discovery"
      className="cosmic-discovery"
      role="region"
      aria-labelledby="cosmic-discovery-title"
    >
      <button
        type="button"
        className="cosmic-discovery-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <X size={16} aria-hidden="true" />
      </button>
      <h2 id="cosmic-discovery-title">{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}
