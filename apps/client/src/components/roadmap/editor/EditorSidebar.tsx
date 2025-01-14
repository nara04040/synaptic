"use client"

export function EditorSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 border-r bg-muted/10 p-4">
      <h2 className="font-semibold mb-4">Node Types</h2>
      <div className="space-y-4">
        <div
          className="rounded-lg border bg-card p-3 cursor-move"
          onDragStart={(e) => onDragStart(e, 'concept')}
          draggable
        >
          Concept Node
        </div>
        <div
          className="rounded-lg border bg-card p-3 cursor-move"
          onDragStart={(e) => onDragStart(e, 'resource')}
          draggable
        >
          Resource Node
        </div>
        <div
          className="rounded-lg border bg-card p-3 cursor-move"
          onDragStart={(e) => onDragStart(e, 'milestone')}
          draggable
        >
          Milestone Node
        </div>
      </div>
    </div>
  )
} 