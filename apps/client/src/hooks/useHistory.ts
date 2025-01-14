import { useState, useCallback } from 'react'
import { Node, Edge } from 'reactflow'

interface HistoryState {
  nodes: Node[]
  edges: Edge[]
}

export function useHistory(initialNodes: Node[], initialEdges: Edge[]) {
  const [history, setHistory] = useState<HistoryState[]>([{ nodes: initialNodes, edges: initialEdges }])
  const [currentIndex, setCurrentIndex] = useState(0)

  const pushToHistory = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1)
      return [...newHistory, { nodes, edges }]
    })
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      return history[currentIndex - 1]
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1)
      return history[currentIndex + 1]
    }
    return null
  }, [currentIndex, history])

  return {
    pushToHistory,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  }
} 