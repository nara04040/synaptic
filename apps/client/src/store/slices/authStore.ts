import { create } from 'zustand'
import { AuthState, AuthUser, JWTToken } from '@/types/auth'
import { saveTokens, removeTokens, getTokens, isTokenValid, setAutoLogin, getAutoLogin, getDeviceInfo } from '@/utils/auth'
import { API_ENDPOINTS } from '@/config/api'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tokens: null,
  autoLogin: getAutoLogin(),
}

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  setUser: (user: AuthUser) => void;
  clearError: () => void;
  setAutoLogin: (enabled: boolean) => void;
}>((set, get) => ({
  ...initialState,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password,
          deviceInfo: getDeviceInfo()
        }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      saveTokens(data.tokens)
      set({ 
        user: data.user,
        tokens: data.tokens,
        isAuthenticated: true,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false 
      })
      throw error
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          name,
          deviceInfo: getDeviceInfo()
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      saveTokens(data.tokens)
      set({ 
        user: data.user,
        tokens: data.tokens,
        isAuthenticated: true,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false 
      })
      throw error
    }
  },

  logout: () => {
    removeTokens()
    set({ 
      ...initialState,
      autoLogin: get().autoLogin 
    })
  },

  refreshToken: async () => {
    const currentTokens = get().tokens
    if (!currentTokens?.refreshToken) return

    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          refreshToken: currentTokens.refreshToken,
          deviceInfo: getDeviceInfo()
        }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      saveTokens(data.tokens)
      set({ tokens: data.tokens })
    } catch (error) {
      get().logout()
      throw error
    }
  },

  setUser: (user: AuthUser) => {
    set({ user })
  },

  clearError: () => {
    set({ error: null })
  },

  setAutoLogin: (enabled: boolean) => {
    setAutoLogin(enabled)
    set({ autoLogin: enabled })
  },
})) 