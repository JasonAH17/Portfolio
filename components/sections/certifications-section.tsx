import { reveal } from "@/components/motion/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { certifications } from "@/lib/data/certifications";

export function CertificationsSection() {
  const isEmpty = certifications.length === 0;

  return (
    <Section id="certifications" className="py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div {...reveal()} className="lg:col-span-3">
          <SectionLabel color="var(--color-ch-aux)">Cert</SectionLabel>
          <h2 className="mt-3 text-2xl type-title">
            Certifications
          </h2>
        </div>

        {isEmpty ? (
          // Monitor "no sensor attached" state: an empty channel with a --- readout. No flatline.
          <div {...reveal(1)} className="grid grid-cols-[1fr_auto] items-stretch gap-4 lg:col-span-9 sm:gap-8">
            <div className="ecg-grid flex min-h-24 items-center rounded-card border border-border px-4 py-5 sm:px-6">
              <p className="type-label max-w-md rounded-chip bg-panel px-2 py-1 text-ink/65">
                No certifications yet. This channel goes live when I complete the first one.
              </p>
            </div>
            <p className="type-readout self-center text-[clamp(3rem,8vw,4.5rem)] tracking-[0.08em] text-ink/30" aria-label="No reading">
              ---
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border border-y border-border lg:col-span-9">
            {certifications.map((cert, index) => (
              <li key={cert.name} {...reveal(index + 1)} className="grid gap-4 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-8">
                <ImagePlaceholder width={cert.image.width} height={cert.image.height} className="w-32" />
                <div>
                  <p className="type-label text-ink/55">
                    {cert.issuer} · {cert.date}
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
