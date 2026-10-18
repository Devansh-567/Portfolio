import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import LogoMark from "./LogoMark";
import ChronoDemo from "./ChronoDemo";
import TypeDemo from "./TypeDemo";

const Facts = ({ facts }: { facts: { value: string; label: string }[] }) => (
  <dl className="facts">
    {facts.map((f) => (
      <div key={f.label}>
        <dt>{f.value}</dt>
        <dd>{f.label}</dd>
      </div>
    ))}
  </dl>
);

const ProjectsSection = () => {
  const head = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);
  const c = projects.chronomap;
  const f = projects.flytora;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.install);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the command is still visible to select */
    }
  };

  return (
    <section id="projects" className="scene scene--tall">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">IV</span>
            <h2 className="h-section"><span className="mask"><span>Selected work</span></span></h2>
          </div>
        </div>

        <div className="plates">
          <article className="plate">
            <div className="plate__text block block--scrim">
              <div className="plate__head">
                <LogoMark src={c.logo} name={c.title} size="4.6rem" />
                <h3>{c.title}</h3>
              </div>
              <p className="plate__tag">{c.tagline}</p>
              <p className="prose">{c.description}</p>
              <Facts facts={c.facts} />
              <p className="tech">{c.tech.join(", ")}</p>
              <div className="plate__links">
                <button className="install" onClick={copy} aria-label={`Copy the command ${c.install}`}>
                  {c.install}
                  <small>{copied ? "Copied" : "Copy"}</small>
                </button>
                <a className="btn" href={c.link} target="_blank" rel="noopener noreferrer">
                  View on PyPI <ArrowUpRight />
                </a>
              </div>
            </div>
            <div className="block"><ChronoDemo /></div>
          </article>

          <article className="plate flip">
            <div className="plate__text block block--scrim">
              <div className="plate__head">
                <LogoMark src={f.logo} name={f.title} size="4.6rem" />
                <h3>{f.title}</h3>
              </div>
              <p className="plate__tag">{f.tagline}</p>
              <p className="prose">{f.description}</p>
              <Facts facts={f.facts} />
              <p className="tech">{f.tech.join(", ")}</p>
              <div className="plate__links">
                <a className="btn btn--solid" href={f.link} target="_blank" rel="noopener noreferrer">
                  Play Flytora <ArrowUpRight />
                </a>
                <a className="btn" href={`mailto:${f.feedback}`}>
                  Send feedback
                </a>
              </div>
              <p className="small" style={{ marginTop: "1rem" }}>Best on a PC or laptop with a physical keyboard. Bug reports and ideas are welcome at {f.feedback}.</p>
            </div>
            <div className="block"><TypeDemo /></div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
