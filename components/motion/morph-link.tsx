"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

/** The one view-transition name the travelling screenshot carries (styled in globals.css). */
const NAME = "project-morph";

/** How long to wait for the next page before letting the transition go without it. */
const ARRIVAL_TIMEOUT = 3000;

/** Set while a morph navigation is in flight; called once the next page has rendered. */
let onArrive: (() => void) | null = null;

function inViewport(element: Element) {
  const box = element.getBoundingClientRect();
  return box.width > 0 && box.bottom > 0 && box.right > 0 && box.top < window.innerHeight && box.left < window.innerWidth;
}

/** Mounted once in the layout: tells a waiting morph navigation that the new page is on screen. */
export function MorphArrival() {
  const pathname = usePathname();
  useEffect(() => {
    onArrive?.();
  }, [pathname]);
  return null;
}

type MorphLinkProps = ComponentProps<typeof Link> & {
  /** Selector for the picture that travels: looked for inside the link first, then on the page. */
  from: string;
  /** Selector for the picture it lands on, on the page being opened. */
  to: string;
};

/**
 * A link whose picture grows into its counterpart on the next page (a project thumbnail into
 * the case-study screenshot, and back). The browser's View Transitions API does the movement:
 * both pictures are given the same name for the length of one navigation. Next already scrolls
 * to the top before the new page is captured, which is why this is done by hand: React's own
 * <ViewTransition> pairing checks the viewport before that scroll and drops the pair.
 *
 * Without the API, with a modifier key, or when either picture is off screen, it is a normal link
 * (the page still crossfades when the API exists).
 */
export function MorphLink({ from, to, onClick, ...props }: MorphLinkProps) {
  const router = useRouter();

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!document.startViewTransition) return;

    const href = String(props.href);
    // Same page (only the hash differs): nothing to travel between.
    if (new URL(href, window.location.href).pathname === window.location.pathname) return;

    event.preventDefault();

    const source = event.currentTarget.querySelector<HTMLElement>(from) ?? document.querySelector<HTMLElement>(from);
    if (source && inViewport(source)) source.style.viewTransitionName = NAME;
    let target: HTMLElement | null = null;

    const transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          const arrive = () => {
            clearTimeout(timer);
            onArrive = null;
            // Two elements with one name would cancel the whole transition.
            if (source) source.style.viewTransitionName = "";
            target = document.querySelector<HTMLElement>(to);
            if (target && inViewport(target)) target.style.viewTransitionName = NAME;
            resolve();
          };
          const timer = setTimeout(arrive, ARRIVAL_TIMEOUT);
          onArrive = arrive;
          router.push(href);
        }),
    );

    const cleanUp = () => {
      if (source) source.style.viewTransitionName = "";
      if (target) target.style.viewTransitionName = "";
    };
    transition.ready.catch(() => {});
    transition.finished.then(cleanUp, cleanUp);
  }

  return <Link {...props} onClick={navigate} />;
}
