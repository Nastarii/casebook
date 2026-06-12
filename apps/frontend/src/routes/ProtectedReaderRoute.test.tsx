import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '../stores/authStore';
import { ProtectedReaderRoute } from './ProtectedReaderRoute';

function renderRoute(initialPath = '/projects/genesis/read') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<ProtectedReaderRoute />}>
          <Route path="/projects/:projectSlug/read" element={<p>Leitor protegido</p>} />
        </Route>
        <Route path="/auth" element={<p>Entrada editorial</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedReaderRoute', () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession();
    localStorage.clear();
  });

  it('redirects anonymous readers to authentication', () => {
    renderRoute();

    expect(screen.getByText(/Entrada editorial/i)).toBeInTheDocument();
  });

  it('keeps authenticated readers inside the book', () => {
    useAuthStore.getState().setSession('jwt-token');

    renderRoute();

    expect(screen.getByText(/Leitor protegido/i)).toBeInTheDocument();
  });
});
