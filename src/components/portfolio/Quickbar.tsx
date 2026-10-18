import { useEffect, useState } from "react";
import { Download, Film, Menu, Volume2, VolumeX, X } from "lucide-react";
import { chapters, personalInfo } from "@/data/portfolio";
import { cinema, useCinema } from "@/lib/cinema";
import { setSound } from "@/lib/audio";

export const goTo = (id: string) => {
  if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Quickbar = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const chapter = useCinema((s) => s.chapter);
  const sound = useCinema((s) => s.sound);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    cinema.set({ sound: next });
  };

  const go = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <>
      <nav className={`nav ${solid ? "is-solid" : ""}`} aria-label="Primary">
        <button className="brand" onClick={() => go("top")} aria-label="Back to the top">
          <span className="crown">DS</span>
          <span className="nm">Devansh Singh</span>
        </button>

        <div className="nav-links">
          {chapters.slice(1).map((c, i) => (
            <button key={c.id} onClick={() => go(c.id)} aria-current={chapter === i + 1}>
              {c.nav}
            </button>
          ))}
        </div>

        <div className="nav-tools">
          <button className="icon-btn" aria-pressed={sound} onClick={toggleSound} aria-label={sound ? "Turn the escapement sound off" : "Turn the escapement sound on"} title="Escapement sound">
            {sound ? <Volume2 /> : <VolumeX />}
          </button>
          <button className="btn btn--sm nav-text" onClick={() => cinema.set({ film: true })}>
            <Film /> Play the film
          </button>
          <a className="btn btn--sm btn--solid nav-text" href={personalInfo.resumeUrl} download={personalInfo.resumeFile}>
            <Download /> Résumé
          </a>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div className={`sheet ${open ? "open" : ""}`} aria-hidden={!open}>
        {chapters.map((c) => (
          <button key={c.id} onClick={() => go(c.id)} tabIndex={open ? 0 : -1}>
            <span className="numeral">{c.numeral}</span>
            {c.nav}
          </button>
        ))}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <button className="btn" style={{ fontSize: "0.9rem" }} tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); cinema.set({ film: true }); }}>
            <Film /> Play the film
          </button>
          <a className="btn btn--solid" href={personalInfo.resumeUrl} download={personalInfo.resumeFile} tabIndex={open ? 0 : -1}>
            <Download /> Résumé
          </a>
        </div>
      </div>
    </>
  );
};

export default Quickbar;
