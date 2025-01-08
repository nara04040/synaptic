// Store Types

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Roadmap Types
export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  progress: number;
  children: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  nodes: Record<string, RoadmapNode>;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapState {
  roadmaps: Record<string, Roadmap>;
  activeRoadmap: string | null;
  loading: boolean;
  error: string | null;
}

// Learning Types
export interface LearningProgress {
  nodeId: string;
  progress: number;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface LearningState {
  progress: Record<string, LearningProgress>;
  currentNode: string | null;
  loading: boolean;
  error: string | null;
}

// Theme Types
export interface ThemeState {
  mode: 'light' | 'dark';
  systemPreference: boolean;
}

// Root Store Type
export interface RootState {
  user: UserState;
  roadmap: RoadmapState;
  learning: LearningState;
  theme: ThemeState;
} 