"use client";

import { useEffect, useRef, useState } from "react";

/** Copies a value to the clipboard and confirms it in place for a moment. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
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
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="press shrink-0 self-stretch border-l border-border px-4 text-sm text-ink/70 transition-colors focus-visible:-outline-offset-2 hover:bg-paper/60 hover:text-signal"
    >
      <span aria-live="polite" className={copied ? "text-signal" : undefined}>
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
