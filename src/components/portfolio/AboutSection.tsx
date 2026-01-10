import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "@/data/portfolio";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-card/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
              About
            </span>
            <div className="divider" />
          </motion.div>

          {/* Paragraphs */}
          <div className="space-y-8">
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`font-body text-lg sm:text-xl leading-relaxed ${
                  index === 0 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
