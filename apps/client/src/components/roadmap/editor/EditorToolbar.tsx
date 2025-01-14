"use client"

import { Button } from "@/components/ui/button"
import { 
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Plus,
  Trash,
  Maximize2,
  Group,
  Layout,
  Ungroup
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { LayoutOptions } from '@/lib/layout'
import { LayoutPreview } from '@/components/roadmap/editor/LayoutPreview'

interface EditorToolbarProps {
  onSave: () => void
  onDeleteNode: () => void
  selectedNode: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onFitView: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onCreateGroup: () => void
  onAutoLayout: () => void
  canGroup: boolean
  onUngroup: () => void
  canUngroup: boolean
  onLayoutChange: (options: LayoutOptions) => void
}

export function EditorToolbar({ 
  onSave, 
  onDeleteNode, 
  selectedNode,
  onZoomIn,
  onZoomOut,
  onFitView,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onCreateGroup,
  onAutoLayout,
  canGroup,
  onUngroup,
  canUngroup,
  onLayoutChange,
}: EditorToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
      <Button 
        size="icon" 
        variant="outline" 
        onClick={onUndo} 
        disabled={!canUndo}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        size="icon" 
        variant="outline" 
        onClick={onRedo} 
        disabled={!canRedo}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-2" />
      <Button size="icon" variant="outline" onClick={onZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={onZoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={onFitView}>
        <Maximize2 className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-2" />
      <Button 
        size="icon" 
        variant="outline"
        disabled={!selectedNode}
        onClick={onDeleteNode}
      >
        <Trash className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-2" />
      <Button onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button 
        size="icon" 
        variant="outline"
        onClick={onCreateGroup}
        disabled={!canGroup}
      >
        <Group className="h-4 w-4" />
      </Button>
      <Button 
        size="icon" 
        variant="outline"
        onClick={onAutoLayout}
      >
        <Layout className="h-4 w-4" />
      </Button>
      <Button 
        size="icon" 
        variant="outline"
        onClick={onUngroup}
        disabled={!canUngroup}
      >
        <Ungroup className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Layout className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Layout Preview</DropdownMenuLabel>
          <div className="grid grid-cols-2 gap-2 p-2">
            <LayoutPreview
              type="TB"
              algorithm="dagre"
              onSelect={() => onLayoutChange({ type: 'TB', algorithm: 'dagre', animate: true })}
            />
            <LayoutPreview
              type="LR"
              algorithm="dagre"
              onSelect={() => onLayoutChange({ type: 'LR', algorithm: 'dagre', animate: true })}
            />
            <LayoutPreview
              type="force"
              algorithm="force"
              onSelect={() => onLayoutChange({ type: 'force', algorithm: 'force', animate: true })}
            />
            <LayoutPreview
              type="radial"
              algorithm="radial"
              onSelect={() => onLayoutChange({ type: 'radial', algorithm: 'radial', animate: true })}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 