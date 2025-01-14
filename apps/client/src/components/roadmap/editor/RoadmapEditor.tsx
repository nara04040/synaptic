"use client"

import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeTypes,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useParams } from 'next/navigation'
import { toast } from "sonner"

import ConceptNode from './nodes/ConceptNode'
import { EditorToolbar } from './EditorToolbar'
import { EditorSidebar } from './EditorSidebar'
import { useRoadmapStore } from '@/store/slices/roadmapStore'
import { NodeEditPanel } from './NodeEditPanel'
import { useHistory } from '@/hooks/useHistory'
import { getLayoutedElements } from '@/lib/layout'

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

export function RoadmapEditor() {
  const params = useParams()
  const { updateRoadmap } = useRoadmapStore()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null)
  const { pushToHistory, undo, redo, canUndo, canRedo } = useHistory(initialNodes, initialEdges)
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([])

  const nodeTypes = useMemo<NodeTypes>(() => ({
    concept: ConceptNode,
  }), [])

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      const position = {
        x: event.clientX,
        y: event.clientY,
      }

      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: {
          title: `New ${type}`,
          description: 'Click to edit',
          status: 'not_started',
          difficulty: 'beginner',
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes]
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const onUpdateNode = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          }
        }
        return node
      })
    )
  }, [setNodes])

  const handleDeleteNode = useCallback(() => {
    if (!selectedNode) return
    
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ))
    setSelectedNode(null)
    
    toast.success("Node deleted successfully")
  }, [selectedNode, setNodes, setEdges])

  const handleSave = useCallback(async () => {
    if (!params.id) return

    try {
      await updateRoadmap(params.id as string, {
        nodes,
        edges,
      })
      toast.success("Roadmap saved successfully")
    } catch (error) {
      console.error('Failed to save roadmap:', error)
      toast.error("Failed to save roadmap")
    }
  }, [params.id, nodes, edges, updateRoadmap])

  const handleZoomIn = useCallback(() => {
    rfInstance?.zoomIn()
  }, [rfInstance])

  const handleZoomOut = useCallback(() => {
    rfInstance?.zoomOut()
  }, [rfInstance])

  const handleFitView = useCallback(() => {
    rfInstance?.fitView()
  }, [rfInstance])

  const handleUndo = useCallback(() => {
    const prev = undo()
    if (prev) {
      setNodes(prev.nodes)
      setEdges(prev.edges)
    }
  }, [undo, setNodes, setEdges])

  const handleRedo = useCallback(() => {
    const next = redo()
    if (next) {
      setNodes(next.nodes)
      setEdges(next.edges)
    }
  }, [redo, setNodes, setEdges])

  const handleSelectionChange = useCallback((params: { nodes: Node[] }) => {
    setSelectedNodes(params.nodes)
  }, [])

  const debouncedPushToHistory = useMemo(() => {
    let timeoutId: NodeJS.Timeout | null = null
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        pushToHistory(nodes, edges)
      }, 300)
    }
  }, [pushToHistory])

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      debouncedPushToHistory()
    }
  }, [nodes, edges, debouncedPushToHistory])

  const handleCreateGroup = useCallback(() => {
    if (selectedNodes.length === 0) return

    const groupId = `group-${Date.now()}`
    const avgX = selectedNodes.reduce((sum, node) => sum + node.position.x, 0) / selectedNodes.length
    const avgY = selectedNodes.reduce((sum, node) => sum + node.position.y, 0) / selectedNodes.length

    const groupNode: Node = {
      id: groupId,
      type: 'group',
      position: { x: avgX, y: avgY },
      data: {
        title: 'New Group',
        description: 'Group description',
        nodes: selectedNodes.map(node => node.id),
      },
      style: {
        width: 300,
        height: 200,
      },
    }

    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => 
        selectedNodes.find(n => n.id === node.id)
          ? { ...node, data: { ...node.data, group: groupId } }
          : node
      )
      return [...updatedNodes, groupNode]
    })
  }, [selectedNodes])

  const handleUngroup = useCallback(() => {
    if (!selectedNode || selectedNode.type !== 'group') return

    setNodes(prevNodes => 
      prevNodes
        .filter(node => node.id !== selectedNode.id)
        .map(node => 
          node.data.group === selectedNode.id
            ? { ...node, data: { ...node.data, group: undefined } }
            : node
        )
    )
    setSelectedNode(null)
  }, [selectedNode])

  const handleAutoLayout = useCallback(async () => {
    if (nodes.length === 0) return

    const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(nodes, edges, {
      type: 'TB',
      animate: true
    })
    
    setNodes(prevNodes => 
      layoutedNodes.map(layoutedNode => {
        const originalNode = prevNodes.find(n => n.id === layoutedNode.id)
        return {
          ...layoutedNode,
          data: originalNode?.data || layoutedNode.data,
          style: originalNode?.style || layoutedNode.style
        }
      })
    )
    
    setEdges(layoutedEdges)
  }, [nodes, edges])

  return (
    <div className="h-[calc(100vh-12rem)] rounded-lg border bg-background w-full">
      <div className="flex h-full">
        <EditorSidebar />
        <div className="relative flex-1 w-full overflow-hidden">
          <EditorToolbar 
            onSave={handleSave}
            onDeleteNode={handleDeleteNode}
            selectedNode={!!selectedNode}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFitView={handleFitView}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            onCreateGroup={handleCreateGroup}
            onAutoLayout={handleAutoLayout}
            canGroup={!!selectedNode}
            onUngroup={handleUngroup}
            canUngroup={!!selectedNode && selectedNode.type === 'group'}
            onLayoutChange={handleAutoLayout}
          />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            onInit={setRfInstance}
            onSelectionChange={handleSelectionChange}
            multiSelectionKeyCode="Shift"
            className="w-full h-[calc(100%-50px)]"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <NodeEditPanel 
          node={selectedNode} 
          onUpdate={onUpdateNode}
        />
      </div>
    </div>
  )
} 