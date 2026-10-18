import { useCallback, useEffect, useRef, useState } from "react";

const W = 640;
const H = 360;
const WORDS = ["fly", "wing", "sky", "type", "key", "fast", "nest", "glide", "cloud", "swift", "wind", "soar", "rise", "air", "dive", "lift", "bird", "flap", "gust"];
const SPEED = 95, SPACING = 250, WALL_W = 56, GAP = 184, BX = 150, BR = 11, GRAV = 175, FLAP = -125, CAP = 260;

interface Game {
  y: number; vy: number; walls: { x: number; gapY: number; passed: boolean }[]; word: string; typed: number;
  score: number; chars: number; elapsed: number; flash: number; flap: number; phase: "idle" | "play" | "over";
}
const pick = (prev?: string) => {
  let w = WORDS[Math.floor(Math.random() * WORDS.length)];
  while (w === prev) w = WORDS[Math.floor(Math.random() * WORDS.length)];
  return w;
};
const fresh = (): Game => ({
  y: H / 2, vy: 0, walls: [{ x: W + 60, gapY: H / 2, passed: false }, { x: W + 60 + SPACING, gapY: 150 + Math.random() * 60, passed: false }],
  word: pick(), typed: 0, score: 0, chars: 0, elapsed: 0, flash: 0, flap: 0, phase: "idle",
});

