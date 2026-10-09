/*
 * Deterministic waveform generators for the decorative traces.
 * Everything is seeded so server and client render identical paths.
 * Points are normalized: x and y in [0, 1], y = 1 is the top of the trace.
 */

export type SignalKind = "ecg" | "sparse" | "envelope" | "bars" | "sigmoid" | "steps";

export type Point = [x: number, y: number];

export const VIEW_W = 1000;
export const VIEW_H = 100;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;
const sx = (x: number) => round(x * VIEW_W);
const sy = (y: number) => round((1 - y) * VIEW_H);

export function linePath(points: Point[]): string {
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${sx(x)} ${sy(y)}`)
    .join("");
}

/** Zero-length segments: with round caps and non-scaling stroke they render as circles. */
export function dotsPath(points: Point[]): string {
  return points.map(([x, y]) => `M${sx(x)} ${sy(y)}h0`).join("");
}

export function stepPath(points: Point[]): string {
  return points
    .map(([x, y], i) => {
      if (i === 0) return `M${sx(x)} ${sy(y)}`;
      return `H${sx(x)}V${sy(y)}`;
    })
    .join("");
}

/** Closed symmetric band around y = 0.5 from an amplitude series. */
export function bandPath(points: Point[]): string {
  const top = points.map(([x, a]) => `${sx(x)} ${sy(0.5 + a / 2)}`);
  const bottom = [...points]
    .reverse()
    .map(([x, a]) => `${sx(x)} ${sy(0.5 - a / 2)}`);
  return `M${top.join("L")}L${bottom.join("L")}Z`;
}

export function barsPath(points: Point[], base = 0.06): string {
  return points.map(([x, y]) => `M${sx(x)} ${sy(base)}V${sy(y)}`).join("");
}

/* ---------- ECG: sum of gaussians per beat (P, Q, R, S, T) ---------- */

const ECG_WAVES = [
  { at: 0.2, amp: 0.11, width: 0.03 },
  { at: 0.37, amp: -0.12, width: 0.009 },
  { at: 0.4, amp: 1, width: 0.011 },
  { at: 0.43, amp: -0.26, width: 0.011 },
  { at: 0.66, amp: 0.27, width: 0.045 },
];

export function ecg(beats: number, samplesPerBeat = 90, seed = 7): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  const total = beats * samplesPerBeat;
  const ampJitter = Array.from({ length: beats }, () => 0.92 + rand() * 0.1);
  for (let i = 0; i <= total; i++) {
    const beat = Math.min(Math.floor(i / samplesPerBeat), beats - 1);
    const phase = i / samplesPerBeat - beat;
    let v = 0;
    for (const w of ECG_WAVES) {
      v += w.amp * Math.exp(-((phase - w.at) ** 2) / (2 * w.width ** 2));
    }
    points.push([i / total, 0.3 + 0.6 * v * ampJitter[beat]]);
  }
  return points;
}

/* ---------- Sparse ICU samples: smooth series, ~90% of readings missing ---------- */

export function sparse(seed: number, series = 3, n = 140, keep = 0.12) {
  const rand = mulberry32(seed);
  return Array.from({ length: series }, (_, s) => {
    // Each vital keeps its own band so the series read as separate channels.
    const base = 0.2 + s * 0.27;
    const phase = rand() * Math.PI * 2;
    const observed: Point[] = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const wave = 0.07 * Math.sin(t * Math.PI * (2 + s) + phase);
      const noise = (rand() - 0.5) * 0.05;
      // A physiological decline toward the end, the pattern the model learns.
      const decline = t > 0.62 ? (t - 0.62) * (s === 1 ? -0.45 : 0.4) : 0;
      if (rand() < keep || i === 0) {
        observed.push([t, Math.min(0.95, Math.max(0.05, base + wave + noise + decline))]);
      }
    }
    return observed;
  });
}

/* ---------- Speech amplitude envelope ---------- */

export function envelope(seed: number, n = 220): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  let syllable = 0;
  let gap = 0;
  for (let i = 0; i < n; i++) {
    if (gap > 0) {
      gap--;
      points.push([i / (n - 1), 0.02 + rand() * 0.02]);
      continue;
    }
    if (syllable <= 0) {
      syllable = 6 + Math.floor(rand() * 14);
      if (rand() < 0.22) gap = 4 + Math.floor(rand() * 8);
    }
    syllable--;
    const shape = Math.sin((syllable / 10) * Math.PI) ** 2;
    points.push([i / (n - 1), Math.min(0.85, 0.08 + shape * (0.25 + rand() * 0.4))]);
  }
  return points;
}

/* ---------- Per-frame detection confidence ---------- */

export function bars(seed: number, n = 64): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  let detecting = false;
  for (let i = 0; i < n; i++) {
    if (rand() < 0.15) detecting = !detecting;
    const y = detecting ? 0.62 + rand() * 0.3 : 0.12 + rand() * 0.3;
    points.push([(i + 0.5) / n, y]);
  }
  return points;
}

/* ---------- Risk curve with scattered samples ---------- */

export function sigmoid(seed: number) {
  const rand = mulberry32(seed);
  const curve: Point[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    curve.push([x, 0.08 + 0.84 / (1 + Math.exp(-11 * (x - 0.55)))]);
  }
  const samples: Point[] = [];
  for (let i = 0; i < 46; i++) {
    const x = rand();
    const p = 1 / (1 + Math.exp(-11 * (x - 0.55)));
    const positive = rand() < p;
    samples.push([x, positive ? 0.82 + rand() * 0.1 : 0.08 + rand() * 0.1]);
  }
  return { curve, samples };
}

/* ---------- Stepped cash-flow ---------- */

export function steps(seed: number, n = 26): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  let v = 0.4;
  for (let i = 0; i < n; i++) {
    // Payday jumps, then spending steps down.
    v = i % 8 === 0 ? Math.min(0.9, v + 0.32) : Math.max(0.1, v - rand() * 0.08);
    points.push([i / (n - 1), v]);
  }
  return points;
}
