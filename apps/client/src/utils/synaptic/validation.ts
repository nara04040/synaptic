import { SynapticNode } from '@/types/synaptic/node'
import { SynapticEdge } from '@/types/synaptic/edge'

export const validateNode = (node: Partial<SynapticNode>): string[] => {
  const errors: string[] = []

  if (!node.label?.trim()) {
    errors.push('Node label is required')
  }

  if (!node.type) {
    errors.push('Node type is required')
  }

  if (typeof node.strength !== 'number' || node.strength < 0 || node.strength > 100) {
    errors.push('Node strength must be a number between 0 and 100')
  }

  return errors
}

export const validateEdge = (edge: Partial<SynapticEdge>): string[] => {
  const errors: string[] = []

  if (!edge.source) {
    errors.push('Edge source is required')
  }

  if (!edge.target) {
    errors.push('Edge target is required')
  }

  if (!edge.type) {
    errors.push('Edge type is required')
  }

  if (typeof edge.strength !== 'number' || edge.strength < 0 || edge.strength > 100) {
    errors.push('Edge strength must be a number between 0 and 100')
  }

  if (edge.source === edge.target) {
    errors.push('Edge source and target must be different')
  }

  return errors
}

export const validateNodeConnection = (
  source: SynapticNode,
  target: SynapticNode,
  existingEdges: SynapticEdge[]
): string[] => {
  const errors: string[] = []

  // 이미 연결되어 있는지 확인
  const isAlreadyConnected = existingEdges.some(
    edge => edge.source === source.id && edge.target === target.id
  )

  if (isAlreadyConnected) {
    errors.push('Nodes are already connected')
  }

  return errors
} 