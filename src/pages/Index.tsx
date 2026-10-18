import { lazy, Suspense, useEffect } from "react";
const Stage = lazy(() => import("@/stage/Stage"));
import Quickbar from "@/components/portfolio/Quickbar";
import PowerReserve from "@/components/portfolio/PowerReserve";
import Film from "@/components/portfolio/Film";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import PublicationsSection from "@/components/portfolio/PublicationsSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import NewsMediaSection from "@/components/portfolio/NewsMediaSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import { cinema, useCinema } from "@/lib/cinema";

const Index = () => {
  const free = useCinema((s) => s.free);
  const film = useCinema((s) => s.film);
  const stage = useCinema((s) => s.stage);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("is-free", free);
    el.classList.toggle("is-film", film);
    el.classList.toggle("has-stage", stage);
  }, [free, film, stage]);

  useEffect(() => {
    document.title = "Devansh Singh, software engineer and academic reviewer";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cinema.get().free && cinema.set({ free: false });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <Suspense fallback={null}><Stage /></Suspense>
      <div className="veil" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Quickbar />
      <PowerReserve />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <AchievementsSection />
      <NewsMediaSection />
      <EducationSection />
      <ContactSection />
      <Film />
      <div className="free-bar" role="region" aria-label="Free controls">
        <p>Drag a wheel to turn the train. Drag the plate to look around. Scroll to zoom.</p>
        <button className="btn btn--sm btn--solid" onClick={() => cinema.set({ free: false })}>Back to the story</button>
      </div>
    </main>
  );
};

export default Index;
