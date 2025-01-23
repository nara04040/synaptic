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
    <ContextMenu>
      <ContextMenuTrigger />
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onEdit}>
          Edit {type}
        </ContextMenuItem>
        {type === 'node' && (
          <ContextMenuItem onClick={onAddEdge}>
            Add connection
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={onDelete}
          className="text-red-500 focus:text-red-500"
        >
          Delete {type}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
} 