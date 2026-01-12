import Quickbar from "@/components/portfolio/Quickbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import PublicationsSection from "@/components/portfolio/PublicationsSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import EducationSection from "@/components/portfolio/EducationSection"
import NewsMediaSection from "@/components/portfolio/NewsMediaSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Quickbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <AchievementsSection />
      <NewsMediaSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
