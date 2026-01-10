import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center grain overflow-hidden">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--hero-gradient)" }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 section-container text-center">
        {/* Name */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground"
          >
            {personalInfo.name}
          </motion.h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            {personalInfo.tagline}
          </motion.p>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-sm sm:text-base text-muted-foreground/70 tracking-wide uppercase mb-12"
        >
          {personalInfo.description}
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToAbout}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <span className="text-xs font-body uppercase tracking-widest">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-accent blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-foreground blur-3xl pointer-events-none"
      />
    </section>
  );
};

export default HeroSection;
