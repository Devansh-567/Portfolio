import { ArrowUpRight } from "lucide-react";
import { publications } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import LogoMark from "./LogoMark";

const PublicationsSection = () => {
  const head = useReveal<HTMLDivElement>();
  const groups = Array.from(new Set(publications.map((p) => p.group)));
  const ieee = publications.filter((p) => p.group.startsWith("IEEE")).length;
  return (
    <section id="publications" className="scene scene--tall">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">V</span>
            <h2 className="h-section"><span className="mask"><span>Publications</span></span></h2>
            <p className="lede">
              {publications.length} papers: {ieee} accepted at IEEE 3ICT 2025 and {publications.length - ieee} in technical journals. Cryptography, compression, scheduling and embedded safety systems.
            </p>
          </div>
        </div>
        <div className="papers">
          {groups.map((g) => {
            const items = publications.filter((p) => p.group === g);
            return (
              <div className="papers__group block" key={g}>
                <h3>{g} <small>{items.length} papers</small></h3>
                <ul>
                  {items.map((p) => (
                    <li key={p.id}>
                      <a className="paper" href={p.link} target="_blank" rel="noopener noreferrer">
                        <LogoMark src={p.logo} name={p.venue} variant="plate" />
                        <span>
                          <h4>{p.title}</h4>
                          <p>{p.venue}, {p.year}</p>
                        </span>
                        <span className="go">Read paper <ArrowUpRight /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
