import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { about } from "@/data/portfolio";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.08), transparent 50%)" }}
      />
      
      <div className="section-container">
        <div className="max-w-4xl" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="number-accent">01</span>
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2">
                Introduction
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                About Me
              </h2>
            </div>
          </motion.div>

          {/* Quote decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -left-8 top-48"
          >
            <Quote className="w-24 h-24 text-accent" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            {/* Paragraphs */}
            <div className="space-y-8">
              {about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`font-body text-lg leading-[1.8] ${
                    index === 0 
                      ? "text-foreground text-xl md:text-2xl font-light" 
                      : "text-muted-foreground"
                  }`}
                >
                  {index === 0 && (
                    <span className="text-accent font-display text-4xl leading-none mr-2 float-left mt-1">
                      "
                    </span>
                  )}
                  {paragraph}
                  {index === 0 && (
                    <span className="text-accent font-display text-4xl leading-none ml-1">
                      "
                    </span>
                  )}
                </motion.p>
              ))}
            </div>

            {/* Decorative sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:flex flex-col items-center gap-4"
            >
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-accent/40" />
              <div className="w-px h-32 bg-gradient-to-b from-accent/30 via-border to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
