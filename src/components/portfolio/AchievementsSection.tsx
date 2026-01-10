import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy } from "lucide-react";
import { achievements } from "@/data/portfolio";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-32 relative" style={{ background: "var(--gradient-section)" }}>
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      
      <div className="section-container">
        <div ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">05</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Recognition
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                Achievements
              </h2>
            </div>
          </motion.div>

          {/* Achievements grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group card-premium rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-500">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <span className="text-xs font-body text-accent/80 bg-accent/10 px-2 py-1 rounded">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
