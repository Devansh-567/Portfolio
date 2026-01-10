import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { publications } from "@/data/portfolio";

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (publications.length === 0) return null;

  return (
    <section id="publications" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 50%, hsl(var(--accent) / 0.08), transparent 60%)" }}
      />
      
      <div className="section-container">
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

          {/* Publications list */}
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <motion.a
                key={pub.id}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group block card-premium rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-500">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                          {pub.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground">
                          {pub.venue} · {pub.year}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
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

export default PublicationsSection;
