import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { education, certifications } from "@/data/portfolio";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 bottom-0 w-1/3 h-1/2 opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 100%, hsl(var(--accent) / 0.1), transparent 60%)" }}
      />
      
      <div className="section-container">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="number-accent">06</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Background
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Education
              </h2>
            </div>
          </motion.div>

          <div className="space-y-6 mb-24">
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
                className="card-premium rounded-xl p-8 md:p-10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h3 className="font-display text-2xl font-medium text-foreground">
                        {edu.institution}
                      </h3>
                      <span className="badge-elegant">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="font-body text-muted-foreground text-lg">
                      {edu.degree}
                    </p>
                  </div>
                </div>
                
                {edu.honors && (
                  <div className="flex items-center gap-2 mb-4 ml-16">
                    <Award className="w-4 h-4 text-accent" />
                    <p className="font-body text-sm text-accent">
                      {edu.honors}
                    </p>
                  </div>
                )}
                
                {edu.coursework && (
                  <div className="ml-16">
                    <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-3">
                      Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1.5 text-xs font-body bg-secondary text-secondary-foreground rounded-lg"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
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
                className="flex items-center gap-4 mb-10"
              >
                <span className="text-sm font-body text-muted-foreground">Certifications</span>
                <div className="flex-1 h-px bg-border" />
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
                    className="group p-5 bg-card/50 border border-border/50 rounded-xl hover:border-accent/30 hover:bg-card transition-all duration-500"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                        {cert.name}
                      </h4>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
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
