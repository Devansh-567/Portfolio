<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { honorCounts, organizations, publications, stack } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";

const useInView = (threshold = 0.4) => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
};

/** A chronograph-style sub-dial. Each tick is one unit, so the dial is literally the count. */
const Register = ({ value, ticks, lit, caption }: { value: string; ticks: number; lit: number; caption: string }) => {
  const [ref, seen] = useInView();
  return (
    <div className="register" ref={ref}>
      <svg viewBox="0 0 120 120" role="img" aria-label={`${value} ${caption}`}>
        <circle className="dial" cx="60" cy="60" r="57" strokeWidth="1" />
        {Array.from({ length: ticks }, (_, i) => {
          const a = (i / ticks) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              className={`tick ${seen && i < lit ? "lit" : ""}`}
              x1={60 + Math.cos(a) * 43}
              y1={60 + Math.sin(a) * 43}
              x2={60 + Math.cos(a) * 52}
              y2={60 + Math.sin(a) * 52}
              style={{ transitionDelay: `${i * 90}ms` }}
            />
          );
        })}
        <text className="num" x="60" y="69">{value}</text>
      </svg>
      <p className="cap">{caption}</p>
    </div>
  );
};

const reviewTerms = organizations.flatMap((o) => (o.id === "uob" ? o.roles : [])).length;

const AboutSection = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scene">
      <div className="wrap">
        <div className="about-grid">
          <div className="block block--scrim" ref={head}>
            <div className="sec-head">
              <span className="numeral">II</span>
              <h2 className="h-section">
                <span className="mask"><span>Careful systems,</span></span>
                <span className="mask"><span>shipped and measured.</span></span>
              </h2>
            </div>
            <div className="prose">
              <p>
                I'm a computer engineering undergraduate at G.H. Raisoni International Skill Tech University in Pune and, since August 2026,
                an R&amp;D intern at CSIR National Chemical Laboratory. My interests sit close to the machine: core systems design,
                time-series data, and a little cryptography.
              </p>
              <p>
                <strong>ChronoMap</strong>, the time-versioned data library I wrote and maintain, has passed 50,000 downloads on PyPI.{" "}
                <strong>Flytora</strong>, a typing game I built on plain HTML5 Canvas, is live at flytora.com.
              </p>
              <p>
                I've finished on the podium {honorCounts.total} times, at {honorCounts.hackathons} hackathons and {honorCounts.events} technical
                competitions. {honorCounts.firstPlaces} of those were first place and {honorCounts.global} came on global stages. I also read other
                people's work: {reviewTerms} terms as an IEEE peer reviewer, alongside {publications.length} papers of my own.
              </p>
            </div>

            <div className="registers">
              <Register value={String(honorCounts.total)} ticks={honorCounts.total} lit={honorCounts.total} caption="podium finishes" />
              <Register value={String(publications.length)} ticks={publications.length} lit={publications.length} caption="papers published" />
              <Register value={String(reviewTerms)} ticks={reviewTerms} lit={reviewTerms} caption="terms as IEEE peer reviewer" />
              <Register value="50k+" ticks={10} lit={5} caption="PyPI downloads, one mark per 10,000" />
            </div>

            <dl className="stack">
              {stack.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
=======
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Quote, Sparkles, Heart } from "lucide-react";
import { about } from "@/data/portfolio";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quoteX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const quoteY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.08), transparent 50%)",
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.15), transparent 60%)",
            "radial-gradient(ellipse at 100% 0%, hsl(var(--accent) / 0.08), transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, `${Math.random() * -100}px`, `${Math.random() * 100}px`],
            x: [null, `${Math.random() * -50}px`, `${Math.random() * 50}px`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="section-container">
        <div className="max-w-4xl" ref={ref}>
          {/* Section header with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mb-16 group"
          >
            <motion.span 
              className="number-accent relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              01
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            <div>
              <motion.span 
                className="text-xs font-body uppercase tracking-[0.3em] text-accent block mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                Introduction
                <motion.div
                  className="h-px bg-accent mt-1"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                About Me
              </h2>
            </div>
          </motion.div>

          {/* Quote decoration with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.08, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ x: quoteX, y: quoteY }}
            className="absolute -left-8 top-48"
          >
            <Quote className="w-24 h-24 text-accent" />
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            {/* Paragraphs with stagger and hover effects */}
            <div className="space-y-8">
              {about.paragraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ x: 5 }}
                  className="group/text relative"
                >
                  <motion.div
                    className="absolute -left-4 top-0 bottom-0 w-1 bg-accent/0 rounded-full"
                    whileHover={{ backgroundColor: "hsl(var(--accent) / 0.5)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <p
                    className={`font-body text-lg leading-[1.8] transition-colors duration-300 ${
                      index === 0 
                        ? "text-foreground text-xl md:text-2xl font-light" 
                        : "text-muted-foreground group-hover/text:text-foreground"
                    }`}
                  >
                    {index === 0 && (
                      <motion.span 
                        className="text-accent font-display text-4xl leading-none mr-2 float-left mt-1"
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        "
                      </motion.span>
                    )}
                    {paragraph}
                    {index === 0 && (
                      <motion.span 
                        className="text-accent font-display text-4xl leading-none ml-1"
                        initial={{ rotate: 10, opacity: 0 }}
                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        "
                      </motion.span>
                    )}
                  </p>
                </motion.div>
              ))}

              {/* Emotional touch - subtle hearts animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center gap-2 pt-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-4 h-4 text-accent/40 fill-accent/20" />
                </motion.div>
                <span className="text-xs text-muted-foreground/60 italic">
                  Crafted with passion and purpose
                </span>
              </motion.div>
            </div>

            {/* Enhanced decorative sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:flex flex-col items-center gap-4"
            >
              <motion.div 
                className="w-px h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
                animate={{ 
                  scaleY: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent/40"
                animate={{ 
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 0 0 hsl(var(--accent) / 0.4)",
                    "0 0 0 8px hsl(var(--accent) / 0)",
                    "0 0 0 0 hsl(var(--accent) / 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="w-px h-32 bg-gradient-to-b from-accent/30 via-border to-transparent"
                animate={{ 
                  scaleY: [1, 0.8, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Sparkle effect */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles className="w-4 h-4 text-accent/20" />
              </motion.div>
            </motion.div>
>>>>>>> origin/main
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
