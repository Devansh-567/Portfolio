import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const firstName = personalInfo.name.split(" ")[0];
  const lastName = personalInfo.name.split(" ").slice(1).join(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center grain overflow-hidden">
      {/* Rich gradient background */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Animated gradient orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full float-slow"
        style={{ 
          background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full float-slower"
        style={{ 
          background: "radial-gradient(circle, hsl(var(--muted) / 0.5) 0%, transparent 70%)",
          filter: "blur(60px)"
        }}
      />

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.06, rotate: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute top-20 left-10 md:left-20"
      >
        <Sparkles className="w-8 h-8 text-accent" />
      </motion.div>
      
      {/* Decorative lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 md:left-16 top-1/3 w-px h-32 origin-top"
        style={{ background: "linear-gradient(to bottom, hsl(var(--accent) / 0.3), transparent)" }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 md:right-16 bottom-1/3 w-px h-24 origin-bottom"
        style={{ background: "linear-gradient(to top, hsl(var(--accent) / 0.3), transparent)" }}
      />

      <div className="relative z-10 section-container text-center">
        {/* Pre-title accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="divider-accent" />
          <span className="text-xs font-body uppercase tracking-[0.3em] text-accent">
            Portfolio
          </span>
          <div className="divider-accent" />
        </motion.div>

        {/* Name - Split for visual interest */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight"
          >
            <span className="text-gradient">{firstName}</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground/80"
          >
            {lastName}
          </motion.h1>
        </div>

        {/* Tagline with elegant styling */}
        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>
        </div>

        {/* Description with accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px w-8 bg-accent/30" />
          <p className="font-body text-sm text-muted-foreground tracking-widest uppercase">
            {personalInfo.description}
          </p>
          <div className="h-px w-8 bg-accent/30" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToAbout}
          className="group inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-accent transition-colors duration-500"
        >
          <span className="text-xs font-body uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-current flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-current"
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
