import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Folder,
} from "lucide-react";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.05), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        <div ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">03</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Portfolio
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Selected Work
              </h2>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-6 mb-20">
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
                className="group"
              >
                <div className="card-premium glow rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  {/* Project number */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-10 font-display text-6xl md:text-7xl font-bold text-foreground/[0.03]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        {/* Image / Icon */}
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center overflow-hidden">
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
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-300"
                            aria-label="View GitHub repository"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-300"
                            aria-label="View live demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-2xl text-lg">
                      {project.description}
                    </p>

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

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-sm font-body text-muted-foreground">
                  More projects
                </span>
                <div className="flex-1 h-px bg-border" />
              </motion.div>

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
                      delay: 0.7 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:border-accent/30 hover:bg-card transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
