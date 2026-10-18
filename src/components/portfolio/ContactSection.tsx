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
      </div>
    </section>
  );
};

export default ContactSection;
