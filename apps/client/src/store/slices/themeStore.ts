import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ThemeState } from '@/types/store';

interface ThemeStore extends ThemeState {
  setMode: (mode: 'light' | 'dark') => void;
  setSystemPreference: (useSystem: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        mode: 'light',
        systemPreference: true,
        setMode: (mode) => set({ mode }),
        setSystemPreference: (systemPreference) => set({ systemPreference }),
      }),
      {
        name: 'theme-storage',
      }
    )
  )
); 