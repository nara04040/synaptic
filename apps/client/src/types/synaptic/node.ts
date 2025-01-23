export type NodeType = 'concept' | 'note' | 'resource'

export interface SynapticNode {
  id: string
  label: string
  type: NodeType
  strength: number
  lastReview?: string
  content?: string
  position?: {
    x: number
    y: number
  }
  style?: Record<string, any>
  data?: Record<string, any>
}

export interface NodeStore {
  nodes: SynapticNode[]
  selectedNode: string | null
  addNode: (node: Omit<SynapticNode, 'id'>) => string
  updateNode: (id: string, updates: Partial<SynapticNode>) => void
  deleteNode: (id: string) => void
  selectNode: (id: string | null) => void
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void
} 