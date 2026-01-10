import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { achievements } from "@/data/portfolio";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-32 bg-card/30">
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
              Achievements
            </span>
            <div className="divider" />
          </motion.div>

          {/* Achievements grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="p-6 bg-card border border-border/50 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {achievement.title}
                  </h3>
                  <span className="text-xs font-body text-muted-foreground">
                    {achievement.year}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
