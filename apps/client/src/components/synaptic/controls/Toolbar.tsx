import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PlusIcon, ZoomInIcon, ZoomOutIcon, RotateCcwIcon, LayoutGridIcon } from "lucide-react"

interface ToolbarProps {
  onAddNode: (position: { x: number; y: number }) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onLayoutReset: () => void
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg">
    {children}
  </div>
)

const ToolbarButton = ({ icon, label, onClick }: ToolbarButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="h-8 w-8 text-slate-400 hover:text-slate-100"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export function Toolbar({
  onAddNode,
  onZoomIn,
  onZoomOut,
  onResetView,
  onLayoutReset,
}: ToolbarProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <ButtonGroup>
        <ToolbarButton
          icon={<PlusIcon className="h-4 w-4" />}
          label="Add Node"
          onClick={() => onAddNode({ x: 0, y: 0 })}
        />
      </ButtonGroup>
      <ButtonGroup>
        <ToolbarButton
          icon={<ZoomInIcon className="h-4 w-4" />}
          label="Zoom In"
          onClick={onZoomIn}
        />
        <ToolbarButton
          icon={<ZoomOutIcon className="h-4 w-4" />}
          label="Zoom Out"
          onClick={onZoomOut}
        />
        <ToolbarButton
          icon={<RotateCcwIcon className="h-4 w-4" />}
          label="Reset View"
          onClick={onResetView}
        />
      </ButtonGroup>
      <ButtonGroup>
        <ToolbarButton
          icon={<LayoutGridIcon className="h-4 w-4" />}
          label="Reset Layout"
          onClick={onLayoutReset}
        />
      </ButtonGroup>
    </div>
  )
} 