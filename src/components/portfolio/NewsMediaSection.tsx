import { media } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";

const NewsMediaSection = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="media" className="scene">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">VII</span>
            <h2 className="h-section"><span className="mask"><span>In the press</span></span></h2>
            <p className="lede">Three Pune newspapers, Navrashtra, Prabhat and Navbharat, covered these wins in 2025.</p>
          </div>
          <div className="cuttings">
            {media.map((m) => (
              <figure className="cutting" key={m.id}>
                <a className="paper-img" href={m.link} target="_blank" rel="noopener noreferrer" aria-label={`${m.outlet}, ${m.date}: open the clipping`}>
                  <img src={m.image} alt={`Newspaper clipping from ${m.outlet}, ${m.date}`} loading="lazy" />
                </a>
                <figcaption>
                  {m.outlet}
                  <span>{m.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsMediaSection;