/** A small homage to Flytora in this site's palette: type the word to flap, fly through the gaps. */
const TypeDemo = () => {
  const cv = useRef<HTMLCanvasElement>(null);
  const g = useRef<Game>(fresh());
  const visible = useRef(true);
  const [ui, setUi] = useState({ phase: "idle" as Game["phase"], score: 0, wpm: 0, best: 0 });
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const draw = useCallback(() => {
    const c = cv.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const s = g.current;
    const dpr = c.width / W;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#1a1410");
    bg.addColorStop(1, "#0d0906");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(214,190,150,0.08)";
    ctx.lineWidth = 1;
    for (let x = ((-s.elapsed * 20) % 40) + 40; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, H - 18); ctx.lineTo(x, H); ctx.stroke(); }

    for (const w of s.walls) {
      const top = w.gapY - GAP / 2, bot = w.gapY + GAP / 2;
      const grd = ctx.createLinearGradient(w.x, 0, w.x + WALL_W, 0);
      grd.addColorStop(0, "#8a6a3a"); grd.addColorStop(0.45, "#d9b574"); grd.addColorStop(1, "#7a5c30");
      ctx.fillStyle = grd;
      ctx.fillRect(w.x, 0, WALL_W, top);
      ctx.fillRect(w.x, bot, WALL_W, H - bot);
      ctx.fillStyle = "#e8c98c";
      ctx.fillRect(w.x - 4, top - 10, WALL_W + 8, 10);
      ctx.fillRect(w.x - 4, bot, WALL_W + 8, 10);
    }

    // bird
    ctx.save();
    ctx.translate(BX, s.y);
    ctx.rotate(Math.max(-0.5, Math.min(0.7, s.vy / 260)));
    ctx.fillStyle = "#ece3d3";
    ctx.beginPath(); ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#cf9378";
    ctx.beginPath(); ctx.moveTo(12, -2); ctx.lineTo(21, 1); ctx.lineTo(12, 4); ctx.closePath(); ctx.fill();
    const wing = Math.sin(s.flap * 14) * 9 * Math.min(1, s.flap * 3);
    ctx.fillStyle = "#cba264";
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(-14, -12 - wing, -2, -16 - wing); ctx.quadraticCurveTo(2, -6, 4, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#120e0a";
    ctx.beginPath(); ctx.arc(7, -3, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // word
    ctx.font = "500 30px 'Playfair Display', Georgia, serif";
    ctx.textBaseline = "alphabetic";
    const total = ctx.measureText(s.word).width;
    let x = W / 2 - total / 2;
    for (let i = 0; i < s.word.length; i++) {
      ctx.fillStyle = i < s.typed ? "#cba264" : s.flash > 0 ? "#d98a7d" : "#b9ad9b";
      ctx.fillText(s.word[i], x, 46);
      x += ctx.measureText(s.word[i]).width;
    }
    ctx.font = "500 13px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#b9ad9b";
    ctx.textAlign = "right";
    ctx.fillText(`${s.score} gaps`, W - 16, 24);
    ctx.textAlign = "left";

    if (s.phase !== "play") {
      ctx.fillStyle = "rgba(13,9,6,0.62)";
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.fillStyle = "#ece3d3";
      ctx.font = "italic 400 28px 'Playfair Display', Georgia, serif";
      ctx.fillText(s.phase === "idle" ? "Type each word to flap." : `Crashed after ${s.score} ${s.score === 1 ? "gap" : "gaps"}.`, W / 2, H / 2 - 4);
      ctx.fillStyle = "#b9ad9b";
      ctx.font = "400 14px Inter, system-ui, sans-serif";
      ctx.fillText(s.phase === "idle" ? "Press start, then keep the bird in the gaps." : "Press play again to try for more.", W / 2, H / 2 + 24);
      ctx.textAlign = "left";
    }
  }, []);

  const finish = useCallback(() => {
    const s = g.current;
    s.phase = "over";
    const wpm = s.elapsed > 1 ? Math.round(s.chars / 5 / (s.elapsed / 60)) : 0;
    setUi((u) => ({ phase: "over", score: s.score, wpm, best: Math.max(u.best, s.score) }));
    draw();
  }, [draw]);

  const start = () => {
    g.current = fresh();
    g.current.phase = "play";
    g.current.vy = FLAP;
    setUi((u) => ({ ...u, phase: "play", score: 0, wpm: 0 }));
  };

  useEffect(() => {
    const c = cv.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr;
    c.height = H * dpr;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.1 });
    io.observe(c);
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const s = g.current;
      if (s.phase !== "play" || !visible.current || document.hidden) return;
      s.elapsed += dt;
      s.flash = Math.max(0, s.flash - dt);
      s.flap = Math.max(0, s.flap - dt);
      s.vy = Math.min(CAP, s.vy + GRAV * dt);
      s.y += s.vy * dt;
      for (const w of s.walls) w.x -= SPEED * dt;
      const first = s.walls[0];
      if (first.x + WALL_W < -10) {
        s.walls.shift();
        const lastW = s.walls[s.walls.length - 1];
        s.walls.push({ x: lastW.x + SPACING, gapY: 120 + Math.random() * 120, passed: false });
      }
      for (const w of s.walls) {
        if (!w.passed && w.x + WALL_W < BX - BR) {
          w.passed = true;
          s.score++;
          setUi((u) => ({ ...u, score: s.score }));
        }
        const inX = BX + BR > w.x && BX - BR < w.x + WALL_W;
        if (inX && (s.y - BR < w.gapY - GAP / 2 || s.y + BR > w.gapY + GAP / 2)) return finish();
      }
      if (s.y + BR > H - 4 || s.y - BR < -30) return finish();
      draw();
    };
    raf = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => {
      const s = g.current;
      if (s.phase !== "play") return;
      if (e.key === "Escape") return finish();
      if (e.ctrlKey || e.metaKey || e.altKey || !/^[a-z]$/i.test(e.key)) return;
      const k = e.key.toLowerCase();
      if (k === s.word[s.typed]) {
        s.typed++;
        s.chars++;
        if (s.typed === s.word.length) {
          s.vy = FLAP;
          s.flap = 0.45;
          s.word = pick(s.word);
          s.typed = 0;
          s.chars++; // the space between words
        }
      } else {
        s.typed = 0;
        s.flash = 0.25;
      }
    };
    window.addEventListener("keydown", onKey);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [draw, finish]);

  return (
    <div className="bench tt">
      <canvas ref={cv} role="img" aria-label="A small typing game: type the word shown to make the bird flap through gaps in brass walls." />
      <div className="tt__bar">
        <button className="btn btn--solid btn--sm" onClick={start}>
          {ui.phase === "play" ? "Restart" : ui.phase === "over" ? "Play again" : "Start"}
        </button>
        <p className="stats" aria-live="polite">
          <span>Gaps <b>{ui.score}</b></span>
          <span>Best <b>{ui.best}</b></span>
          {ui.phase === "over" && <span>Speed <b>{ui.wpm}</b> wpm</span>}
        </p>
      </div>
      <p className="small bench__cap">
        A taste of the idea in this site's colours. {touch ? "It needs a physical keyboard. " : ""}The real game, with skins, power-ups and a leaderboard, lives at flytora.com.
      </p>
    </div>
  );
};

export default TypeDemo;
