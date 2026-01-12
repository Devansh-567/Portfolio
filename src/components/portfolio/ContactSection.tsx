import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("https://formspree.io/f/xvzzpyya", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("Message sent successfully!");
      e.currentTarget.reset();
    } else {
      setStatus("Oops, something went wrong.");
    }
  };

  return (
    <section id="contact" className="py-32 relative" style={{ background: "var(--gradient-section)" }}>
      <div className="section-container max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-accent" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-6 leading-tight"
        >
          Let's build something <br />
          <span className="text-gradient">meaningful together.</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 grid gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="px-4 py-3 rounded-xl border border-border bg-card text-foreground"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="px-4 py-3 rounded-xl border border-border bg-card text-foreground"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="px-4 py-3 rounded-xl border border-border bg-card text-foreground"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-accent text-primary hover:bg-accent/90 transition"
          >
            Send Message
          </button>
        </motion.form>

        {status && <p className="mt-4 text-muted-foreground">{status}</p>}
      </div>
    </section>
  );
};

export default ContactSection;
