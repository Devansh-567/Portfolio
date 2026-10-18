
import { useEffect, useState } from "react";
import { Download, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useReveal } from "@/lib/useReveal";
import { goTo } from "./Quickbar";

const Clock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: personalInfo.timeZone }).format(now);
  return <span className="clock" aria-label="Current time in Pune">{t} IST</span>;
};

const ContactSection = () => {
  const head = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xvzzpyya", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        form.reset();
        setStatus("ok");
      } else setStatus("err");
    } catch {
      setStatus("err");

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Send, Check, AlertCircle, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xvzzpyya", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);

    }
  };

  return (

    <section id="contact" className="scene scene--tall">
      <div className="wrap">
        <div className="contact">
          <div className="block block--scrim" ref={head}>
            <div className="sec-head">
              <span className="numeral">IX</span>
              <h2 className="h-section">
                <span className="mask"><span>Let's build something</span></span>
                <span className="mask"><span>meaningful together.</span></span>
              </h2>
            </div>
            <p className="lede">For research, internships, open-source work or a game worth building, write to me. I read everything.</p>
            <div className="direct">
              <a href={`mailto:${personalInfo.email}`} className="link"><span className="k">Email</span>{personalInfo.email}</a>
              <p><span className="k">Based in</span>{personalInfo.location}</p>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="link"><span className="k">GitHub</span>Devansh-567</a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="link"><span className="k">LinkedIn</span>devansh050607</a>
              <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" className="link"><span className="k">LeetCode</span>Devansh</a>
            </div>
            <a className="resume" href={personalInfo.resumeUrl} download={personalInfo.resumeFile}>
              <Download />
              <span>
                <b>Download my résumé</b>
                PDF, updated {personalInfo.resumeUpdated}
              </span>
            </a>
          </div>

          <form className="form block" onSubmit={submit}>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input id="c-name" type="text" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Your email</label>
              <input id="c-email" type="email" name="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" name="message" rows={5} required />
            </div>
            <div>
              <button className="btn btn--solid" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : "Send message"} <Send />
              </button>
            </div>
            <p className={`status ${status === "ok" ? "ok" : status === "err" ? "err" : ""}`} role="status">
              {status === "ok" && "Message sent. I'll reply soon."}
              {status === "err" && `That did not send. Try again, or write to ${personalInfo.email}.`}
            </p>
          </form>
        </div>

        <footer className="foot block">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <span>{personalInfo.location}: <Clock /></span>
          <button onClick={() => goTo("top")}>Back to the start</button>
        </footer>

    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${50 + i * 20}% ${50 + i * 10}%, hsl(var(--accent) / 0.1), transparent 50%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating message icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        >
          <MessageCircle className="w-8 h-8 text-accent/20" />
        </motion.div>
      ))}

      <div className="section-container max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        {/* Icon with pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <motion.div 
            className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Sparkles className="w-7 h-7 text-accent" />
            <motion.div
              className="absolute inset-0 bg-accent/20 rounded-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Heading with gradient text animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-tight"
        >
          Let's build something <br />
          <motion.span 
            className="text-gradient inline-block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            meaningful together.
          </motion.span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground mb-8"
        >
          Have a project in mind? Let's chat and make it happen.
        </motion.p>

        {/* Form with enhanced interactions */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 grid gap-4"
        >
          {/* Name Input */}
          <motion.div 
            className="relative"
            whileFocus={{ scale: 1.02 }}
          >
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Email Input */}
          <motion.div 
            className="relative"
            whileFocus={{ scale: 1.02 }}
          >
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Message Textarea */}
          <motion.div 
            className="relative"
            whileFocus={{ scale: 1.02 }}
          >
            <motion.textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Submit Button with loading states */}
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden
              ${status === "sending" ? "bg-accent/70 cursor-not-allowed" : "bg-accent hover:bg-accent/90"}
              text-primary flex items-center justify-center gap-2
            `}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: status === "sending" ? ["-100%", "200%"] : "-100%",
              }}
              transition={{
                duration: 1.5,
                repeat: status === "sending" ? Infinity : 0,
                ease: "linear"
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              {status === "idle" && (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Sending...
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                </>
              )}
              {status === "success" && (
                <>
                  Sent Successfully!
                  <Check className="w-4 h-4" />
                </>
              )}
              {status === "error" && (
                <>
                  Try Again
                  <AlertCircle className="w-4 h-4" />
                </>
              )}
            </span>
          </motion.button>
        </motion.form>

        {/* Status Messages with animations */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2 text-green-500">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
              <p className="font-medium">Message sent! I'll get back to you soon.</p>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">Oops! Something went wrong. Please try again.</p>
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

      </div>
    </section>
  );
};

export default ContactSection;
