import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@/content/projects";
import { formatDateRange, formatMonthDate } from "@/lib/utils";

export async function formatProjectDates(
  project: Project,
): Promise<string | null> {
  if (!project.dates) return null;
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
  const parts: string[] = [];

  if (project.dates.created) {
    parts.push(
      project.dates.createdEnd
        ? formatDateRange(
            locale,
            project.dates.created,
            project.dates.createdEnd,
          )
        : `${formatMonthDate(locale, project.dates.created)} - ${t("common.current")}`,
    );
  }

  if (project.dates.restored) {
    parts.push(
      t("projects.dates.restored", {
        date: formatMonthDate(locale, project.dates.restored),
      }),
    );
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}
