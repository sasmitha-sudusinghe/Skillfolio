import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getProjectsRequest,
  createProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from '../api/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getProjectsRequest();
      setProjects(res.data.projects);
    } catch (err) {
      setError('Could not load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (editingProject) {
      const res = await updateProjectRequest(editingProject._id, payload);
      setProjects((prev) =>
        prev.map((p) => (p._id === editingProject._id ? res.data.project : p))
      );
    } else {
      const res = await createProjectRequest(payload);
      setProjects((prev) => [res.data.project, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await deleteProjectRequest(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError('Could not delete project.');
    }
  };

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

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
          <p className="text-sm text-[var(--color-text-dim)] mb-1">Logged in as</p>
          <p className="font-mono text-[var(--color-cyan)]">{user?.username}</p>
          <p className="text-sm text-[var(--color-text-dim)] mt-2">{user?.email}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-sm text-[var(--color-text-dim)]">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </h2>
          <button
            onClick={openAddModal}
            className="font-mono text-xs bg-[var(--color-cyan)] text-[#0a0e14] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            + add project
          </button>
        </div>

        {error && (
          <p className="font-mono text-xs text-[var(--color-error)] mb-4">{error}</p>
        )}

        {loading ? (
          <p className="font-mono text-sm text-[var(--color-text-dim)]">loading…</p>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
            <p className="font-mono text-sm text-[var(--color-text-dim)]">
              No projects yet. Add your first one →
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
