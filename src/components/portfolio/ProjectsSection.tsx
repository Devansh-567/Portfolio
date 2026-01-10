import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 bg-card/30">
      <div className="section-container">
        <div ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
              Selected Work
            </span>
            <div className="divider" />
          </motion.div>

          {/* Featured Projects */}
          <div className="grid gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group relative bg-card border border-border/50 rounded-lg p-8 card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-body bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-300"
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
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-300"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm font-body text-muted-foreground mb-6"
              >
                Other projects
              </motion.p>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.7 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="group p-6 bg-card/50 border border-border/30 rounded-lg hover:border-border transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h4>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </motion.article>
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
