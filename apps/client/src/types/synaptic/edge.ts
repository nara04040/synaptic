export type EdgeType = 'prerequisite' | 'related' | 'leads_to' | 'explains'

export interface SynapticEdge {
  id: string
  source: string
  target: string
  type: EdgeType
  strength: number
  label?: string
  style?: Record<string, any>
  data?: Record<string, any>
}

export interface EdgeStore {
  edges: SynapticEdge[]
  selectedEdge: string | null
  addEdge: (edge: Omit<SynapticEdge, 'id'>) => string
  updateEdge: (id: string, updates: Partial<SynapticEdge>) => void
  deleteEdge: (id: string) => void
  selectEdge: (id: string | null) => void
} 