import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          })
          const data = await response.json()
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ error: 'Login failed', isLoading: false })
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
          })
          const data = await response.json()
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ error: 'Registration failed', isLoading: false })
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
) 