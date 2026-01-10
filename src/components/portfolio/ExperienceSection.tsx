import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/portfolio";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
              Experience
            </span>
            <div className="divider" />
          </motion.div>

          {/* Timeline */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="relative grid md:grid-cols-[200px_1fr] gap-6 md:gap-12"
              >
                {/* Duration */}
                <div className="md:text-right">
                  <span className="text-sm font-body text-muted-foreground">
                    {exp.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="hidden md:block absolute -left-6 top-2 w-px h-full bg-border" />
                  <div className="hidden md:block absolute -left-[26px] top-2 w-2 h-2 rounded-full bg-accent" />

                  <h3 className="font-display text-xl font-medium text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="font-body text-muted-foreground mb-4">
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li 
                        key={i}
                        className="font-body text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border/50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
