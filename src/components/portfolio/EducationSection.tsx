import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Award, MapPin, ExternalLink, BookOpen, Star } from "lucide-react";
import { education, certifications } from "@/data/portfolio";

const EducationSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredEdu, setHoveredEdu] = useState<number | null>(null);

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 opacity-5"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <BookOpen className="w-64 h-64 text-accent" />
      </motion.div>

      {/* Floating graduation caps */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5"
          style={{
            left: `${20 + i * 30}%`,
            top: `${40 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        >
          <GraduationCap className="w-20 h-20 text-accent" />
        </motion.div>
      ))}

      <div className="section-container">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16"
          >
            <motion.span 
              className="number-accent relative"
              whileHover={{ scale: 1.1 }}
            >
              07
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
                className="text-xs uppercase tracking-[0.3em] text-accent block mb-2 flex items-center gap-2"
              >
                <GraduationCap className="w-3 h-3" />
                Background
                <motion.div
                  className="h-px bg-accent flex-1 max-w-[70px]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.span>
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
                onHoverStart={() => setHoveredEdu(edu.id)}
                onHoverEnd={() => setHoveredEdu(null)}
                className="card-premium rounded-xl p-8 md:p-10 relative overflow-hidden group"
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredEdu === edu.id ? 1 : 0,
                    scale: hoveredEdu === edu.id ? 1 : 0.95
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Sparkle effects on hover */}
                {hoveredEdu === edu.id && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 80}%`,
                          y: `${50 + (Math.random() - 0.5) * 80}%`,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="w-3 h-3 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </>
                )}

                <div className="flex items-start gap-6 relative z-10">
                  {/* Logo / Icon with glow */}
                  {edu.logo ? (
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="w-14 h-14 object-contain flex-shrink-0"
                      />
                      <motion.div
                        className="absolute inset-0 bg-accent/30 rounded-xl blur-xl"
                        animate={{
                          scale: hoveredEdu === edu.id ? 1.5 : 1,
                          opacity: hoveredEdu === edu.id ? 0.6 : 0
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <GraduationCap className="w-6 h-6 text-accent" />
                      <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-xl"
                        animate={{
                          opacity: hoveredEdu === edu.id ? 1 : 0,
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <motion.h3 
                        className="text-2xl font-medium"
                        animate={{
                          x: hoveredEdu === edu.id ? 5 : 0,
                          color: hoveredEdu === edu.id ? "hsl(var(--accent))" : "hsl(var(--foreground))"
                        }}
                      >
                        {edu.institution}
                      </motion.h3>
                      <motion.span 
                        className="badge-elegant relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        {edu.duration}
                        <motion.div
                          className="absolute inset-0 bg-accent/10 rounded-full"
                          animate={{
                            scale: hoveredEdu === edu.id ? [1, 1.2, 1] : 1,
                            opacity: hoveredEdu === edu.id ? [0.5, 0, 0.5] : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: hoveredEdu === edu.id ? Infinity : 0,
                          }}
                        />
                      </motion.span>
                    </div>

                    <motion.p 
                      className="text-muted-foreground text-lg mb-2"
                      animate={{
                        opacity: hoveredEdu === edu.id ? 1 : 0.8
                      }}
                    >
                      {edu.degree}
                    </motion.p>

                    {edu.location && (
                      <motion.div 
                        className="flex items-center gap-1 text-xs text-muted-foreground mb-4"
                        whileHover={{ x: 3 }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </motion.div>
                    )}

                    {edu.honors && (
                      <motion.div 
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.15 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Award className="w-4 h-4 text-accent" />
                        <p className="text-sm text-accent font-medium">
                          {edu.honors}
                        </p>
                      </motion.div>
                    )}

                    {edu.coursework && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 }}
                      >
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                          <BookOpen className="w-3 h-3" />
                          Relevant Coursework
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, courseIndex) => (
                            <motion.span
                              key={course}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{
                                delay: 0.6 + index * 0.15 + courseIndex * 0.05,
                              }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-3 py-1.5 text-xs bg-secondary rounded-lg relative overflow-hidden cursor-default"
                            >
                              {course}
                              <motion.div
                                className="absolute inset-0 bg-accent/10"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Corner accent with pulse */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full"
                  animate={{
                    scale: hoveredEdu === edu.id ? 1.5 : 1,
                    opacity: hoveredEdu === edu.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.article>
            ))}
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <>
              <motion.div 
                className="flex items-center gap-4 mb-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </span>
                <motion.div 
                  className="flex-1 h-px bg-border"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  style={{ transformOrigin: "left" }}
                />
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
                      delay: 1 + index * 0.1,
                      duration: 0.5
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group p-5 bg-card/50 border rounded-xl hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <div className="flex justify-between gap-2 mb-2">
                        <motion.h4 
                          className="text-sm font-medium group-hover:text-accent transition-colors duration-300"
                          whileHover={{ x: 2 }}
                        >
                          {cert.name}
                        </motion.h4>
                        <motion.div
                          whileHover={{ 
                            rotate: 45,
                            scale: 1.2
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                        </motion.div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>

                      {/* Progress bar indicator */}
                      <motion.div
                        className="mt-3 h-1 bg-accent/10 rounded-full overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-accent/30 rounded-full"
                          initial={{ width: "0%" }}
                          animate={isInView ? { width: "100%" } : {}}
                          transition={{
                            delay: 1.2 + index * 0.1,
                            duration: 0.8,
                            ease: "easeOut"
                          }}
                        />
                      </motion.div>
                    </div>
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
