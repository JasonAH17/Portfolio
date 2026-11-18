"use client";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * The theme last asked for. The view transition applies data-theme a frame or two later,
 * so a quick second click must read this rather than the attribute.
 */
let requested: Theme | null = null;

/** The most recent theme-switch transition, so an older one finishing late does not clear its mark. */
let latest: ViewTransition | null = null;

function currentTheme(): Theme {
  if (requested) return requested;
  // Brown is the default; light only applies once the visitor has picked it.
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * Switches between the default brown theme ("dark") and the pale gold one ("light"). The
 * choice is stored and applied before paint by the head script in app/layout.tsx; until
 * the visitor picks one, the site is brown. Icons are shown by CSS
 * (see .theme-toggle in globals.css), so nothing depends on hydration.
 */
export function ThemeToggle() {
  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    requested = next;
    // Always the latest request: a skipped transition's callback can run after a newer one.
    const apply = () => {
      document.documentElement.dataset.theme = requested ?? next;
    };

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the switch still works for this visit.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) {
      // The new theme spreads out from the toggle (see ::view-transition-new in globals.css).
      const box = event.currentTarget.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const root = document.documentElement.style;
      root.setProperty("--vt-x", `${x}px`);
      root.setProperty("--vt-y", `${y}px`);
      root.setProperty("--vt-r", `${radius}px`);
      // Marks this as a theme switch so the circle reveal does not also play on page navigations.
      document.documentElement.dataset.themeSwitch = "";
      const transition = document.startViewTransition(apply);
      // A quick second click skips this transition, which rejects `ready`; that is expected.
      transition.ready.catch(() => {});
      latest = transition;
      const clear = () => {
        // Only the latest switch clears the mark; an earlier, skipped one must leave it for its successor.
        if (latest === transition) delete document.documentElement.dataset.themeSwitch;
      };
      transition.finished.then(clear, clear);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between the brown and pale gold themes"
      title="Switch theme"
      className="theme-toggle press relative after:absolute after:-inset-1.5 after:content-[''] grid h-8 w-8 place-items-center rounded-control border border-border text-ink/70 hover:border-ink/40 hover:text-ink"
    >
      {/* Moon: shown in light mode (switch to dark). */}
      <svg className="theme-toggle__icon theme-toggle__moon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {/* Sun: shown in dark mode (switch to light). */}
      <svg className="theme-toggle__icon theme-toggle__sun" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
