import { EmptyState } from "@/components/ui/empty-state";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { certifications } from "@/lib/data/certifications";

export function CertificationsSection() {
  return (
    <Section id="certifications">
      <h2 className="text-2xl">Certifications</h2>

      {certifications.length === 0 ? (
        <div className="mt-8">
          <EmptyState message="No certifications added yet" />
        </div>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {certifications.map((cert) => (
            <div key={cert.name}>
              <ImagePlaceholder
                width={cert.image.width}
                height={cert.image.height}
                className="max-w-xs"
              />
              <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink/60">
                {cert.date}
              </p>
              <h3 className="mt-1 text-lg">{cert.name}</h3>
              <p className="text-sm text-ink/70">{cert.issuer}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/90">
                {cert.description}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-xs text-teal"
                >
                  View credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
