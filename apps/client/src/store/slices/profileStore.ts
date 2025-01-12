'use client'

import { create } from 'zustand'
import { ProfileState, Profile, Settings, SettingsUpdateAction } from '@/types/profile'
import { api } from '@/lib/api'

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  settings: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get<Profile>('/api/profile')
      set({ profile: response.data })
    } catch (error) {
      set({ error: 'Failed to fetch profile' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.patch<Profile>('/api/profile', profileData)
      set({ profile: response.data })
    } catch (error) {
      set({ error: 'Failed to update profile' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSettings: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get<Settings>('/api/settings')
      set({ settings: response.data })
    } catch (error) {
      set({ error: 'Failed to fetch settings' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateSettings: async (settingsData) => {
    const currentSettings = get().settings
    if (!currentSettings) return

    set({ isLoading: true, error: null })
    try {
      const response = await api.patch<Settings>('/api/settings', settingsData)
      set({ settings: response.data })
    } catch (error) {
      set({ error: 'Failed to update settings' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateSettingSection: async ({ type, payload }: SettingsUpdateAction) => {
    const currentSettings = get().settings
    if (!currentSettings) return

    set({ isLoading: true, error: null })
    try {
      const updatedSettings = {
        ...currentSettings,
        [type]: {
          ...currentSettings[type],
          ...payload
        }
      }
      const response = await api.patch<Settings>('/api/settings', updatedSettings)
      set({ settings: response.data })
    } catch (error) {
      set({ error: `Failed to update ${type} settings` })
    } finally {
      set({ isLoading: false })
    }
  },

  validateSettings: (settingsData: Partial<Settings>): boolean => {
    // Display settings validation
    if (settingsData.display) {
      const { language, timezone, dateFormat } = settingsData.display
      if (language && !['en', 'ko'].includes(language)) return false
      if (timezone && !timezone.match(/^[A-Za-z_/]+$/)) return false
      if (dateFormat && !['yyyy-MM-dd', 'MM/dd/yyyy', 'dd/MM/yyyy'].includes(dateFormat)) return false
    }

    // Privacy settings validation
    if (settingsData.privacy) {
      const { profileVisibility } = settingsData.privacy
      if (profileVisibility && !['public', 'private', 'connections'].includes(profileVisibility)) return false
    }

    // Learning goals validation
    if (settingsData.learningGoals) {
      const { dailyStudyTime, weeklyCompletionTarget } = settingsData.learningGoals
      if (dailyStudyTime && (dailyStudyTime < 0 || dailyStudyTime > 1440)) return false
      if (weeklyCompletionTarget && (weeklyCompletionTarget < 0 || weeklyCompletionTarget > 100)) return false
    }

    return true
  },

  clearError: () => set({ error: null })
})) 