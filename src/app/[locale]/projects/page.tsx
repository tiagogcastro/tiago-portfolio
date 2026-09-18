import type { Metadata } from "next";
import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/projects", "metadata.pages.projects");
}

export default function Page() {
  return <ProjectsPage />;
}
