// A single synthesised escapement tick. No audio files are shipped.
let ctx: AudioContext | null = null;
let enabled = false;
let noise: AudioBuffer | null = null;

export function setSound(on: boolean) {
  enabled = on;
  if (!on) return;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    const len = Math.floor(ctx.sampleRate * 0.035);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  if (ctx.state === "suspended") ctx.resume();
}

export function tick(strength = 1) {
  if (!enabled || !ctx || !noise) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 3100 + Math.random() * 500;
  band.Q.value = 2.4;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.16 * strength, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
  src.connect(band).connect(g).connect(ctx.destination);
  src.start(t);

  const o = ctx.createOscillator();
  const og = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(210, t);
  og.gain.setValueAtTime(0.05 * strength, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(og).connect(ctx.destination);
  o.start(t);
  o.stop(t + 0.06);
}
