import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { NodeType } from "@/types/synaptic/node"
import { EdgeType } from "@/types/synaptic/edge"

interface SynapticContextMenuProps {
  type: 'node' | 'edge'
  elementId: string
  elementType: NodeType | EdgeType
  position: { x: number; y: number }
  onEdit?: () => void
  onDelete?: () => void
  onAddEdge?: () => void
}

export function SynapticContextMenu({
  type,
  elementId,
  elementType,
  position,
  onEdit,
  onDelete,
  onAddEdge,
}: SynapticContextMenuProps) {
  return (
    <div
      className="fixed"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 50
      }}
    >
      <ContextMenu modal={false}>
        <ContextMenuTrigger />
        <ContextMenuContent className="w-48">
          <ContextMenuItem onClick={onEdit}>
            {type === 'node' ? '노드 편집' : '연결 편집'}
          </ContextMenuItem>
          {type === 'node' && (
            <ContextMenuItem onClick={onAddEdge}>
              연결 추가
            </ContextMenuItem>
          )}
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={onDelete}
            className="text-red-500 focus:text-red-500"
          >
            {type === 'node' ? '노드 삭제' : '연결 삭제'}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
} 