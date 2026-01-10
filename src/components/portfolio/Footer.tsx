import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} {personalInfo.name}. Crafted with intention.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
            >
              LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
