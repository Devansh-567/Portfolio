import { useEffect, useState } from "react";
import { chapters } from "@/data/portfolio";
import { useCinema } from "@/lib/cinema";
import { goTo } from "./Quickbar";

/** A power-reserve style gauge on the right edge: scroll progress plus one notch per chapter. */
const PowerReserve = () => {
  const chapter = useCinema((s) => s.chapter);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className="reserve" aria-label="Chapters" style={{ ["--p" as string]: p }}>
      <span className="fill" />
      {chapters.map((c, i) => (
        <button key={c.id} onClick={() => goTo(c.id)} aria-current={chapter === i} aria-label={`${c.numeral}. ${c.title}`}>
          <span className="label">
            {c.numeral}. {c.title}
          </span>
          <span className="notch" />
        </button>
      ))}
    </nav>
  );
};

export default PowerReserve;
