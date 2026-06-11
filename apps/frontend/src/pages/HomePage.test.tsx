import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('introduces Casebook as a narrative reading experience', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Projetos merecem ser lidos/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Abrir leitor/i })).toHaveAttribute(
      'href',
      '/projects/genesis/read',
    );
  });
});
