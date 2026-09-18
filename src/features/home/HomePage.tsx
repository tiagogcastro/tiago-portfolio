import { ContactSection } from "@/features/home/sections/ContactSection";
import { CredentialsSection } from "@/features/home/sections/CredentialsSection";
import { ExperienceSection } from "@/features/home/sections/ExperienceSection";
import { HeroSection } from "@/features/home/sections/HeroSection";
import { MethodSection } from "@/features/home/sections/MethodSection";
import { ProjectsSection } from "@/features/home/sections/ProjectsSection";
import { WorkSection } from "@/features/home/sections/WorkSection";

export function HomePage() {
  return (
    <main id="conteudo">
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <MethodSection />
      <ProjectsSection />
      <CredentialsSection />
      <ContactSection />
    </main>
  );
}
