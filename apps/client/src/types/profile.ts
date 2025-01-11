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

export interface LearningGoals {
  dailyStudyTime?: number; // minutes
  weeklyCompletionTarget?: number;
  focusAreas: string[];
}

export interface ProfileSettings {
  theme: Theme;
  emailNotifications: EmailNotificationSettings;
  learningGoals: LearningGoals;
}

export interface ProfileState {
  profile: Profile | null;
  settings: ProfileSettings | null;
  isLoading: boolean;
  error: string | null;
} 