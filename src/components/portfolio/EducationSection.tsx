import { education } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import LogoMark from "./LogoMark";

const EducationSection = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="education" className="scene">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">VIII</span>
            <h2 className="h-section"><span className="mask"><span>Education</span></span></h2>
          </div>
        </div>
        <div className="edu block">
          <LogoMark src={education.logo} name={education.institution} variant="plate" />
          <div>
            <h3>{education.degree}</h3>
            <p className="lede" style={{ marginTop: "0.8rem" }}>
              {education.institution}, {education.place}. {education.duration}.
            </p>
            <ul className="courses">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
