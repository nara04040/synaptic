import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LearningProgress, LearningState } from '@/types/store';

interface LearningStore extends LearningState {
  updateProgress: (progress: LearningProgress) => void;
  setCurrentNode: (nodeId: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLearningStore = create<LearningStore>()(
  devtools(
    persist(
      (set) => ({
        progress: {},
        currentNode: null,
        loading: false,
        error: null,
        updateProgress: (progress) =>
          set((state) => ({
            progress: { ...state.progress, [progress.nodeId]: progress },
          })),
        setCurrentNode: (nodeId) => set({ currentNode: nodeId }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'learning-storage',
      }
    )
  )
); 