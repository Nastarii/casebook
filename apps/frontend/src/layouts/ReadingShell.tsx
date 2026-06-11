import { BookOpen } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function ReadingShell() {
  return (
    <main className="min-h-screen bg-paper-50 text-ink-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a className="flex items-center gap-3 font-display text-xl" href="/">
          <BookOpen aria-hidden="true" className="h-5 w-5 text-brass-500" />
          Casebook
        </a>
      </header>
      <Outlet />
    </main>
  );
}
