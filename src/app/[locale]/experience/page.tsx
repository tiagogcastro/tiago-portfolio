import type { Metadata } from "next";
import { ExperiencePage } from "@/features/experience/ExperiencePage";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/experience", "metadata.pages.experience");
}

export default function Page() {
  return <ExperiencePage />;
}
