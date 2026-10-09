import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { certifications } from "@/lib/data/certifications";

export function CertificationsSection() {
  const isEmpty = certifications.length === 0;

  return (
    <Section id="certifications" compact={isEmpty}>
      <h2 className="text-3xl sm:text-4xl">Certifications</h2>

      {isEmpty ? (
        <div className="mt-6 max-w-lg border-l-2 border-teal/40 py-1 pl-5">
          <p className="font-serif text-lg text-ink/70 italic">
            No certifications yet — this space will fill in as I complete
            them.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
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
                  className="link-hover mt-2 inline-block font-mono text-xs text-teal"
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
