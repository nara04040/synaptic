export enum CareerLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  email: string;
  profileImage?: string;
  jobTitle?: string;
  careerLevel?: CareerLevel;
  techStack: string[];
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  personalWebsite?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailNotificationSettings {
  dailyDigest: boolean;
  weeklyProgress: boolean;
  learningReminders: boolean;
  roadmapUpdates: boolean;
}

export interface LearningGoalSettings {
  dailyStudyTime: number; // in minutes
  weeklyCompletionTarget: number;
  focusAreas: string[];
  preferredLearningTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningStyle?: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  difficultyPreference?: 'beginner' | 'intermediate' | 'advanced';
  topicsOfInterest?: string[];
  certificateGoals?: string[];
}

export interface DisplaySettings {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: Theme;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections';
  showEmail: boolean;
  showProgress: boolean;
  showAchievements: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  contrast: 'normal' | 'high';
  reduceAnimations: boolean;
  screenReaderOptimized: boolean;
}

export interface Settings {
  display: DisplaySettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  emailNotifications: EmailNotificationSettings;
  learningGoals: LearningGoalSettings;
}

export interface ProfileState {
  profile: Profile | null;
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  fetchSettings: () => Promise<void>;
  updateSettings: (settingsData: Partial<Settings>) => Promise<void>;
  clearError: () => void;
}

export type SettingsUpdateAction = {
  type: 'display' | 'privacy' | 'accessibility' | 'emailNotifications' | 'learningGoals';
  payload: Partial<Settings[keyof Settings]>;
}; 