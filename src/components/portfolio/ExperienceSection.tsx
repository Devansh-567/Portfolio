import { useMemo, useState } from "react";
import { organizations, personalInfo } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import LogoMark from "./LogoMark";

const START = { y: 2025, m: 9 };
const MONTHS = 17; // Sep 2025 .. Jan 2027
const idx = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return (y - START.y) * 12 + (m - START.m);
};
const MONTH_NAMES = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
const COLORS: Record<string, string> = { uob: "#cba264", cubane: "#aeb3b8", ncl: "#cf9378" };

const ExperienceSection = () => {
  const [hot, setHot] = useState<string | null>(null);
  const head = useReveal<HTMLDivElement>();
  const chart = useReveal<HTMLDivElement>(0.2);

  const rows = useMemo(
    () =>
      organizations
        .flatMap((o) => o.roles.map((r) => ({ org: o, role: r })))
        .sort((a, b) => idx(a.role.start) - idx(b.role.start)),
    [],
  );

  const today = useMemo(() => {
    const d = new Date();
    const days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const t = ((d.getFullYear() - START.y) * 12 + (d.getMonth() + 1 - START.m) + (d.getDate() - 1) / days) / MONTHS;
    return t >= 0 && t <= 1 ? t : null;
  }, []);

  return (
    <section id="experience" className="scene scene--tall">
      <div className="wrap">
        <div className="block block--scrim" ref={head}>
          <div className="sec-head">
            <span className="numeral">III</span>
            <h2 className="h-section"><span className="mask"><span>Experience</span></span></h2>
            <p className="lede">Reviewing, building and research, from September 2025 to January 2027. Bars show when each role ran.</p>
          </div>
        </div>

        <div className="chart block" ref={chart}>
          <div className="chart-in" role="img" aria-label="Timeline of roles from September 2025 to January 2027">
            <div className="chart-years">
              <span />
              <div className="track" style={{ gridTemplateColumns: "4fr 12fr 1fr" }}>
                <span>2025</span>
                <span>2026</span>
                <span>2027</span>
              </div>
            </div>
            <div className="chart-months">
              <span />
              <div className="track" style={{ gridTemplateColumns: `repeat(${MONTHS}, 1fr)` }}>
                {MONTH_NAMES.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
            </div>
            {rows.map(({ org, role }, i) => (
              <div
                key={role.id}
                className={`chart-row ${hot === role.id ? "hot" : ""}`}
                onMouseEnter={() => setHot(role.id)}
                onMouseLeave={() => setHot(null)}
              >
                <div className="who">
                  <LogoMark src={org.logo} name={org.name} variant="plate" />
                  {org.short}
                </div>
                <div className="lane">
                  <span
                    className="bar"
                    style={{ ["--s" as string]: idx(role.start), ["--w" as string]: idx(role.end) - idx(role.start) + 1, ["--c" as string]: COLORS[org.id], ["--i" as string]: i }}
                  >
                    {role.chart}
                  </span>
                </div>
              </div>
            ))}
            {today !== null && (
              <div className="today" style={{ ["--t" as string]: today }}>
                <span>Today</span>
              </div>
            )}
          </div>
        </div>

        <div className="ledger">
          {organizations.map((o) => (
            <article className="entry block" key={o.id}>
              <LogoMark src={o.logo} name={o.name} size="5.2rem" />
              <div>
                <header className="entry__org">
                  <h3>{o.name}</h3>
                  <p>{o.summary}</p>
                </header>
                <ul className="roles">
                  {o.roles.map((r) => (
                    <li
                      key={r.id}
                      className={`role ${hot === r.id ? "hot" : ""}`}
                      onMouseEnter={() => setHot(r.id)}
                      onMouseLeave={() => setHot(null)}
                    >
                      <div>
                        <h4>
                          {r.title}
                          {"current" in r && r.current && <span className="now">Current</span>}
                        </h4>
                        <p className="meta">{r.focus}</p>
                      </div>
                      <div>
                        <p className="when">{r.when}</p>
                        <p className="meta">{r.mode}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
