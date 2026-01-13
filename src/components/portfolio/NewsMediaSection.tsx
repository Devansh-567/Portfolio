import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { media } from "@/data/portfolio";

const NewsMediaSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  if (!media || media.length === 0) return null;

  return (
    <section id="media" className="relative py-32 overflow-hidden">
      {/* Editorial background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">06</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2 flex items-center gap-2">
                <Newspaper className="w-3 h-3" />
                Coverage
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                News & Media
              </h2>
            </div>
          </motion.div>

          {/* Media timeline */}
          <div className="relative">
            {/* Rail */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-px bg-border"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-8">
              {media.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-[19px] top-10 w-3 h-3 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15 }}
                  />

                  {/* Card */}
                  <div className="card-premium rounded-xl p-8 md:p-10 relative overflow-hidden">
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      animate={{
                        opacity: hovered === index ? 1 : 0,
                        background:
                          "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.07), transparent 70%)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Watermark index */}
                    <div className="absolute top-6 right-8 font-display text-6xl font-bold text-foreground/[0.03]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Media image */}
                      {item.image ? (
                        <motion.div
                          className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                          animate={{
                            scale: hovered === index ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Newspaper className="w-6 h-6 text-accent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
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
                              {item.title}
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

                            <p className="text-sm font-body text-muted-foreground mt-2">
                              {item.outlet} · {item.date}
                            </p>
                          </div>

                          <motion.div
                            animate={{
                              x: hovered === index ? 4 : 0,
                              y: hovered === index ? -4 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          </motion.div>
                        </div>

                        {item.description && (
                          <p className="font-body text-muted-foreground leading-relaxed max-w-3xl">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-5">
                          <span className="badge-elegant">{item.type}</span>
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

export default NewsMediaSection;
