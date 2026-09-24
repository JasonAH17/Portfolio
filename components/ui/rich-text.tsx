import Link from "next/link";
import type { RichSegment } from "@/lib/data/rich-text";

function isLink(segment: RichSegment): segment is { label: string; href: string } {
  return typeof segment !== "string";
}

export function RichText({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        isLink(segment) ? (
          <Link
            key={index}
            href={segment.href}
            className="text-teal underline underline-offset-2"
          >
            {segment.label}
          </Link>
        ) : (
          <span key={index}>{segment}</span>
        ),
      )}
    </>
  );
}
