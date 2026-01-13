import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Code2,
  Mail,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { personalInfo, navigation } from "@/data/portfolio";

const Quickbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(0,0,0,0.35)", "rgba(0,0,0,0.75)"]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Download, href: personalInfo.resumeUrl, label: "Resume", download: true },
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Code2, href: personalInfo.social.leetcode, label: "LeetCode" },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress – subtle */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-accent/40 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            style={{ backgroundColor }}
            animate={{
              backdropFilter: isScrolled ? "blur(18px)" : "blur(10px)"
            }}
            className="flex items-center justify-between border border-border/50 rounded-2xl px-5 py-3 shadow-xl relative"
          >
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="font-display text-lg font-medium text-foreground flex items-center gap-2"
            >
              <span>Devansh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </motion.button>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ y: -1 }}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Social + mobile */}
            <div className="flex items-center gap-1">
              {socialLinks.map(({ icon: Icon, href, label, download }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target={download ? undefined : "_blank"}
                  rel={download ? undefined : "noopener noreferrer"}
                  download={download ? "Devansh_Singh_Resume.pdf" : undefined}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  whileHover={{ y: -1 }}
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl ml-1"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          isMenuOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -20, pointerEvents: "none" }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-20 left-4 right-4 z-40 lg:hidden"
      >
        <div className="backdrop-blur-xl bg-black/85 border border-border/50 rounded-2xl p-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navigation.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08 }}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl text-left"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent/15 hover:bg-accent/25 text-accent rounded-xl transition-all"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Get in touch</span>
          </a>
        </div>
      </motion.div>

      {/* Overlay */}
      <motion.div
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-sm"
      />
    </>
  );
};

export default Quickbar;
