import TerminalWindow from './TerminalWindow';

const statusColors = {
  planned: 'text-[var(--color-text-dim)]',
  'in-progress': 'text-amber-400',
  done: 'text-[var(--color-cyan)]',
};

export default function ProjectCard({ project, onEdit, onDelete }) {
  const {
    title,
    description,
    techStack = [],
    status,
    repoUrl,
    liveUrl,
    writeUpUrl,
    commitHash,
    year,
  } = project;

  const slug = title.toLowerCase().replace(/\s+/g, '-');

  const metaParts = [
    commitHash,
    techStack.length > 0 ? techStack.join(' / ') : null,
    year,
  ].filter(Boolean);

  return (
    <TerminalWindow path={`~/projects/${slug}`}>
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-mono text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h2>
        <span className={`font-mono text-xs whitespace-nowrap ${statusColors[status] || ''}`}>
          {status}
        </span>
      </div>

      {description && (
        <p className="mt-3 text-sm text-[var(--color-text-dim)] leading-relaxed">
          {description}
        </p>
      )}

      {metaParts.length > 0 && (
        <p className="mt-4 font-mono text-xs text-[var(--color-cyan)]">
          {metaParts.join(' · ')}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-cyan)] hover:underline"
          >
            view repo →
          </a>
        )}
        {writeUpUrl && (
          <a
            href={writeUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-cyan)] hover:underline"
          >
            write-up →
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-cyan)] hover:underline"
          >
            live demo →
          </a>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex gap-4 font-mono text-xs text-[var(--color-text-dim)]">
        <button onClick={() => onEdit(project)} className="hover:text-[var(--color-cyan)] transition-colors">
          edit
        </button>
        <button onClick={() => onDelete(project._id)} className="hover:text-[var(--color-error)] transition-colors">
          delete
        </button>
      </div>
    </TerminalWindow>
  );
}
