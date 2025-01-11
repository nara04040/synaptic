import { create } from 'zustand'
import { Profile, ProfileSettings, ProfileState } from '@/types/profile'
import { API_ENDPOINTS } from '@/config/api'

const initialState: ProfileState = {
  profile: null,
  settings: null,
  isLoading: false,
  error: null,
}

export const useProfileStore = create<ProfileState & {
  fetchProfile: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<ProfileSettings>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  clearError: () => void;
}>((set, get) => ({
  ...initialState,

  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE.BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      set({ profile: data, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
        isLoading: false 
      })
    }
  },

  updateProfile: async (profileData: Partial<Profile>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE.BASE, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      set({ profile: data, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false 
      })
    }
  },

  fetchSettings: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE.SETTINGS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }

      const data = await response.json()
      set({ settings: data, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch settings',
        isLoading: false 
      })
    }
  },

  updateSettings: async (settingsData: Partial<ProfileSettings>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE.SETTINGS, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(settingsData),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      const data = await response.json()
      set({ settings: data, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update settings',
        isLoading: false 
      })
    }
  },

  uploadAvatar: async (file: File) => {
    set({ isLoading: true, error: null })
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch(API_ENDPOINTS.PROFILE.AVATAR, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload avatar')
      }

      const data = await response.json()
      set({ 
        profile: { ...get().profile!, profileImage: data.imageUrl },
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to upload avatar',
        isLoading: false 
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },
})) 