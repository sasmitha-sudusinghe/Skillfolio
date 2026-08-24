export default function TerminalWindow({ path, children }) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_0_40px_-12px_rgba(34,211,238,0.25)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[#0c1119]">
          <span className="w-3 h-3 rounded-full bg-[#f87171]" />
          <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
          <span className="w-3 h-3 rounded-full bg-[#22d3ee]" />
          <span className="ml-2 font-mono text-xs text-[var(--color-text-dim)]">
            {path}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
