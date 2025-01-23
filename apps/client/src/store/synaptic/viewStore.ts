import { create } from 'zustand'
import { ViewStore, ViewState } from '@/types/synaptic/view'
import { createJSONStorage, persist } from 'zustand/middleware'

const DEFAULT_VIEW_STATE: ViewState = {
  zoom: 1,
  position: { x: 0, y: 0 },
  selectedNodes: [],
  selectedEdges: [],
  mode: 'default'
}

export const useViewStore = create<ViewStore>()(
  persist(
    (set) => ({
      view: DEFAULT_VIEW_STATE,

      setZoom: (zoom) => {
        set((state) => ({
          view: { ...state.view, zoom }
        }))
      },

      setPosition: (position) => {
        set((state) => ({
          view: { ...state.view, position }
        }))
      },

      setSelectedNodes: (nodeIds) => {
        set((state) => ({
          view: { ...state.view, selectedNodes: nodeIds }
        }))
      },

      setSelectedEdges: (edgeIds) => {
        set((state) => ({
          view: { ...state.view, selectedEdges: edgeIds }
        }))
      },

      setMode: (mode) => {
        set((state) => ({
          view: { ...state.view, mode }
        }))
      },

      resetView: () => {
        set({ view: DEFAULT_VIEW_STATE })
      }
    }),
    {
      name: 'synaptic-view',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        view: {
          zoom: state.view.zoom,
          position: state.view.position,
          mode: state.view.mode
        }
      })
    }
  )
) 