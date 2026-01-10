import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-card/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center" ref={ref}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="divider" />
            <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
              Get in Touch
            </span>
            <div className="divider" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-6"
          >
            Let's build something meaningful together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow builders.
          </motion.p>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group inline-flex items-center gap-2 font-body text-lg text-foreground hover:text-accent transition-colors duration-300"
          >
            <span className="link-underline">{personalInfo.email}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
