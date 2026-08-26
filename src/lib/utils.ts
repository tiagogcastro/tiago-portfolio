import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthDate(locale: string, iso: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}-15T12:00:00Z`));
}

export function formatDateRange(
  locale: string,
  start: string,
  end: string,
): string {
  const startDate = new Date(`${start}-15T12:00:00Z`);
  const endDate = new Date(`${end}-15T12:00:00Z`);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const startLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  }).format(startDate);
  return `${startLabel} - ${formatMonthDate(locale, end)}`;
}
