import { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import FormField from './FormField';

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  status: 'planned',
  repoUrl: '',
  liveUrl: '',
  writeUpUrl: '',
  commitHash: '',
  year: new Date().getFullYear(),
};

export default function ProjectFormModal({ project, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(project);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        techStack: (project.techStack || []).join(', '),
        status: project.status || 'planned',
        repoUrl: project.repoUrl || '',
        liveUrl: project.liveUrl || '',
        writeUpUrl: project.writeUpUrl || '',
        commitHash: project.commitHash || '',
        year: project.year || new Date().getFullYear(),
      });
    } else {
      setForm(emptyForm);
    }
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        techStack: form.techStack
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        year: Number(form.year),
      };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <TerminalWindow path={isEditing ? '~/projects/edit' : '~/projects/new'}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-lg font-semibold">
            {isEditing ? 'Edit project' : 'Add a project'}
          </h2>
          <button
            onClick={onClose}
            className="font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-cyan)]"
          >
            close ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-1">
          <FormField
            label="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Skillfolio"
            required
          />
          <FormField
            label="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="One or two sentences on the problem this solved."
          />
          <FormField
            label="tech stack (comma-separated)"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="Python, FastAPI, PostgreSQL"
          />

          <div className="mb-4">
            <label className="block font-mono text-xs text-[var(--color-text-dim)] mb-1.5 tracking-wide">
              status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-md bg-[#0c1119] border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-cyan)] focus:ring-1 focus:ring-[var(--color-cyan)]"
            >
              <option value="planned">planned</option>
              <option value="in-progress">in-progress</option>
              <option value="done">done</option>
            </select>
          </div>

          <FormField
            label="repo url"
            name="repoUrl"
            value={form.repoUrl}
            onChange={handleChange}
            placeholder="https://github.com/you/skillfolio"
          />
          <FormField
            label="live demo url (optional)"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="https://skillfolio.vercel.app"
          />
          <FormField
            label="write-up url (optional)"
            name="writeUpUrl"
            value={form.writeUpUrl}
            onChange={handleChange}
            placeholder="https://yourblog.com/skillfolio"
          />
          <FormField
            label="commit hash (optional)"
            name="commitHash"
            value={form.commitHash}
            onChange={handleChange}
            placeholder="7c1de40"
          />
          <FormField
            label="year"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
          />

          {error && (
            <p className="mb-4 font-mono text-xs text-[var(--color-error)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--color-cyan)] text-[#0a0e14] font-mono text-sm font-semibold
              py-2.5 mt-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'saving…' : isEditing ? 'save changes →' : 'add project →'}
          </button>
        </form>
      </TerminalWindow>
    </div>
  );
}
