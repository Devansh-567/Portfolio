import { motion } from "framer-motion";
import { Heart, ArrowUp, Github, Linkedin, Code2, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Code2, href: personalInfo.social.leetcode, label: "LeetCode" },
  ];

  return (
    <footer className="py-12 border-t border-border/30 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.05), transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsl(var(--accent) / 0.05), transparent 50%)",
            "radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.05), transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          style={{
            left: `${20 + i * 15}%`,
            top: "50%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors duration-300 relative group"
          >
            <ArrowUp className="w-5 h-5" />
            <motion.div
              className="absolute inset-0 bg-accent/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          {/* Social links with hover effects */}
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  y: -3
                }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300 relative group"
                aria-label={label}
              >
                <Icon className="w-4 h-4 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Ripple effect on hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-accent/30 rounded-full"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{
                    scale: 1.5,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Divider with animation */}
          <motion.div
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />

          {/* Copyright and signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-muted-foreground font-body"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ©
              </motion.span>
              <span>{currentYear}</span>
              <motion.span 
                className="font-medium text-foreground"
                whileHover={{ 
                  scale: 1.05,
                  color: "hsl(var(--accent))"
                }}
              >
                {personalInfo.name}
              </motion.span>
            </div>
            
            <span className="hidden md:block text-border">·</span>
            
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              Crafted with 
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-3 h-3 text-accent fill-accent" />
              </motion.div>
              and
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="w-3 h-3 text-accent" />
              </motion.div>
              intention
            </motion.span>
          </motion.div>

          {/* Additional links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 text-xs"
          >
            {["Privacy", "Terms", "Sitemap"].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ 
                  scale: 1.1,
                  color: "hsl(var(--accent))"
                }}
                className="text-muted-foreground hover:text-accent transition-colors duration-300 relative group"
              >
                {link}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Built with badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-secondary/30 border border-border/50 text-xs text-muted-foreground flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
            Built with React, TypeScript & Framer Motion
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-tr-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-tl-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </footer>
  );
};

export default Footer;
