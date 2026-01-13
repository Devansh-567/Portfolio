import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { publications } from "@/data/portfolio";

const PublicationsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  if (!publications || publications.length === 0) return null;

  return (
    <section id="publications" className="relative py-32 overflow-hidden">
      {/* Ambient background accent */}
      <motion.div
        className="absolute right-0 top-1/4 w-1/3 h-1/2 pointer-events-none opacity-30"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(ellipse at 100% 50%, hsl(var(--accent) / 0.08), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">04</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Research
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Publications
              </h2>
            </div>
          </motion.div>

          {/* Timeline rail */}
          <div className="relative">
            <motion.div
              className="absolute left-5 top-0 bottom-0 w-px bg-border"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-6">
              {publications.map((pub, index) => (
                <motion.a
                  key={pub.id}
                  href={pub.link || "#"}
                  target={pub.link ? "_blank" : undefined}
                  rel={pub.link ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onHoverStart={() => setHovered(index)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -4 }}
                  className="group relative block pl-14"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-[14px] top-8 w-3 h-3 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15 }}
                  />

                  {/* Card */}
                  <div className="card-premium rounded-xl p-6 md:p-8 relative overflow-hidden">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      animate={{
                        opacity: hovered === index ? 1 : 0,
                        background:
                          "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Watermark index */}
                    <div className="absolute top-4 right-6 font-display text-5xl font-bold text-foreground/[0.03]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"
                        animate={{
                          rotate: hovered === index ? 5 : 0,
                          scale: hovered === index ? 1.05 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {pub.logo ? (
                          <img
                            src={pub.logo}
                            alt={pub.venue}
                            className="w-6 h-6 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <FileText className="w-5 h-5 text-accent" />
                        )}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <motion.h3
                              className="font-display text-xl font-medium text-foreground"
                              animate={{
                                color:
                                  hovered === index
                                    ? "hsl(var(--accent))"
                                    : "hsl(var(--foreground))",
                              }}
                            >
                              {pub.title}
                            </motion.h3>

                            {/* Underline */}
                            <motion.div
                              className="h-px bg-accent mt-1"
                              initial={{ width: 0 }}
                              animate={{
                                width: hovered === index ? "100%" : 0,
                              }}
                              transition={{ duration: 0.4 }}
                            />

                            <p className="font-body text-sm text-muted-foreground mt-2">
                              {pub.venue} · {pub.year}
                            </p>
                          </div>

                          {pub.link && (
                            <motion.div
                              animate={{
                                x: hovered === index ? 4 : 0,
                                y: hovered === index ? -4 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
