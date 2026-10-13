import type { Project } from "@/lib/data/projects";

/** Small pill showing whether a project is finished or still being built. */
export function StatusBadge({ status }: { status: Project["status"] }) {
  const inProgress = status === "In progress";
  return (
    <span
      className={`type-label inline-flex items-center gap-1.5 rounded-chip border px-2 py-0.5 ${
        inProgress ? "border-signal/60 text-signal" : "border-border text-ink/70"
      }`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${inProgress ? "bg-signal" : "bg-ink/40"}`} />
      {status}
    </span>
  );
}
