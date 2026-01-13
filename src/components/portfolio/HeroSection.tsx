import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Sparkles, Code, Rocket, Zap } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useEffect, useState, useMemo } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const firstName = personalInfo.name.split(" ")[0];
  const lastName = personalInfo.name.split(" ").slice(1).join(" ");

  // Split firstName into letters for animation
  const firstNameLetters = firstName.split("");
  const lastNameLetters = lastName.split("");

  // ✅ Generate particle positions ONCE (fixes glitchy re-randomization)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center grain overflow-hidden">
      {/* Rich gradient background */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Animated gradient orbs with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          x: useTransform(x, [-0.5, 0.5], [-100, 100]),
          y: useTransform(y, [-0.5, 0.5], [-100, 100]),
        }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)"
          }}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        style={{
          x: useTransform(x, [-0.5, 0.5], [100, -100]),
          y: useTransform(y, [-0.5, 0.5], [100, -100]),
        }}
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            background: "radial-gradient(circle, hsl(var(--muted) / 0.5) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Floating tech icons */}
      {[
        { Icon: Code, pos: { top: "20%", left: "10%" }, delay: 0 },
        { Icon: Rocket, pos: { top: "60%", left: "85%" }, delay: 0.5 },
        { Icon: Zap, pos: { top: "80%", left: "15%" }, delay: 1 },
        { Icon: Sparkles, pos: { top: "15%", right: "15%" }, delay: 1.5 },
      ].map(({ Icon, pos, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-12 h-12 text-accent" />
        </motion.div>
      ))}

      {/* ✅ FIXED: Particle field with stable positions */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Decorative lines with animation */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 md:left-16 top-1/3 w-px h-32 origin-top"
        style={{ 
          background: "linear-gradient(to bottom, hsl(var(--accent) / 0.5), transparent)" 
        }}
      >
        <motion.div
          animate={{
            y: [0, 128, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 md:right-16 bottom-1/3 w-px h-24 origin-bottom"
        style={{ 
          background: "linear-gradient(to top, hsl(var(--accent) / 0.5), transparent)" 
        }}
      >
        <motion.div
          animate={{
            y: [0, -96, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-full h-6 bg-gradient-to-t from-accent to-transparent"
        />
      </motion.div>

      <div className="relative z-10 section-container text-center">
        {/* Pre-title accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div 
            className="divider-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.span 
            className="text-xs font-body uppercase tracking-[0.3em] text-accent flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3 h-3" />
            Portfolio
          </motion.span>
          <motion.div 
            className="divider-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Name with letter-by-letter animation */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight"
          >
            <span className="inline-block">
              {firstNameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 120, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "hsl(var(--accent))",
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block text-gradient cursor-pointer"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground/80"
          >
            <span className="inline-block">
              {lastNameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 120, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.35 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-pointer"
                  style={{ transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* Tagline with typing effect */}
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>
        </div>

        {/* Description with accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <motion.div 
            className="h-px w-8 bg-accent/30"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="font-body text-sm text-muted-foreground tracking-widest uppercase">
            {personalInfo.description}
          </p>
          <motion.div 
            className="h-px w-8 bg-accent/30"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={scrollToAbout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-accent transition-colors duration-500"
        >
          <span className="text-xs font-body uppercase tracking-[0.2em] flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
            Scroll to explore
          </span>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-6 h-10 rounded-full border border-current flex items-start justify-center p-2 relative overflow-hidden">
              <motion.div
                animate={{ 
                  y: [0, 16, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-current"
              />
            </div>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 border border-current rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.button>

        {/* Floating badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {["Open to Work", "Available for Freelance", "Let's Connect"].map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.5 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm text-xs text-accent font-medium"
            >
              {text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
