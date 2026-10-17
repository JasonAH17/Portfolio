import { Mask } from "@/components/motion/mask";
import { reveal } from "@/components/motion/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { certifications } from "@/lib/data/certifications";

export function CertificationsSection() {
  const isEmpty = certifications.length === 0;

  return (
    <Section id="certifications" className="py-14 sm:py-20">
      <h2 {...reveal(0, "mask")} className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
        <Mask>Certifications</Mask>
      </h2>
      <div className="mt-8">

        {isEmpty ? (
          // Empty state: a quiet dashed card until the first certificate is added.
          <div {...reveal(1)} className="max-w-2xl rounded-card border-2 border-dashed border-border bg-panel px-6 py-6">
            <p className="type-title text-lg">No certifications yet</p>
            <p className="mt-1 text-ink/70">They will be listed here as I complete them.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {certifications.map((cert, index) => (
              <li key={cert.name} {...reveal(index + 1)} className="grid gap-4 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-8">
                <ImagePlaceholder width={cert.image.width} height={cert.image.height} className="w-32" />
                <div>
                  <p className="type-label text-ink/70">
                    {cert.issuer}, {cert.date}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{cert.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{cert.description}</p>
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="type-label link-hover text-signal">
                    View credential ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
