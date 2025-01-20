import { create } from 'zustand'
import type { Node, Edge, NodeMap } from './NodeTypes'

interface NodeStore {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  removeEdge: (id: string) => void;
  clear: () => void;
}

export const useNodeStore = create<NodeStore>((set) => ({
  nodes: [],
  edges: [],
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) => 
      node.id === id ? { ...node, ...data } : node
    )
  })),
  
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    )
  })),
  
  addEdge: (edge) => set((state) => ({ 
    edges: [...state.edges, edge] 
  })),
  
  updateEdge: (id, data) => set((state) => ({
    edges: state.edges.map((edge) =>
      edge.id === id ? { ...edge, ...data } : edge
    )
  })),
  
  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter((edge) => edge.id !== id)
  })),
  
  clear: () => set({ nodes: [], edges: [] })
})) 