import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TerminalWindow from '../components/TerminalWindow';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <TerminalWindow path="~/skillfolio/signup">
        <h1 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-1">
          Create your account
        </h1>
        <p className="text-sm text-[var(--color-text-dim)] mb-6">
          Start tracking your projects and skills.
        </p>

        <form onSubmit={handleSubmit}>
          <FormField
            label="username"
            name="username"
            type="text"
            placeholder="ada_lovelace"
            value={form.username}
            onChange={handleChange}
            required
            minLength={3}
          />
          <FormField
            label="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
          />

          {error && (
            <p className="mb-4 font-mono text-xs text-[var(--color-error)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--color-cyan)] text-[#0a0e14] font-mono text-sm font-semibold
              py-2.5 mt-2 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'creating account…' : 'create account →'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-cyan)] hover:underline">
            Log in
          </Link>
        </p>
      </TerminalWindow>
    </div>
  );
}
