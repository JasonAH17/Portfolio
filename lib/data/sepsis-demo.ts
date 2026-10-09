/*
 * SIMULATED DATA for the hero's recreated Sepsis Guard monitor.
 * These values are scripted for the animation only. They are not patient data
 * and not model output; the UI labels them "Simulated · Demo data".
 * Status names and the 6-hour prediction window mirror the real Sepsis Guard dashboard.
 */

export type DemoStatus = "Stable" | "Moderate" | "High risk" | "Critical";

export type DemoFrame = {
  /** Sepsis probability, 0..1 */
  risk: number;
  sofa: number;
  /** Time until the risk crosses the alert threshold, "H:MM" */
  toAlert: string;
  hr: number;
};

export const ALERT_THRESHOLD = 0.6;

/** One frame per second; the loop holds on the alert, then resets. */
export const demoFrames: DemoFrame[] = [
  { risk: 0.22, sofa: 3, toAlert: "4:30", hr: 88 },
  { risk: 0.24, sofa: 3, toAlert: "4:00", hr: 89 },
  { risk: 0.27, sofa: 3, toAlert: "3:30", hr: 91 },
  { risk: 0.31, sofa: 4, toAlert: "3:00", hr: 94 },
  { risk: 0.36, sofa: 4, toAlert: "2:30", hr: 97 },
  { risk: 0.42, sofa: 4, toAlert: "2:00", hr: 101 },
  { risk: 0.48, sofa: 5, toAlert: "1:30", hr: 104 },
  { risk: 0.54, sofa: 5, toAlert: "1:00", hr: 108 },
  { risk: 0.58, sofa: 5, toAlert: "0:30", hr: 111 },
  { risk: 0.64, sofa: 6, toAlert: "0:00", hr: 114 },
  { risk: 0.68, sofa: 6, toAlert: "0:00", hr: 117 },
  { risk: 0.71, sofa: 6, toAlert: "0:00", hr: 118 },
  { risk: 0.71, sofa: 6, toAlert: "0:00", hr: 118 },
  { risk: 0.71, sofa: 6, toAlert: "0:00", hr: 117 },
];

/** Frame shown when motion is reduced: the alert state, so the story still reads. */
export const STATIC_FRAME = 11;

export function statusFor(risk: number): DemoStatus {
  if (risk >= ALERT_THRESHOLD) return "Critical";
  if (risk >= 0.45) return "High risk";
  if (risk >= 0.3) return "Moderate";
  return "Stable";
}
