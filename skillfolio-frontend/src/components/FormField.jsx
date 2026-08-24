export default function FormField({ label, error, ...inputProps }) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-xs text-[var(--color-text-dim)] mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        {...inputProps}
        className={`w-full rounded-md bg-[#0c1119] border px-3 py-2.5 text-sm text-[var(--color-text)]
          placeholder:text-[var(--color-text-dim)] outline-none transition-colors
          focus:border-[var(--color-cyan)] focus:ring-1 focus:ring-[var(--color-cyan)]
          ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'}`}
      />
      {error && (
        <p className="mt-1.5 font-mono text-xs text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
}
