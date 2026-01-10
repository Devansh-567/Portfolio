import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education, certifications } from "@/data/portfolio";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto" ref={ref}>
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
              Education
            </span>
            <div className="divider" />
          </motion.div>

          <div className="space-y-8 mb-24">
            {education.map((edu, index) => (
              <motion.article
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {edu.institution}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="text-sm font-body text-muted-foreground">
                    {edu.duration}
                  </span>
                </div>
                {edu.honors && (
                  <p className="font-body text-sm text-accent mb-3">
                    {edu.honors}
                  </p>
                )}
                {edu.coursework && (
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-12"
              >
                <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
                  Certifications
                </span>
                <div className="divider" />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <motion.a
                    key={cert.id}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="group p-4 bg-card/50 border border-border/30 rounded-lg hover:border-border hover:bg-card transition-all duration-300"
                  >
                    <h4 className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 mb-1">
                      {cert.name}
                    </h4>
                    <p className="font-body text-xs text-muted-foreground">
                      {cert.issuer} · {cert.year}
                    </p>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
