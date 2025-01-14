import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const ConceptNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div className={cn(
      "px-4 py-2 shadow-lg rounded-lg bg-background border-2",
      selected ? "border-primary" : "border-border"
    )}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{data.title}</span>
          <Badge variant={
            data.status === 'completed' ? 'default' :
            data.status === 'in_progress' ? 'secondary' : 'outline'
          }>
            {data.status}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">{data.description}</p>
        
        <Badge variant="outline" className="w-fit">
          {data.difficulty}
        </Badge>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})

ConceptNode.displayName = 'ConceptNode'

export default ConceptNode 