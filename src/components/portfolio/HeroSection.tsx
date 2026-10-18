import { useEffect, useState } from "react";
import { Download, Film, Hand } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { cinema } from "@/lib/cinema";

const HeroSection = () => {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), 1500);
    return () => window.clearTimeout(t);
  }, []);
  const [first, ...rest] = personalInfo.name.split(" ");

  const takeControls = () => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    cinema.set({ free: true });
  };

  return (
    <section id="top" className={`scene scene--top hero ${go ? "go" : ""}`}>
      <div className="wrap">
        <div className="hero__copy block block--scrim">
          <p className="hero__role hero__fade">{personalInfo.role}</p>
          <h1 className="hero__name h-display" aria-label={personalInfo.name}>
            <span className="mask" aria-hidden="true"><span>{first}</span></span>
            <span className="mask l2" aria-hidden="true"><span>{rest.join(" ")}</span></span>
          </h1>
          <p className="hero__intro hero__fade">{personalInfo.intro}</p>
          <div className="hero__actions hero__fade">
            <button className="btn btn--solid" onClick={takeControls}>
              <Hand /> Take the controls
            </button>
            <button className="btn" onClick={() => cinema.set({ film: true })}>
              <Film /> Play the film
            </button>
            <a className="btn" href={personalInfo.resumeUrl} download={personalInfo.resumeFile}>
              <Download /> Download résumé
            </a>
          </div>
          <p className="hero__now small hero__fade">Now an R&amp;D intern at CSIR National Chemical Laboratory, Pune.</p>
        </div>
      </div>
      <p className="hero__hint hero__fade">Grab any wheel. The rest of the movement follows.</p>
    </section>
  );
};

export default HeroSection;
