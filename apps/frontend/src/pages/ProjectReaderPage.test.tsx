import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ProjectReaderPage } from './ProjectReaderPage';

function renderReader(initialEntry = '/projects/genesis/read') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/projects/:projectSlug/read" element={<ProjectReaderPage />} />
        <Route path="/projects/:projectSlug/read/:pageSlug" element={<ProjectReaderPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectReaderPage', () => {
  it('opens the first page with chapters and project index', () => {
    renderReader();

    expect(screen.getByRole('heading', { name: /Casebook Genesis/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Visao do produto/i })).toBeInTheDocument();
    const index = screen.getByRole('navigation', { name: /Indice do projeto/i });

    expect(index).toBeInTheDocument();
    expect(within(index).getByRole('link', { name: /Principios narrativos/i })).toBeInTheDocument();
  });

  it('moves through pages without leaving the reading flow', async () => {
    renderReader('/projects/genesis/read/visao-do-produto');

    const index = screen.getByRole('navigation', { name: /Indice do projeto/i });

    fireEvent.click(within(index).getByRole('link', { name: /Principios narrativos/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Principios narrativos/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/Capitulo 01 - Pagina 2 de 4/i)).toBeInTheDocument();
  });
});
