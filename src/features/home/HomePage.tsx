import { HeroSection } from "./sections/HeroSection";
import { ProfileSection } from "./sections/ProfileSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";

export function HomePage() {
  return (
    <main id="conteudo">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ProfileSection />
      <ContactSection />
    </main>
  );
}
