import { useMemo, useState } from "react";

type Ev = { t: string; op: "set" | "delete" | "rollback"; key?: string; value?: string; to?: number };

const BASE: Ev[] = [
  { t: "09:00", op: "set", key: "region", value: '"eu-west"' },
  { t: "09:04", op: "set", key: "timeout", value: "30" },
  { t: "09:10", op: "set", key: "replicas", value: "2" },
  { t: "09:21", op: "set", key: "timeout", value: "45" },
  { t: "09:37", op: "set", key: "replicas", value: "5" },
  { t: "09:52", op: "delete", key: "region" },
];
const KEYS = ["region", "timeout", "replicas"];

const snapshots = (events: Ev[]) => {
  const out: Record<string, string>[] = [];
  let state: Record<string, string> = {};
  events.forEach((e) => {
    if (e.op === "set") state = { ...state, [e.key!]: e.value! };
    else if (e.op === "delete") {
      state = { ...state };
      delete state[e.key!];
    } else state = out[e.to!];
    out.push(state);
  });
  return out;
};

const addMinutes = (t: string, n: number) => {
  const [h, m] = t.split(":").map(Number);
  const total = h * 60 + m + n;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

/** A small sketch of the ChronoMap idea: every write is kept, any moment can be read back, and a rollback is itself recorded. */
const ChronoDemo = () => {
  const [events, setEvents] = useState<Ev[]>(BASE);
  const [cursor, setCursor] = useState(BASE.length - 1);
  const snaps = useMemo(() => snapshots(events), [events]);
  const now = snaps[cursor];
  const before = cursor > 0 ? snaps[cursor - 1] : {};
  const last = events.length - 1;

  const rollback = () => {
    const ev: Ev = { t: addMinutes(events[last].t, 7), op: "rollback", to: cursor };
    setEvents([...events, ev]);
    setCursor(events.length);
  };

  return (
    <div className="bench hist">
      <div className="hist__rail">
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={cursor}
          onChange={(e) => setCursor(Number(e.target.value))}
          aria-label="Move through the history"
          aria-valuetext={`Event ${cursor + 1} of ${events.length}, at ${events[cursor].t}`}
        />
        <div className="hist__ticks" aria-hidden="true">
          {events.map((e, i) => (
            <span key={i} className={i === cursor ? "on" : ""}>{e.t}</span>
          ))}
        </div>
      </div>

      <div className="hist__cols">
        <table>
          <caption style={{ display: "none" }}>Values at {events[cursor].t}</caption>
          <thead>
            <tr><th>Key</th><th>Value at {events[cursor].t}</th></tr>
          </thead>
          <tbody>
            {KEYS.map((k) => (
              <tr key={k}>
                <td className="k">{k}</td>
                <td className={now[k] !== before[k] ? "chg" : ""}>{k in now ? now[k] : <span className="gone">absent</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ol className="log" aria-label="Audit trail">
          {events.map((e, i) => (
            <li key={i} className={`${i < cursor ? "past" : ""} ${i === cursor ? "cur" : ""} ${e.op === "rollback" ? "rb" : ""}`}>
              <time>{e.t}</time>
              <span>
                {e.op === "set" && `set ${e.key} = ${e.value}`}
                {e.op === "delete" && `delete ${e.key}`}
                {e.op === "rollback" && `rollback to ${events[e.to!].t}`}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="hist__actions">
        <button className="btn btn--sm" onClick={rollback} disabled={cursor === last}>Roll back to here</button>
        {events.length > BASE.length && (
          <button className="btn btn--sm" onClick={() => { setEvents(BASE); setCursor(BASE.length - 1); }}>Reset</button>
        )}
      </div>
      <p className="small bench__cap">Drag the brass wheel to read the store as it stood at any moment. A rollback is added to the trail rather than erasing it.</p>
    </div>
  );
};

export default ChronoDemo;
