import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/portfolio";
import { cinema, useCinema } from "@/lib/cinema";

/**
 * "Play the film": letterbox bars slide in and the page crawls from the top to
 * the end at a steady pace, so the camera in the 3D stage does the directing.
 * Any wheel, touch, key or click stops it. Space pauses.
 */
const Film = () => {
  const film = useCinema((s) => s.film);
  const chapter = useCinema((s) => s.chapter);
  const [p, setP] = useState(0);
  const [fin, setFin] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    if (!film) return;
    let raf = 0;
    let y = 0;
    let waited = 0;
    let last = performance.now();
    let ended = false;
    const stop = () => cinema.set({ film: false });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setFin(false);
    setPaused(false);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (ended || pausedRef.current) return;
      waited += dt;
      if (waited < 2.6) return; // let the opening shot breathe
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const speed = window.innerHeight * 0.13; // px per second
      y = Math.min(max, y + speed * dt);
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      setP(max > 0 ? y / max : 0);
      if (y >= max - 1) {
        ended = true;
        setFin(true);
        window.setTimeout(stop, 3800);
      }
    };
    raf = requestAnimationFrame(frame);

    const interrupt = (e: Event) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === " ") {
          e.preventDefault();
          setPaused((v) => !v);
          return;
        }
      }
      if ((e.target as HTMLElement)?.closest?.(".caption button")) return;
      stop();
    };
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", interrupt, opts);
    window.addEventListener("touchstart", interrupt, opts);
    window.addEventListener("keydown", interrupt);
    window.addEventListener("pointerdown", interrupt, opts);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      setFin(false);
    };
  }, [film]);

  const c = chapters[chapter];
  return (
    <>
      <div className="bars" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="caption" style={{ ["--p" as string]: p }} role="status" aria-live="polite">
        <span className="prog" />
        <p className="t" key={c.id}>
          <span className="numeral">{c.numeral}.</span>
          <span>{c.title}</span>
        </p>
        <span className="hint">{paused ? "Paused. Press space to continue." : "Space pauses. Any other key, scroll or click stops the film."}</span>
        <button onClick={() => cinema.set({ film: false })}>Stop</button>
      </div>
      <div className={`fin ${fin ? "show" : ""}`} aria-hidden="true">
        <p>Fin.</p>
      </div>
    </>
  );
};

export default Film;
