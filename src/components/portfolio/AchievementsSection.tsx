import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { achievements } from "@/data/portfolio";

const AchievementsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (achievements.length === 0) return null;

  return (
    <section
      id="achievements"
      className="py-32 relative"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="section-container">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <span className="number-accent">05</span>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent block mb-2">
                Recognition
              </span>
              <h2 className="text-3xl md:text-4xl font-medium">
                Achievements
              </h2>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-premium rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  {/* Medal Image */}
                  {item.medalImage && (
                    <img
                      src={item.medalImage}
                      alt={`${item.title} medal`}
                      className="w-12 h-12 object-contain flex-shrink-0"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between gap-4 mb-2">
                      <h3 className="text-lg font-medium">
                        {item.title}
                      </h3>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>

                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </div>
                    )}
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
