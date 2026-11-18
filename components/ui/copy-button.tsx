"use client";

import { useEffect, useRef, useState } from "react";

/** "idle" is the first render; "reset" is the same "Copy" label coming back, which animates in. */
type CopyState = "idle" | "copied" | "reset";

/** Copies a value to the clipboard and confirms it in place for a moment. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard blocked: leave the label unchanged so nothing claims to have worked.
      return;
    }
    setState("copied");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("reset"), 1600);
  }

  const copied = state === "copied";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="press shrink-0 self-stretch border-l border-border px-4 text-sm text-ink/70 transition-colors focus-visible:-outline-offset-2 hover:bg-paper/60 hover:text-signal"
    >
      <span aria-live="polite">
        {/* Keyed so each new label mounts fresh and plays its entrance; the very first render does not. */}
        <span key={state} className={`${state === "idle" ? "" : "label-swap"} ${copied ? "text-signal" : ""}`}>
          {copied ? "Copied" : "Copy"}
        </span>
      </span>
    </button>
  );
}
