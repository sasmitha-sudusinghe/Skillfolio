import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-mono text-lg font-semibold">
            ~/skillfolio/dashboard
          </h1>
          <button
            onClick={logout}
            className="font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-cyan)] transition-colors"
          >
            log out
          </button>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <p className="text-sm text-[var(--color-text-dim)] mb-1">Logged in as</p>
          <p className="font-mono text-[var(--color-cyan)]">{user?.username}</p>
          <p className="text-sm text-[var(--color-text-dim)] mt-4">{user?.email}</p>
        </div>

        <p className="mt-6 font-mono text-xs text-[var(--color-text-dim)]">
          Project CRUD UI goes here next.
        </p>
      </div>
    </div>
  );
}
