import Image from "next/image";
import Link from "next/link";
import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { hasImage } from "@/components/ui/site-image";
import { certificationGroups, type CertificationEntry } from "@/lib/data/certifications";

/** The certificate itself, letterboxed in a landscape frame. Opens the full image in a new tab. */
function CertificateThumb({ entry }: { entry: CertificationEntry }) {
  const { image } = entry;
  if (!hasImage(image.src)) return <ImagePlaceholder width={image.width} height={image.height} />;

  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View certificate: ${entry.name}`}
      className="live-group press block"
    >
      <span className="thumb relative block overflow-hidden rounded-card border border-border bg-panel" style={{ aspectRatio: "7 / 5" }}>
        <Image src={image.src} alt="" fill sizes="(min-width: 640px) 160px, 112px" className="thumb__img object-contain p-1.5" />
      </span>
    </a>
  );
}

function CertificateRow({ entry, index }: { entry: CertificationEntry; index: number }) {
  return (
    <li {...reveal(index)} className="grid grid-cols-[7rem_1fr] items-center gap-4 py-5 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <CertificateThumb entry={entry} />
      <div className="min-w-0">
        <p className="type-label text-ink/70">
          {entry.issuer}, {entry.date}
        </p>
        <h4 className="type-title mt-1 text-lg sm:text-xl">{entry.name}</h4>
        {entry.detail && (
          <p className="mt-1 text-sm text-ink/70">
            {entry.detailHref ? (
              <Link href={entry.detailHref} className="link-hover text-signal">
                {entry.detail}
              </Link>
            ) : (
              entry.detail
            )}
          </p>
        )}
        {entry.link && (
          <a href={entry.link} target="_blank" rel="noopener noreferrer" className="type-label link-hover mt-2 inline-block text-signal">
            Verify credential ↗
          </a>
        )}
      </div>
    </li>
  );
}

export function CertificationsSection() {
  return (
    <Section id="certifications" className="py-14 sm:py-20">
      <h2 {...reveal(0, "mask")} className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
        <Mask>Certifications</Mask>
      </h2>

      <div className="mt-10 space-y-12 sm:space-y-14">
        {certificationGroups.map((group) => (
          <div key={group.title} className="grid gap-6 border-t border-border pt-6 lg:grid-cols-[14rem_1fr] lg:gap-12">
            <h3 {...reveal()} className="type-title text-2xl sm:text-3xl">
              {group.title}
            </h3>
            <ul className="divide-y divide-border">
              {group.entries.map((entry, index) => (
                <CertificateRow key={entry.name} entry={entry} index={index} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
