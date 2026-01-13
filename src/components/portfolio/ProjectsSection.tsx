import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Folder,
  Cpu
} from "lucide-react";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Ambient accent */}
      <motion.div
        className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 rounded-full opacity-50 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.05), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">03</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2 flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                Portfolio
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Selected Work
              </h2>
            </div>
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-8 mb-24">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="card-premium rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      background:
                        "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Watermark index */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-10 font-display text-6xl md:text-7xl font-bold text-foreground/[0.03]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-8 h-8 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <Folder className="w-5 h-5 text-accent" />
                          )}
                        </motion.div>

                        {/* Title */}
                        <div>
                          <motion.h3
                            className="font-display text-2xl md:text-3xl font-medium text-foreground"
                            animate={{
                              color:
                                hoveredProject === project.id
                                  ? "hsl(var(--accent))"
                                  : "hsl(var(--foreground))",
                            }}
                          >
                            {project.title}
                          </motion.h3>

                          {/* Underline reveal */}
                          <motion.div
                            className="h-px bg-accent mt-1"
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                hoveredProject === project.id ? "100%" : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-2xl text-lg">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="badge-elegant">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-body text-muted-foreground">
                  More projects
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {otherProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.github || project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:border-accent/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>

                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {project.description}
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

export default ProjectsSection;
