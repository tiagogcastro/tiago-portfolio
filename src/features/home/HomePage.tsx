import { ContactSection } from "@/features/home/sections/ContactSection";
import { CredentialsSection } from "@/features/home/sections/CredentialsSection";
import { ExperienceSection } from "@/features/home/sections/ExperienceSection";
import { HeroSection } from "@/features/home/sections/HeroSection";
import { MethodSection } from "@/features/home/sections/MethodSection";
import { ProjectsSection } from "@/features/home/sections/ProjectsSection";

export function HomePage() {
  return (
    <main id="conteudo">
      <HeroSection />
      <ExperienceSection />
      <CredentialsSection />
      <ProjectsSection />
      <MethodSection />
      <ContactSection />
    </main>
  );
}
