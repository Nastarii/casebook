import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthUser } from '../types/auth';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user?: AuthUser | null) => void;
  setUser: (user: AuthUser | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user = null) => set({ token, user }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: 'casebook-auth' },
  ),
);
