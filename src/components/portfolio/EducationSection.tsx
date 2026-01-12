import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, MapPin, ExternalLink } from "lucide-react";
import { education, certifications } from "@/data/portfolio";

const EducationSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="section-container">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="number-accent">07</span>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent block mb-2">
                Background
              </span>
              <h2 className="text-3xl md:text-4xl font-medium">
                Education
              </h2>
            </div>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6 mb-24">
            {education.map((edu, index) => (
              <motion.article
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-premium rounded-xl p-8 md:p-10"
              >
                <div className="flex items-start gap-6">
                  {/* Logo / Icon */}
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-14 h-14 object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h3 className="text-2xl font-medium">
                        {edu.institution}
                      </h3>
                      <span className="badge-elegant">
                        {edu.duration}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-lg mb-2">
                      {edu.degree}
                    </p>

                    {edu.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </div>
                    )}

                    {edu.honors && (
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-accent" />
                        <p className="text-sm text-accent">
                          {edu.honors}
                        </p>
                      </div>
                    )}

                    {edu.coursework && (
                      <>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                          Relevant Coursework
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1.5 text-xs bg-secondary rounded-lg"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Certifications (unchanged) */}
          {certifications.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-sm text-muted-foreground">
                  Certifications
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 bg-card/50 border rounded-xl hover:border-accent/30 transition"
                  >
                    <div className="flex justify-between gap-2 mb-2">
                      <h4 className="text-sm font-medium group-hover:text-accent">
                        {cert.name}
                      </h4>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} · {cert.year}
                    </p>
                  </a>
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
