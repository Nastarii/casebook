import { BookOpen } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

export function ReadingShell() {
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <main className="min-h-screen bg-paper-50 text-ink-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link className="flex items-center gap-3 font-display text-xl" to="/">
          <BookOpen aria-hidden="true" className="h-5 w-5 text-brass-500" />
          Casebook
        </Link>
        {token ? (
          <button
            className="border-b border-paper-100 pb-1 text-sm text-ink-600 transition-colors hover:border-brass-500 hover:text-ink-950"
            type="button"
            onClick={clearSession}
          >
            Sair
          </button>
        ) : (
          <Link
            className="border-b border-paper-100 pb-1 text-sm text-ink-600 transition-colors hover:border-brass-500 hover:text-ink-950"
            to="/auth"
          >
            Entrar
          </Link>
        )}
      </header>
      <Outlet />
    </main>
  );
}
