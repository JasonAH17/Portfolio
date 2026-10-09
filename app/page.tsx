import { HomeSection } from "@/components/sections/home-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeSection />

      <ProjectsSection />

      <ExperienceSection />

      <AchievementsSection />

      <CertificationsSection />

      <ContactSection />
    </div>
  );
}
