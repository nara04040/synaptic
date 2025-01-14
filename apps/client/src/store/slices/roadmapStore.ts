import { create } from 'zustand';
import { Roadmap } from '@/types/roadmap';
import { dummyRoadmaps } from "@/lib/data/dummyRoadmaps"

interface RoadmapState {
  roadmaps: Roadmap[];
  currentRoadmap: Roadmap | null;
  isLoading: boolean;
  error: Error | null;

  fetchRoadmaps: () => Promise<void>;
  createRoadmap: (data: Omit<Roadmap, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  updateRoadmap: (id: string, data: Partial<Roadmap>) => Promise<void>;
  deleteRoadmap: (id: string) => Promise<void>;
}

export const useRoadmapStore = create<RoadmapState>((set) => ({
  roadmaps: [],
  currentRoadmap: null,
  isLoading: false,
  error: null,

  fetchRoadmaps: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ roadmaps: dummyRoadmaps, isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },

  createRoadmap: async (data) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const newRoadmap: Roadmap = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "user1"
      }
      set((state) => ({ 
        roadmaps: [...state.roadmaps, newRoadmap],
        isLoading: false 
      }))
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },

  updateRoadmap: async (id, data) => {
    set({ isLoading: true })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      set((state) => ({
        roadmaps: state.roadmaps.map(roadmap => 
          roadmap.id === id 
            ? { ...roadmap, ...data, updatedAt: new Date() }
            : roadmap
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },

  deleteRoadmap: async (id) => {
    set({ isLoading: true });
    try {
      // TODO: API 구현 후 실제 데이터 삭제로 변경
      await fetch(`/api/roadmaps/${id}`, { method: 'DELETE' });
      set((state) => ({
        roadmaps: state.roadmaps.filter(r => r.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  }
})); 