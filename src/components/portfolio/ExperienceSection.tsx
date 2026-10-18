<<<<<<< HEAD
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
=======
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Zap, TrendingUp, Code } from "lucide-react";
import { experiences } from "@/data/portfolio";

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      {/* Dynamic background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px", "0px 0px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating code symbols */}
      {["</>", "{}", "( )", "[ ]"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-accent/10 font-mono text-2xl font-bold"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          {symbol}
        </motion.div>
      ))}

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <motion.span 
              className="number-accent relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              02
              <motion.div
                className="absolute -inset-3 bg-accent/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
            <div>
              <motion.span 
                className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2 flex items-center gap-2"
              >
                <Briefcase className="w-3 h-3" />
                Career
                <motion.div
                  className="h-px bg-accent flex-1 max-w-[60px]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Experience
              </h2>
            </div>
          </motion.div>

          {/* Experience cards with timeline */}
          <div className="space-y-8 relative">
            {/* Vertical timeline line */}
            <motion.div
              className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ transformOrigin: "top" }}
            />

            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="card-premium rounded-xl p-8 md:p-10 relative overflow-hidden">
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner decoration */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full"
                    animate={{
                      scale: hoveredIndex === index ? 1.5 : 1,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Animated particles on hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-accent/40"
                          initial={{
                            x: "50%",
                            y: "50%",
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 100}%`,
                            y: `${50 + (Math.random() - 0.5) * 100}%`,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                    {/* Timeline node */}
                    <motion.div
                      className="hidden md:flex absolute -left-[3.25rem] top-2 w-4 h-4 rounded-full bg-accent border-4 border-background"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + index * 0.15,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Logo / Icon */}
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-7 h-7 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <Briefcase className="w-5 h-5 text-accent" />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-xl"
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                        <div>
                          <motion.h3 
                            className="font-display text-xl md:text-2xl font-medium text-foreground"
                            animate={{
                              color: hoveredIndex === index 
                                ? "hsl(var(--accent))" 
                                : "hsl(var(--foreground))"
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {exp.role}
                          </motion.h3>
                          <motion.p 
                            className="font-body text-muted-foreground flex items-center gap-2"
                            animate={{
                              x: hoveredIndex === index ? 5 : 0
                            }}
                          >
                            <TrendingUp className="w-4 h-4 text-accent/60" />
                            {exp.company}
                          </motion.p>
                        </div>
                        <motion.span 
                          className="badge-elegant relative"
                          whileHover={{ scale: 1.05 }}
                        >
                          {exp.duration}
                          <motion.div
                            className="absolute inset-0 bg-accent/10 rounded-full"
                            animate={{
                              scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                              opacity: hoveredIndex === index ? [0.5, 0, 0.5] : 0,
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: hoveredIndex === index ? Infinity : 0,
                            }}
                          />
                        </motion.span>
                      </div>

                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + index * 0.15 + i * 0.1,
                            }}
                            whileHover={{ x: 5 }}
                            className="font-body text-muted-foreground leading-relaxed flex items-start gap-3 group/item"
                          >
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-2 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="group-hover/item:text-foreground transition-colors duration-300">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Skills/Tech indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          delay: 0.6 + index * 0.15,
                          duration: 0.5
                        }}
                        className="mt-6 flex items-center gap-2"
                      >
                        <Code className="w-4 h-4 text-accent/40" />
                        <div className="flex gap-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-1 bg-accent/20 rounded-full"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${20 + i * 10}px` } : {}}
                              transition={{
                                delay: 0.7 + index * 0.15 + i * 0.1,
                                duration: 0.5
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Connector line to next item */}
                {index < experiences.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute left-[3.25rem] top-full w-px h-8"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.15
                    }}
                    style={{
                      background: "linear-gradient(to bottom, hsl(var(--border)), transparent)",
                      transformOrigin: "top"
                    }}
                  />
                )}
              </motion.article>
            ))}
          </div>

          {/* End marker */}
          <motion.div
            className="hidden md:flex items-center justify-start gap-3 mt-8 ml-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                boxShadow: [
                  "0 0 0 0 hsl(var(--accent) / 0.7)",
                  "0 0 0 8px hsl(var(--accent) / 0)",
                  "0 0 0 0 hsl(var(--accent) / 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">
              Journey Continues
            </span>
            <Zap className="w-3 h-3 text-accent/60" />
          </motion.div>
>>>>>>> origin/main
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
