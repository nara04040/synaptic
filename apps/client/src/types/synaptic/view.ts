export interface ViewState {
  zoom: number
  position: { x: number; y: number }
  selectedNodes: string[]
  selectedEdges: string[]
  mode: 'default' | 'add-node' | 'add-edge'
}

export interface ViewStore {
  view: ViewState
  setZoom: (zoom: number) => void
  setPosition: (position: { x: number; y: number }) => void
  setSelectedNodes: (nodeIds: string[]) => void
  setSelectedEdges: (edgeIds: string[]) => void
  setMode: (mode: ViewState['mode']) => void
  resetView: () => void
} 