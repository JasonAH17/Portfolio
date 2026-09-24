type EmptyStateProps = {
  message: string;
  className?: string;
};

export function EmptyState({ message, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-border px-6 py-16 text-center ${className}`}
    >
      <p className="max-w-sm font-mono text-xs uppercase tracking-wide text-ink/50">
        {message}
      </p>
    </div>
  );
}
