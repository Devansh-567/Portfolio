import { useEffect, useRef, useState } from "react";
import { honorCounts, organizations, publications, stack } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";

const useInView = (threshold = 0.4) => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
};

/** A chronograph-style sub-dial. Each tick is one unit, so the dial is literally the count. */
const Register = ({ value, ticks, lit, caption }: { value: string; ticks: number; lit: number; caption: string }) => {
  const [ref, seen] = useInView();
  return (
    <div className="register" ref={ref}>
      <svg viewBox="0 0 120 120" role="img" aria-label={`${value} ${caption}`}>
        <circle className="dial" cx="60" cy="60" r="57" strokeWidth="1" />
        {Array.from({ length: ticks }, (_, i) => {
          const a = (i / ticks) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              className={`tick ${seen && i < lit ? "lit" : ""}`}
              x1={60 + Math.cos(a) * 43}
              y1={60 + Math.sin(a) * 43}
              x2={60 + Math.cos(a) * 52}
              y2={60 + Math.sin(a) * 52}
              style={{ transitionDelay: `${i * 90}ms` }}
            />
          );
        })}
        <text className="num" x="60" y="69">{value}</text>
      </svg>
      <p className="cap">{caption}</p>
    </div>
  );
};

const reviewTerms = organizations.flatMap((o) => (o.id === "uob" ? o.roles : [])).length;

const AboutSection = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scene">
      <div className="wrap">
        <div className="about-grid">
          <div className="block block--scrim" ref={head}>
            <div className="sec-head">
              <span className="numeral">II</span>
              <h2 className="h-section">
                <span className="mask"><span>Careful systems,</span></span>
                <span className="mask"><span>shipped and measured.</span></span>
              </h2>
            </div>
            <div className="prose">
              <p>
                I'm a computer engineering undergraduate at G.H. Raisoni International Skill Tech University in Pune and, since August 2026,
                an R&amp;D intern at CSIR National Chemical Laboratory. My interests sit close to the machine: core systems design,
                time-series data, and a little cryptography.
              </p>
              <p>
                <strong>ChronoMap</strong>, the time-versioned data library I wrote and maintain, has passed 50,000 downloads on PyPI.{" "}
                <strong>Flytora</strong>, a typing game I built on plain HTML5 Canvas, is live at flytora.com.
              </p>
              <p>
                I've finished on the podium {honorCounts.total} times, at {honorCounts.hackathons} hackathons and {honorCounts.events} technical
                competitions. {honorCounts.firstPlaces} of those were first place and {honorCounts.global} came on global stages. I also read other
                people's work: {reviewTerms} terms as an IEEE peer reviewer, alongside {publications.length} papers of my own.
              </p>
            </div>

            <div className="registers">
              <Register value={String(honorCounts.total)} ticks={honorCounts.total} lit={honorCounts.total} caption="podium finishes" />
              <Register value={String(publications.length)} ticks={publications.length} lit={publications.length} caption="papers published" />
              <Register value={String(reviewTerms)} ticks={reviewTerms} lit={reviewTerms} caption="terms as IEEE peer reviewer" />
              <Register value="50k+" ticks={10} lit={5} caption="PyPI downloads, one mark per 10,000" />
            </div>

            <dl className="stack">
              {stack.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
