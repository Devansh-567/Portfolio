import { motion } from "framer-motion";
import { Download, Github, Linkedin, Code2, Mail, Menu } from "lucide-react";
import { useState } from "react";
import { personalInfo, navigation } from "@/data/portfolio";

const Quickbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const socialLinks = [
    { icon: Download, href: personalInfo.resumeUrl, label: "Resume", download: true },
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Code2, href: personalInfo.social.leetcode, label: "LeetCode" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between backdrop-blur-xl bg-background/70 border border-border/50 rounded-2xl px-5 py-3 shadow-sm"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-xl font-medium text-foreground hover:text-accent transition-colors duration-300 tracking-tight"
            >
              <span className="text-gradient">DS</span>
            </button>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-1">
              {socialLinks.slice(0, 4).map(({ icon: Icon, href, label, download }) => (
                <a
                  key={label}
                  href={href}
                  target={download ? undefined : "_blank"}
                  rel={download ? undefined : "noopener noreferrer"}
                  download={download ? "Devansh_Singh_Resume.pdf" : undefined}
                  className="p-2.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-300 ml-1"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, y: 0, pointerEvents: "auto" as const } : { opacity: 0, y: -10, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 left-4 right-4 z-40 lg:hidden"
      >
        <div className="backdrop-blur-xl bg-background/95 border border-border/50 rounded-2xl p-4 shadow-lg"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <div className="grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all duration-300 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Quickbar;
