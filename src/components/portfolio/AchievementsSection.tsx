import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { achievements, honorCounts, medalImage } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";

type Filter = "all" | "hackathon" | "event";

const Piece = ({ a }: { a: (typeof achievements)[number] }) => {
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 38}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 26}deg`);
  };
  const reset = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };
  const title = a.link ? (
    <a href={a.link} target="_blank" rel="noopener noreferrer" className="link">{a.title}</a>
  ) : (
    a.title
  );
  return (
    <motion.li className="piece" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <div className="tilt" onPointerMove={tilt} onPointerLeave={reset}>
        <img src={medalImage[a.tier]} alt="" loading="lazy" draggable={false} />
      </div>
      <h4>{title}</h4>
      <p className="res">{a.result}</p>
      <p className="meta">{a.level}, {a.year}</p>
    </motion.li>
  );
};

const AchievementsSection = () => {
  const head = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>("all");
  const shown = achievements.filter((a) => filter === "all" || a.kind === filter);
  const second = achievements.filter((a) => a.result === "Second runner-up").length;
  const runnerUp = achievements.filter((a) => a.result === "First runner-up").length;
  const special = achievements.filter((a) => a.result === "Special recognition").length;

  const tally = [
    { img: medalImage.gold, n: honorCounts.firstPlaces, label: "first places" },
    { img: medalImage.silver, n: runnerUp, label: "first runner-up" },
    { img: medalImage.bronze, n: second, label: "second runner-up" },
    { img: medalImage.platinum, n: special, label: "special recognition" },
  ];
  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: honorCounts.total },
    { id: "hackathon", label: "Hackathons", n: honorCounts.hackathons },
    { id: "event", label: "Technical competitions", n: honorCounts.events },
  ];

  return (
    <section id="achievements" className="scene scene--tall">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">VI</span>
            <h2 className="h-section"><span className="mask"><span>Honors</span></span></h2>
            <p className="lede">
              {honorCounts.total} podium finishes: {honorCounts.hackathons} at hackathons and {honorCounts.events} at technical competitions, {honorCounts.global} of them on global stages.
            </p>
          </div>
          <div className="tally">
            {tally.map((t) => (
              <div key={t.label}>
                <img src={t.img} alt="" />
                <b>{t.n}</b> {t.label}
              </div>
            ))}
          </div>
          <div className="filters" role="group" aria-label="Filter honors">
            {filters.map((f) => (
              <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label} ({f.n})
              </button>
            ))}
          </div>
        </div>
        <ul className="cabinet block">
          <AnimatePresence>
            {shown.map((a) => (
              <Piece key={a.id} a={a} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
};

export default AchievementsSection;
