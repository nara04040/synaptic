import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, UserState } from '@/types/store';

interface UserStore extends UserState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        login: (user) =>
          set({ user, isAuthenticated: true, error: null }),
        logout: () =>
          set({ user: null, isAuthenticated: false, error: null }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
); 