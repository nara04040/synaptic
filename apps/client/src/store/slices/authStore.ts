import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
}

// 임시 admin 계정
const ADMIN_USER: User = {
  id: 'admin',
  email: 'test@gmail.com',
  name: 'Admin'
}

const ADMIN_PASSWORD = 'test1234'

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
          // 임시 admin 계정 체크
          if (email === ADMIN_USER.email && password === ADMIN_PASSWORD) {
            set({
              user: ADMIN_USER,
              token: 'admin_mock_token',
              isAuthenticated: true,
              isLoading: false,
            })
            return
          }
          
          throw new Error('Invalid credentials')
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          })
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
          // 임시 사용자 생성
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
          }
          
          set({
            user: newUser,
            token: `mock_token_${newUser.id}`,
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
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
) 