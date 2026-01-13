import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, ArrowUpRight, Trophy, Award, Star } from "lucide-react";
import { achievements } from "@/data/portfolio";

const AchievementsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (achievements.length === 0) return null;

  return (
    <section
      id="achievements"
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      {/* Animated constellation background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating trophy icons */}
      <motion.div
        className="absolute top-20 right-20 opacity-5"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Trophy className="w-32 h-32 text-accent" />
      </motion.div>

      <div className="section-container relative z-10">
        <div ref={ref}>
          {/* Header with award icon animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-20"
          >
            <motion.span 
              className="number-accent relative"
              whileHover={{ scale: 1.1 }}
            >
              05
              <motion.div
                className="absolute -inset-2 bg-accent/10 rounded-full blur-lg"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.span>
            <div>
              <motion.span 
                className="text-xs uppercase tracking-[0.3em] text-accent block mb-2 flex items-center gap-2"
              >
                <Award className="w-3 h-3" />
                Recognition
                <motion.div
                  className="h-px bg-accent flex-1 max-w-[50px]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-medium">
                Achievements
              </h2>
            </div>
          </motion.div>

          {/* Grid with enhanced cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group block card-premium rounded-xl p-6 md:p-8 relative overflow-hidden"
              >
                {/* Animated gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0"
                  animate={{ 
                    opacity: hoveredId === item.id ? 1 : 0,
                    scale: hoveredId === item.id ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Sparkle effect on hover */}
                {hoveredId === item.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ 
                          x: Math.random() * 100,
                          y: Math.random() * 100,
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [null, -50]
                        }}
                        transition={{ 
                          duration: 1,
                          delay: i * 0.2,
                          repeat: Infinity
                        }}
                      >
                        <Star className="w-3 h-3 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </>
                )}

                <div className="flex items-start gap-4 relative z-10">
                  {/* Medal Image with glow */}
                  {item.medalImage ? (
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={item.medalImage}
                        alt={`${item.title} medal`}
                        className="w-12 h-12 object-contain flex-shrink-0"
                      />
                      <motion.div
                        className="absolute inset-0 bg-accent/30 rounded-full blur-lg"
                        animate={{ 
                          scale: hoveredId === item.id ? 1.5 : 1,
                          opacity: hoveredId === item.id ? 0.6 : 0
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Trophy className="w-6 h-6 text-accent" />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <motion.h3 
                        className="text-lg font-medium group-hover:text-accent transition-colors duration-300"
                        animate={{ 
                          x: hoveredId === item.id ? 5 : 0
                        }}
                      >
                        {item.title}
                      </motion.h3>
                      {/* Year Badge with pulse */}
                      <motion.span 
                        className="text-xs bg-accent/10 text-accent px-3 py-1 rounded flex-shrink-0 relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.year}
                        <motion.div
                          className="absolute inset-0 bg-accent/20 rounded"
                          animate={{ 
                            scale: hoveredId === item.id ? [1, 1.1, 1] : 1,
                            opacity: hoveredId === item.id ? [0.5, 0, 0.5] : 0
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.span>
                    </div>

                    <motion.p 
                      className="text-sm text-muted-foreground mb-2"
                      animate={{ 
                        opacity: hoveredId === item.id ? 1 : 0.8
                      }}
                    >
                      {item.description}
                    </motion.p>

                    {item.location && (
                      <motion.div 
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        whileHover={{ x: 3 }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </motion.div>
                    )}

                    {item.link && (
                      <motion.div 
                        className="mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <span className="text-accent text-xs flex items-center gap-1 group-hover:underline">
                          View Details 
                          <motion.div
                            animate={{ 
                              x: hoveredId === item.id ? 3 : 0,
                              y: hoveredId === item.id ? -3 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.div>
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full"
                  animate={{ 
                    scale: hoveredId === item.id ? 1.5 : 1,
                    opacity: hoveredId === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Celebration confetti effect */}
          {isInView && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-accent/30 rounded-full"
                  initial={{ 
                    x: `${50}%`,
                    y: `${50}%`,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 1 + i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
