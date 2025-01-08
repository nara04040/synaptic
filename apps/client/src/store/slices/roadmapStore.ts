import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Roadmap, RoadmapState } from '@/types/store';

interface RoadmapStore extends RoadmapState {
  addRoadmap: (roadmap: Roadmap) => void;
  updateRoadmap: (roadmap: Roadmap) => void;
  deleteRoadmap: (id: string) => void;
  setActiveRoadmap: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRoadmapStore = create<RoadmapStore>()(
  devtools(
    persist(
      (set) => ({
        roadmaps: {},
        activeRoadmap: null,
        loading: false,
        error: null,
        addRoadmap: (roadmap) =>
          set((state) => ({
            roadmaps: { ...state.roadmaps, [roadmap.id]: roadmap },
          })),
        updateRoadmap: (roadmap) =>
          set((state) => ({
            roadmaps: { ...state.roadmaps, [roadmap.id]: roadmap },
          })),
        deleteRoadmap: (id) =>
          set((state) => {
            const newRoadmaps = { ...state.roadmaps };
            delete newRoadmaps[id];
            return { roadmaps: newRoadmaps };
          }),
        setActiveRoadmap: (id) => set({ activeRoadmap: id }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'roadmap-storage',
      }
    )
  )
); 