import { memo } from 'react'
import { Node, Edge } from 'reactflow'
import { LayoutType, LayoutAlgorithm } from '@/lib/layout'

interface LayoutPreviewProps {
  type: LayoutType
  algorithm: LayoutAlgorithm
  onSelect: () => void
}

export const LayoutPreview = memo(({ type, algorithm, onSelect }: LayoutPreviewProps) => {
  // 미리 정의된 샘플 노드와 엣지로 레이아웃 미리보기 생성
  const previewNodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { title: 'Node 1' } },
    { id: '2', position: { x: 0, y: 0 }, data: { title: 'Node 2' } },
    { id: '3', position: { x: 0, y: 0 }, data: { title: 'Node 3' } },
  ]

  const previewEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ]

  return (
    <div 
      className="w-32 h-32 border rounded p-2 cursor-pointer hover:border-primary"
      onClick={onSelect}
    >
      <div className="text-xs font-medium mb-1">{type}</div>
      <div className="text-xs text-muted-foreground">{algorithm}</div>
      {/* 미니 ReactFlow 인스턴스로 미리보기 표시 */}
    </div>
  )
})

LayoutPreview.displayName = 'LayoutPreview' 