import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { EdgeStore, SynapticEdge } from '@/types/synaptic/edge'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useEdgeStore = create<EdgeStore>()(
  persist(
    (set) => ({
      edges: [],
      selectedEdge: null,

      addEdge: (edge) => {
        const id = uuidv4()
        set((state) => ({
          edges: [...state.edges, { ...edge, id }]
        }))
        return id
      },

      updateEdge: (id, updates) => {
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === id ? { ...edge, ...updates } : edge
          )
        }))
      },

      deleteEdge: (id) => {
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== id),
          selectedEdge: state.selectedEdge === id ? null : state.selectedEdge
        }))
      },

      selectEdge: (id) => {
        set({ selectedEdge: id })
      }
    }),
    {
      name: 'synaptic-edges',
      storage: createJSONStorage(() => localStorage)
    }
  )
) 