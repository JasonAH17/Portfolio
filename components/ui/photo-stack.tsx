"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ImageAsset } from "@/lib/data/projects";

/**
 * Several photos shown as one: the first on top, the next one peeking out behind it.
 * Clicking opens a viewer with buttons to step through the rest.
 */
export function PhotoStack({ photos, alt }: { photos: ImageAsset[]; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [front, behind] = photos;
  const current = photos[index];

  function open() {
    setIndex(0);
    dialog.current?.showModal();
  }

  function step(by: number) {
    setIndex((i) => (i + by + photos.length) % photos.length);
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View ${photos.length} photos: ${front.caption ?? alt}`}
        className="photo-stack press relative block w-full cursor-zoom-in rounded-card text-left"
      >
        {/* The next photo, tilted behind the first so the stack reads as more than one. */}
        <span aria-hidden="true" className="photo-stack__behind absolute inset-0 overflow-hidden rounded-card border border-border bg-panel">
          <Image src={behind.src} alt="" fill sizes="320px" className="object-cover" />
        </span>
        <Image
          src={front.src}
          width={front.width}
          height={front.height}
          alt={front.caption ?? alt}
          sizes="(min-width: 768px) 320px, 100vw"
          className="relative block h-auto w-full rounded-card border border-border bg-panel"
        />
        <span className="type-label absolute right-2 bottom-2 rounded-chip border border-border bg-paper px-2 py-1 text-ink">
          {photos.length} photos
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={`${alt}, photos`}
        // A click on the dark area around the photo (the dialog itself) closes it.
        onClick={(event) => event.target === event.currentTarget && dialog.current?.close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="photo-viewer m-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] bg-transparent text-ink backdrop:bg-black/85"
      >
        <figure className="flex flex-col rounded-card border border-border bg-panel p-3 sm:p-4">
          <Image
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.caption ?? alt}
            sizes="92vw"
            // Sized up front from the photo's own ratio so the viewer never jumps while the file loads:
            // as large as fits the screen, never larger than the photo itself.
            style={{
              aspectRatio: `${current.width} / ${current.height}`,
              width: `min(100vw - 4rem, ${current.width}px, (100dvh - 12rem) * ${current.width / current.height})`,
            }}
            className="photo-viewer__img mx-auto block h-auto max-w-none rounded-control bg-paper"
          />
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="min-w-0 text-sm leading-snug text-ink/85">
              <span className="type-label mr-3 text-ink/70">
                {index + 1} / {photos.length}
              </span>
              {current.caption}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} className={viewerButton}>
                <span aria-hidden="true">←</span> Previous
              </button>
              <button type="button" onClick={() => step(1)} autoFocus className={viewerButton}>
                Next <span aria-hidden="true">→</span>
              </button>
              <button type="button" onClick={() => dialog.current?.close()} className={viewerButton}>
                Close
              </button>
            </div>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}

const viewerButton =
  "press inline-flex min-h-11 items-center gap-1.5 rounded-control border border-border bg-paper px-3.5 text-sm text-ink hover:border-signal hover:text-signal";
