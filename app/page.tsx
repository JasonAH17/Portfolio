import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HomeSection } from "@/components/sections/home-section";
import { LogSection } from "@/components/sections/log-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HomeSection />
      <ProjectsSection />
      <AboutSection />
      <LogSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
