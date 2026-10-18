import { useSyncExternalStore } from "react";

export interface CinemaState {
  /** The viewer has taken the controls: scroll is locked, the movement is free to grab. */
  free: boolean;
  /** The auto-scrolling film is playing. */
  film: boolean;
  sound: boolean;
  /** Index into `chapters` of the scene currently on screen. */
  chapter: number;
  /** Intro sequence finished. */
  ready: boolean;
  /** WebGL stage is running. */
  stage: boolean;
}

let state: CinemaState = { free: false, film: false, sound: false, chapter: 0, ready: false, stage: false };
const listeners = new Set<() => void>();

export const cinema = {
  get: () => state,
  set(patch: Partial<CinemaState>) {
    const next = { ...state, ...patch };
    if ((Object.keys(patch) as (keyof CinemaState)[]).every((k) => state[k] === next[k])) return;
    state = next;
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useCinema<T>(select: (s: CinemaState) => T): T {
  return useSyncExternalStore(cinema.subscribe, () => select(state), () => select(state));
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
