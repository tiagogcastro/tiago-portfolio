import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/projects", "metadata.pages.projects");
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsPage />;
}
