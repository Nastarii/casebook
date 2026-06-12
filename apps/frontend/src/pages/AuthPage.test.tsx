import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '../stores/authStore';
import { AuthPage } from './AuthPage';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

function renderAuthPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('AuthPage', () => {
  beforeEach(() => {
    navigate.mockReset();
    useAuthStore.getState().clearSession();
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('logs in and opens the reader', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ access_token: 'jwt-token', token_type: 'bearer' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderAuthPage();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'strong-pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar no Casebook/i }));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/projects/genesis/read'));
    expect(useAuthStore.getState().token).toBe('jwt-token');
  });

  it('shows email confirmation when smtp is enabled by the api', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          access_token: null,
          token_type: 'bearer',
          email_confirmation_required: true,
          user: {
            id: 'user-id',
            name: 'Grace Hopper',
            email: 'grace@example.com',
            is_active: true,
            is_email_verified: false,
          },
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    renderAuthPage();
    fireEvent.click(screen.getByRole('button', { name: /Criar acesso/i }));
    fireEvent.change(await screen.findByLabelText(/Nome/i), { target: { value: 'Grace Hopper' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'grace@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'strong-pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar acesso ao Casebook/i }));

    expect(await screen.findByText(/Verifique grace@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviamos um token/i)).toBeInTheDocument();
  });
});
