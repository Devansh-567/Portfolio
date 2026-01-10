import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{ 
          background: "radial-gradient(circle, hsl(var(--accent) / 0.1), transparent 60%)",
          filter: "blur(60px)"
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{ 
          background: "radial-gradient(circle, hsl(var(--muted)), transparent 60%)",
          filter: "blur(80px)"
        }}
      />
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center" ref={ref}>
          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-tight"
          >
            Let's build something
            <br />
            <span className="text-gradient">meaningful together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed"
          >
            I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow builders.
          </motion.p>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all duration-500"
          >
            <Mail className="w-5 h-5 text-accent" />
            <span className="font-body text-lg text-foreground group-hover:text-accent transition-colors duration-300">
              {personalInfo.email}
            </span>
            <ArrowUpRight className="w-5 h-5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
