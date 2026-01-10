import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <span>© {currentYear} {personalInfo.name}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-accent fill-accent" /> intention
            </span>
          </div>
          
          <div className="flex items-center gap-8">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-accent transition-colors duration-300 uppercase tracking-widest link-elegant"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-accent transition-colors duration-300 uppercase tracking-widest link-elegant"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-accent transition-colors duration-300 uppercase tracking-widest link-elegant"
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
