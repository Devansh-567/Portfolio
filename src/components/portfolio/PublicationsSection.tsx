import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolio";

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (publications.length === 0) return null;

  return (
    <section id="publications" className="py-32">
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
              Publications
            </span>
            <div className="divider" />
          </motion.div>

          {/* Publications list */}
          <div className="space-y-8">
            {publications.map((pub, index) => (
              <motion.article
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group"
              >
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 -mx-6 rounded-lg hover:bg-card/50 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {pub.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {pub.venue} · {pub.year}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300 flex-shrink-0 mt-1" />
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
