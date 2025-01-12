import { create } from 'zustand'
import { Profile, ProfileSettings, ProfileState, CareerLevel, Theme } from '@/types/profile'

// 임시 더미 데이터
const DUMMY_PROFILE: Profile = {
  id: '1',
  userId: '1',
  name: 'John Doe',
  email: 'john@example.com',
  profileImage: undefined,
  jobTitle: 'Software Engineer',
  careerLevel: CareerLevel.INTERMEDIATE,
  techStack: ['react', 'typescript', 'nextjs'],
  bio: 'Passionate about web development and new technologies.',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  personalWebsite: 'https://blog.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const DUMMY_SETTINGS: ProfileSettings = {
  theme: Theme.SYSTEM,
  emailNotifications: {
    dailyDigest: true,
    weeklyProgress: true,
    learningReminders: true,
    roadmapUpdates: true,
  },
  learningGoals: {
    dailyStudyTime: 120,
    weeklyCompletionTarget: 5,
    focusAreas: ['frontend', 'backend'],
  },
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  settings: null,
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      // API 구현 전까지 더미 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 1000)) // 실제 API 호출처럼 보이게 하기 위한 지연
      set({ profile: DUMMY_PROFILE })
    } catch (error) {
      set({ error: '프로필을 불러오는데 실패했습니다.' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateProfile: async (profileData: Partial<Profile>) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      set(state => ({
        profile: state.profile ? { ...state.profile, ...profileData } : null
      }))
    } catch (error) {
      set({ error: '프로필 업데이트에 실패했습니다.' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSettings: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      set({ settings: DUMMY_SETTINGS })
    } catch (error) {
      set({ error: '설정을 불러오는데 실패했습니다.' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateSettings: async (settingsData: Partial<ProfileSettings>) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      set(state => ({
        settings: state.settings ? { ...state.settings, ...settingsData } : null
      }))
    } catch (error) {
      set({ error: '설정 업데이트에 실패했습니다.' })
    } finally {
      set({ isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
})) 