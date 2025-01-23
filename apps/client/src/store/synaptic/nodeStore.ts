import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { NodeStore, SynapticNode } from '@/types/synaptic/node'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useNodeStore = create<NodeStore>()(
  persist(
    (set) => ({
      nodes: [],
      selectedNode: null,

      addNode: (node) => {
        const id = uuidv4()
        set((state) => ({
          nodes: [...state.nodes, { ...node, id }]
        }))
        return id
      },

      updateNode: (id, updates) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, ...updates } : node
          )
        }))
      },

      deleteNode: (id) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
          selectedNode: state.selectedNode === id ? null : state.selectedNode
        }))
      },

      selectNode: (id) => {
        set({ selectedNode: id })
      },

      updateNodePosition: (nodeId: string, position: {x: number, y: number}) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId ? { ...node, position } : node
          ),
        })),
    }),
    {
      name: 'synaptic-nodes',
      storage: createJSONStorage(() => localStorage)
    }
  )
) 