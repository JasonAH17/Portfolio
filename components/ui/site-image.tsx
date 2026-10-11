import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImagePlaceholder } from "./image-placeholder";

type SiteImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** True when the file exists under public/. Runs at build time (server component). */
export function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Renders the real image when it exists in public/, otherwise the dashed
 * ImagePlaceholder at the same aspect ratio, so dropping a file in needs no code change.
 */
export function SiteImage({ src, width, height, alt, className = "", sizes, priority }: SiteImageProps) {
  if (!hasImage(src)) {
    return <ImagePlaceholder width={width} height={height} className={className} />;
  }
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full rounded-card border border-border bg-panel ${className}`}
    />
  );
}
