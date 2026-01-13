import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Quote, Sparkles, Heart } from "lucide-react";
import { about } from "@/data/portfolio";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quoteX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const quoteY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.08), transparent 50%)",
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.15), transparent 60%)",
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.08), transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, `${Math.random() * -100}px`, `${Math.random() * 100}px`],
            x: [null, `${Math.random() * -50}px`, `${Math.random() * 50}px`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="section-container">
        <div className="max-w-4xl" ref={ref}>
          {/* Section header with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16 group"
          >
            <motion.span 
              className="number-accent relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              01
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            <div>
              <motion.span 
                className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                Introduction
                <motion.div
                  className="h-px bg-accent mt-1"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                About Me
              </h2>
            </div>
          </motion.div>

          {/* Quote decoration with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ x: quoteX, y: quoteY }}
            className="absolute -left-8 top-48"
          >
            <Quote className="w-24 h-24 text-accent" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            {/* Paragraphs with stagger and hover effects */}
            <div className="space-y-8">
              {about.paragraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ x: 5 }}
                  className="group/text relative"
                >
                  <motion.div
                    className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/0 rounded-full"
                    whileHover={{ backgroundColor: "hsl(var(--accent) / 0.5)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <p
                    className={`font-body text-lg leading-[1.8] transition-colors duration-300 ${
                      index === 0 
                        ? "text-foreground text-xl md:text-2xl font-light" 
                        : "text-muted-foreground group-hover/text:text-foreground"
                    }`}
                  >
                    {index === 0 && (
                      <motion.span 
                        className="text-accent font-display text-4xl leading-none mr-2 float-left mt-1"
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        "
                      </motion.span>
                    )}
                    {paragraph}
                    {index === 0 && (
                      <motion.span 
                        className="text-accent font-display text-4xl leading-none ml-1"
                        initial={{ rotate: 10, opacity: 0 }}
                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        "
                      </motion.span>
                    )}
                  </p>
                </motion.div>
              ))}

              {/* Emotional touch - subtle hearts animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center gap-2 pt-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-4 h-4 text-accent/40 fill-accent/20" />
                </motion.div>
                <span className="text-xs text-muted-foreground/60 italic">
                  Crafted with passion and purpose
                </span>
              </motion.div>
            </div>

            {/* Enhanced decorative sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:flex flex-col items-center gap-4"
            >
              <motion.div 
                className="w-px h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
                animate={{ 
                  scaleY: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent/40"
                animate={{ 
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 0 0 hsl(var(--accent) / 0.4)",
                    "0 0 0 8px hsl(var(--accent) / 0)",
                    "0 0 0 0 hsl(var(--accent) / 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="w-px h-32 bg-gradient-to-b from-accent/30 via-border to-transparent"
                animate={{ 
                  scaleY: [1, 0.8, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Sparkle effect */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles className="w-4 h-4 text-accent/20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
