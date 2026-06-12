import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, KeyRound, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { apiRequest, ApiError } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import type { AuthResponse, AuthUser, TokenResponse } from '../types/auth';

type AuthMode = 'login' | 'register';
type PendingConfirmation = {
  email: string;
  name: string;
} | null;

const inputClass =
  'w-full border-b border-paper-100 bg-transparent px-0 py-3 text-base text-ink-950 outline-none transition-colors placeholder:text-ink-600/60 focus:border-brass-500';

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 403) return 'Confirme seu email antes de entrar no Casebook.';
    if (error.status === 409) return 'Este email ja pertence a uma biblioteca Casebook.';
    if (error.status === 401) return 'Email ou senha nao conferem.';
    return error.message;
  }

  return 'Nao foi possivel conectar ao Casebook agora.';
}

export function AuthPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationToken, setConfirmationToken] = useState('');
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: () =>
      apiRequest<TokenResponse>('/auth/login', {
        method: 'POST',
        body: { email, password },
      }),
    onSuccess: (response) => {
      setSession(response.access_token);
      navigate('/projects/genesis/read');
    },
  });

  const registerMutation = useMutation({
    mutationFn: () =>
      apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: { name, email, password },
      }),
    onSuccess: (response) => {
      if (response.access_token) {
        setSession(response.access_token, response.user);
        navigate('/projects/genesis/read');
        return;
      }

      setPendingConfirmation({ email: response.user.email, name: response.user.name });
      setNotice('Enviamos um token de confirmacao para o seu email.');
    },
  });

  const confirmEmailMutation = useMutation({
    mutationFn: () =>
      apiRequest<AuthUser>('/auth/confirm-email', {
        method: 'POST',
        body: { token: confirmationToken },
      }),
    onSuccess: () => {
      setNotice('Email confirmado. Entre para continuar sua leitura.');
      setPendingConfirmation(null);
      setConfirmationToken('');
      setMode('login');
    },
  });

  const activeError =
    loginMutation.error ?? registerMutation.error ?? confirmEmailMutation.error ?? null;
  const isSubmitting =
    loginMutation.isPending || registerMutation.isPending || confirmEmailMutation.isPending;

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    if (mode === 'login') {
      loginMutation.mutate();
      return;
    }

    registerMutation.mutate();
  }

  function handleConfirmationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    confirmEmailMutation.mutate();
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[minmax(0,1fr)_420px]">
      <motion.article
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-5 text-sm uppercase tracking-[0.22em] text-moss-600">
          Biblioteca privada
        </p>
        <h1 className="font-display text-5xl leading-tight text-ink-950 md:text-6xl">
          Entre com calma. O conhecimento espera na proxima pagina.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-ink-600">
          A autenticacao protege os volumes do Casebook sem transformar a entrada em burocracia.
        </p>
        <Link
          className="mt-10 inline-flex items-center gap-3 border-b border-paper-100 pb-2 text-sm text-ink-600 transition-colors hover:border-brass-500 hover:text-ink-950"
          to="/"
        >
          Voltar ao inicio
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </motion.article>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="border-l border-paper-100 pl-8"
        initial={{ opacity: 0, y: 18 }}
        transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8 inline-flex border-b border-paper-100 text-sm text-ink-600">
          <button
            className={`px-4 py-3 transition-colors ${
              mode === 'login' ? 'border-b border-brass-500 text-ink-950' : 'hover:text-ink-950'
            }`}
            type="button"
            onClick={() => setMode('login')}
          >
            Entrar
          </button>
          <button
            className={`px-4 py-3 transition-colors ${
              mode === 'register' ? 'border-b border-brass-500 text-ink-950' : 'hover:text-ink-950'
            }`}
            type="button"
            onClick={() => setMode('register')}
          >
            Criar acesso
          </button>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {pendingConfirmation ? (
            <motion.form
              key="confirmation"
              animate={{ opacity: 1, y: 0 }}
              className="space-y-7"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 12 }}
              onSubmit={handleConfirmationSubmit}
            >
              <div>
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-moss-600">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Confirmacao
                </p>
                <h2 className="mt-4 font-display text-3xl text-ink-950">
                  Verifique {pendingConfirmation.email}
                </h2>
              </div>
              <label className="block">
                <span className="sr-only">Token de confirmacao</span>
                <input
                  required
                  className={inputClass}
                  placeholder="Token recebido por email"
                  value={confirmationToken}
                  onChange={(event) => setConfirmationToken(event.target.value)}
                />
              </label>
              <button
                aria-label="Confirmar email"
                className="inline-flex w-full items-center justify-between border-b border-brass-500 pb-3 text-sm font-medium uppercase tracking-[0.16em] text-ink-950 disabled:opacity-50"
                disabled={isSubmitting}
                type="submit"
              >
                Confirmar email
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key={mode}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-7"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 12 }}
              onSubmit={handleAuthSubmit}
            >
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-moss-600">
                  {mode === 'login' ? 'Acesso ao volume' : 'Novo leitor'}
                </p>
                <h2 className="mt-4 font-display text-3xl text-ink-950">
                  {mode === 'login' ? 'Retome sua leitura.' : 'Crie sua biblioteca.'}
                </h2>
              </div>

              {mode === 'register' ? (
                <label className="block">
                  <span className="flex items-center gap-2 text-sm text-ink-600">
                    <UserRound aria-hidden="true" className="h-4 w-4" />
                    Nome
                  </span>
                  <input
                    required
                    className={inputClass}
                    maxLength={160}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="flex items-center gap-2 text-sm text-ink-600">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Email
                </span>
                <input
                  required
                  className={inputClass}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-sm text-ink-600">
                  <KeyRound aria-hidden="true" className="h-4 w-4" />
                  Senha
                </span>
                <input
                  required
                  className={inputClass}
                  minLength={mode === 'register' ? 8 : 1}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <button
                aria-label={mode === 'login' ? 'Entrar no Casebook' : 'Criar acesso ao Casebook'}
                className="inline-flex w-full items-center justify-between border-b border-brass-500 pb-3 text-sm font-medium uppercase tracking-[0.16em] text-ink-950 disabled:opacity-50"
                disabled={isSubmitting}
                type="submit"
              >
                {mode === 'login' ? 'Entrar' : 'Criar acesso'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {notice ? <p className="mt-6 text-sm leading-6 text-moss-600">{notice}</p> : null}
        {activeError ? (
          <p className="mt-6 text-sm leading-6 text-brass-500">{getErrorMessage(activeError)}</p>
        ) : null}
      </motion.div>
    </section>
  );
}
