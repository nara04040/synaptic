import type { Note } from '../notes/shared/NoteTypes'
import type { Node, Edge } from './NodeTypes'
import { useNodeStore } from './NodeStore'

/**
 * Creates edges based on note references
 */
export function createEdgesFromNote(note: Note): Edge[] {
  const edges: Edge[] = []
  
  // 참조 기반 엣지 생성
  note.metadata.references.forEach(refId => {
    edges.push({
      id: `edge-${note.id}-${refId}`,
      source: `node-${note.id}`,
      target: `node-${refId}`,
      type: 'reference',
      data: {
        strength: 100, // 참조는 가장 강한 연결
        description: 'Direct reference'
      }
    })

    // 양방향 연결 추가 (약한 연결)
    edges.push({
      id: `edge-${refId}-${note.id}`,
      source: `node-${refId}`,
      target: `node-${note.id}`,
      type: 'reference',
      data: {
        strength: 50, // 역참조는 약한 연결
        description: 'Referenced by'
      }
    })
  })
  
  return edges
}

/**
 * Updates reference-based edges for a note
 */
export function syncNoteEdges(note: Note) {
  const store = useNodeStore.getState()
  
  // 기존 참조 엣지 제거
  store.edges
    .filter(edge => {
      const noteNodeId = `node-${note.id}`
      return (
        (edge.source === noteNodeId || edge.target === noteNodeId) &&
        edge.type === 'reference'
      )
    })
    .forEach(edge => store.removeEdge(edge.id))
  
  // 새 참조 엣지 생성
  const newEdges = createEdgesFromNote(note)
  newEdges.forEach(edge => store.addEdge(edge))
}

/**
 * Creates edges between nodes that share common tags
 */
export function createTagBasedEdges(targetNode: Node, allNodes: Node[]): Edge[] {
  const edges: Edge[] = []
  const targetNodeId = targetNode.id

  allNodes.forEach(node => {
    if (node.id === targetNodeId) return // Skip self

    // Find common tags
    const commonTags = node.data.tags.filter(tag => 
      targetNode.data.tags.includes(tag)
    )

    if (commonTags.length > 0) {
      edges.push({
        id: `${targetNodeId}-${node.id}-tag`,
        source: targetNodeId,
        target: node.id,
        type: 'tag',
        data: {
          strength: commonTags.length * 20, // Strength based on number of shared tags
          description: `Shares tags: ${commonTags.join(', ')}`
        }
      })
    }
  })

  return edges
}

/**
 * Updates node connections in the store based on tags
 */
export function updateNodeConnections(targetNode: Node) {
  const store = useNodeStore.getState()
  const newEdges = createTagBasedEdges(targetNode, store.nodes)
  
  // Remove existing tag-based edges for this node
  store.edges
    .filter(edge => 
      (edge.source === targetNode.id || edge.target === targetNode.id) && 
      edge.type === 'tag'
    )
    .forEach(edge => store.removeEdge(edge.id))
  
  // Add new edges
  newEdges.forEach(edge => store.addEdge(edge))
} 