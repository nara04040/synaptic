import { memo, useState } from 'react'
import { NodeProps, NodeResizer } from 'reactflow'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ColorPicker } from '@/components/ui/color-picker'

const GroupNode = memo(({ data, selected }: NodeProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={cn(
        "min-w-[200px] min-h-[100px] p-4 rounded-lg border-2 border-dashed relative",
        selected ? "border-primary" : "border-border"
      )}
      style={{
        backgroundColor: data.style?.backgroundColor || 'hsl(var(--muted))',
        opacity: data.style?.opacity || 1,
      }}
    >
      <NodeResizer 
        minWidth={200} 
        minHeight={100}
        isVisible={selected}
      />
      <Collapsible open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{data.title}</span>
            <Badge variant="outline">{data.nodes?.length || 0} nodes</Badge>
            {data.parentGroup && (
              <Badge variant="secondary">Sub-group</Badge>
            )}
          </div>
          {selected && (
            <ColorPicker
              color={data.style?.backgroundColor}
              onChange={(color) => data.onStyleChange?.({ backgroundColor: color })}
            />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="text-sm text-muted-foreground mt-2">{data.description}</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
})

GroupNode.displayName = 'GroupNode'

export default GroupNode 