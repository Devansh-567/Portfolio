import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { media } from "@/data/portfolio";

const NewsMediaSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!media || media.length === 0) return null;

  return (
    <section id="media" className="relative py-32">
      {/* Subtle background accent */}
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
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Coverage
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                News & Media
              </h2>
            </div>
          </motion.div>

          {/* Media cards */}
          <div className="space-y-6">
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
                className="group block card-premium rounded-xl p-8 md:p-10"
              >
                <div className="flex items-start gap-6">
                  {/* Media image */}
                  {item.image && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm font-body text-muted-foreground mt-1">
                          {item.outlet} · {item.date}
                        </p>
                      </div>

                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
                    </div>

                    {item.description && (
                      <p className="font-body text-muted-foreground leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-4">
                      <span className="badge-elegant">{item.type}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsMediaSection;
