import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TerminalWindow from '../components/TerminalWindow';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
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
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <TerminalWindow path="~/skillfolio/login">
        <h1 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--color-text-dim)] mb-6">
          Log in to continue building your portfolio.
        </p>

        <form onSubmit={handleSubmit}>
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
            {submitting ? 'logging in…' : 'log in →'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-dim)]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[var(--color-cyan)] hover:underline">
            Sign up
          </Link>
        </p>
      </TerminalWindow>
    </div>
  );
}
