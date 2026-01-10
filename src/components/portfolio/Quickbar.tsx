import { motion } from "framer-motion";
import { Download, Github, Linkedin, Code2, Mail } from "lucide-react";
import { personalInfo, navigation } from "@/data/portfolio";

const Quickbar = () => {
  const socialLinks = [
    { icon: Download, href: personalInfo.resumeUrl, label: "Resume", download: true },
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Code2, href: personalInfo.social.leetcode, label: "LeetCode" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between backdrop-blur-md bg-background/80 border border-border/50 rounded-full px-6 py-3 shadow-sm">
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-lg font-medium text-foreground hover:text-accent transition-colors duration-300"
          >
            DS
          </button>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ icon: Icon, href, label, download }) => (
              <a
                key={label}
                href={href}
                target={download ? undefined : "_blank"}
                rel={download ? undefined : "noopener noreferrer"}
                download={download ? "Devansh_Singh_Resume.pdf" : undefined}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Quickbar;
