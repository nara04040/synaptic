import { useEffect, useRef, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape, { Core, NodeSingular } from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'
import { useNodeStore } from '@/store/synaptic/nodeStore'
import { useEdgeStore } from '@/store/synaptic/edgeStore'
import { useViewStore } from '@/store/synaptic/viewStore'
import { LAYOUT_OPTIONS } from '@/utils/synaptic/layout'
import { cytoscapeStylesheet } from '@/utils/synaptic/style'
import { SynapticContextMenu } from './SynapticContextMenu'
import { NodeForm } from '../forms/NodeForm'
import { EdgeForm } from '../forms/EdgeForm'
import { DeleteDialog } from '../forms/DeleteDialog'
import { NodeType } from '@/types/synaptic/node'
import { EdgeType } from '@/types/synaptic/edge'
import { SynapticNode } from '@/types/synaptic/node'
import { SynapticEdge } from '@/types/synaptic/edge'
import { Toolbar } from '../controls/Toolbar'
import { v4 as uuidv4 } from 'uuid'

// COSE-Bilkent 레이아웃 등록
cytoscape.use(coseBilkent)

// 테스트용 데이터 타입 정의
interface TestNode {
  data: {
    id: string
    label: string
    type: NodeType
    strength: number
    position?: { x: number; y: number }
  }
}

interface TestEdge {
  data: {
    id: string
    source: string
    target: string
    type: EdgeType
    strength: number
    label?: string
  }
}

// 테스트용 데이터
const TEST_DATA: { nodes: TestNode[], edges: TestEdge[] } = {
  nodes: [
    { 
      data: { 
        id: '1', 
        label: 'JavaScript 기초',
        type: 'concept',
        strength: 85,
        position: { x: 0, y: 0 }
      }
    },
    { 
      data: { 
        id: '2', 
        label: '변수와 스코프',
        type: 'note',
        strength: 75,
        position: { x: 100, y: 0 }
      }
    },
    { 
      data: { 
        id: '3', 
        label: '클로저',
        type: 'resource',
        strength: 60,
        position: { x: 200, y: 0 }
      }
    }
  ],
  edges: [
    { 
      data: { 
        id: 'e1-2', 
        source: '1', 
        target: '2',
        type: 'prerequisite',
        strength: 85,
      }
    },
    { 
      data: { 
        id: 'e2-3', 
        source: '2', 
        target: '3',
        type: 'leads_to',
        strength: 70,
      }
    }
  ]
}

interface ContextMenuState {
  show: boolean
  type: 'node' | 'edge'
  elementId: string
  elementType: NodeType | EdgeType
  position: { x: number; y: number }
}

interface DialogState {
  type: 'node' | 'edge'
  mode: 'edit' | 'delete' | 'add-edge'
  elementId: string
  sourceNode?: string
  targetNode?: string
  connectedEdgesCount?: number
}

export function SynapticMap() {
  const cyRef = useRef<Core | null>(null)
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [dialog, setDialog] = useState<DialogState | null>(null)
  
  const { selectNode, updateNodePosition, updateNode, deleteNode, addNode } = useNodeStore()
  const { selectEdge, updateEdge, deleteEdge, addEdge } = useEdgeStore()
  const { setZoom, setPosition, setSelectedNodes, setSelectedEdges } = useViewStore()

  // 노드 하이라이트 함수
  const highlightConnectedNodes = (nodeId: string) => {
    const cy = cyRef.current
    if (!cy) return

    // 모든 요소를 흐리게 처리
    cy.elements().addClass('faded').removeClass('selected highlighted animated')

    // 선택된 노드 하이라이트
    const selectedNode = cy.getElementById(nodeId)
    selectedNode.removeClass('faded').addClass('selected')

    // 연결된 엣지와 노드 하이라이트
    const neighborhood = selectedNode.neighborhood()
    neighborhood.removeClass('faded').addClass('highlighted')
    
    // 연결된 엣지에 애니메이션 적용
    neighborhood.edges().addClass('animated')
  }

  // 엣지 애니메이션 함수
  const animateEdges = () => {
    const cy = cyRef.current
    if (!cy) return

    cy.edges('.animated').forEach(edge => {
      edge.style('line-dash-offset', 0)
      edge.animate({
        style: { 'line-dash-offset': 24 },
        duration: 2000,
        queue: false,
        complete: () => {
          if (edge.hasClass('animated')) {
            animateEdges()
          }
        }
      })
    })
  }

  // 노드 드래그 이벤트 핸들러
  const handleNodeDragFree = (node: NodeSingular) => {
    const position = node.position()
    updateNodePosition(node.id(), position)
  }

  // 컨텍스트 메뉴 핸들러
  const handleContextMenu = (evt: any) => {
    evt.preventDefault()
    
    const element = evt.target
    // 실제 마우스 이벤트의 좌표 사용
    const position = {
      x: evt.originalEvent.clientX,
      y: evt.originalEvent.clientY
    }

    if (element === cyRef.current) {
      setContextMenu(null)
      return
    }

    if (element.isNode()) {
      setContextMenu({
        show: true,
        type: 'node',
        elementId: element.id(),
        elementType: element.data('type') as NodeType,
        position
      })
    } else if (element.isEdge()) {
      setContextMenu({
        show: true,
        type: 'edge',
        elementId: element.id(),
        elementType: element.data('type') as EdgeType,
        position
      })
    }
  }

  // 편집 핸들러
  const handleEdit = () => {
    if (!contextMenu) return
    setDialog({
      type: contextMenu.type,
      mode: 'edit',
      elementId: contextMenu.elementId
    })
    setContextMenu(null)
  }

  // 삭제 핸들러
  const handleDelete = () => {
    if (!contextMenu) return
    
    let connectedEdgesCount = 0
    if (contextMenu.type === 'node') {
      // 연결된 엣지 개수 계산
      const cy = cyRef.current
      if (cy) {
        const node = cy.getElementById(contextMenu.elementId)
        connectedEdgesCount = node.connectedEdges().length
      }
    }

    setDialog({
      type: contextMenu.type,
      mode: 'delete',
      elementId: contextMenu.elementId,
      connectedEdgesCount
    })
    setContextMenu(null)
  }

  // 엣지 추가 핸들러
  const handleAddEdge = () => {
    if (!contextMenu || contextMenu.type !== 'node') return
    setDialog({
      type: 'edge',
      mode: 'add-edge',
      elementId: '',
      sourceNode: contextMenu.elementId
    })
    setContextMenu(null)
  }

  // 노드 업데이트 핸들러
  const handleNodeUpdate = (data: Partial<SynapticNode>) => {
    if (!dialog || dialog.type !== 'node') return
    const node = TEST_DATA.nodes.find(n => n.data.id === dialog.elementId)
    if (!node) return

    // store 업데이트
    updateNode(dialog.elementId, {
      ...data,
      position: node.data.position || { x: 0, y: 0 }
    })

    // Cytoscape 요소 업데이트
    const cy = cyRef.current
    if (cy) {
      const element = cy.getElementById(dialog.elementId)
      element.data({
        label: data.label,
        type: data.type,
        strength: data.strength,
      })
    }

    setDialog(null)
  }

  // 엣지 업데이트 핸들러
  const handleEdgeUpdate = (data: Partial<SynapticEdge>) => {
    if (!dialog || dialog.type !== 'edge') return
    
    if (dialog.mode === 'add-edge') {
      if (!dialog.sourceNode || !dialog.targetNode) return
      
      // store에 엣지 추가
      const edgeId = addEdge({
        source: dialog.sourceNode,
        target: dialog.targetNode,
        type: data.type || 'related',
        strength: data.strength || 75,
        label: data.label
      })

      // Cytoscape에 엣지 추가
      const cy = cyRef.current
      if (cy) {
        cy.add({
          group: 'edges',
          data: {
            id: edgeId,
            source: dialog.sourceNode,
            target: dialog.targetNode,
            type: data.type || 'related',
            strength: data.strength || 75,
            label: data.label
          }
        })
      }
    } else {
      // store 업데이트
      updateEdge(dialog.elementId, data)

      // Cytoscape 요소 업데이트
      const cy = cyRef.current
      if (cy) {
        const element = cy.getElementById(dialog.elementId)
        element.data({
          ...element.data(),
          ...data
        })
      }
    }

    setDialog(null)
  }

  // 노드 삭제 핸들러
  const handleNodeDelete = (nodeId: string) => {
    const cy = cyRef.current
    if (!cy) return

    const node = cy.getElementById(nodeId)
    const connectedEdgesCount = node.connectedEdges().length

    setDialog({
      type: 'node',
      mode: 'delete',
      elementId: nodeId,
      connectedEdgesCount
    })
  }

  // 삭제 확인 핸들러
  const handleDeleteConfirm = () => {
    if (!dialog) return
    const cy = cyRef.current
    if (!cy) return

    if (dialog.type === 'node') {
      const node = cy.getElementById(dialog.elementId)
      const connectedEdges = node.connectedEdges()
      
      // store에서 노드와 연결된 엣지들 삭제
      deleteNode(dialog.elementId)
      connectedEdges.forEach(edge => {
        deleteEdge(edge.id())
      })
      
      // Cytoscape에서 노드 삭제 (연결된 엣지들도 자동으로 삭제됨)
      node.remove()
    } else {
      // store에서 엣지 삭제
      deleteEdge(dialog.elementId)
      
      // Cytoscape에서 엣지 삭제
      cy.getElementById(dialog.elementId).remove()
    }

    setDialog(null)
  }

  // 노드 추가 핸들러
  const handleAddNode = (position: { x: number; y: number }) => {
    const nodeId = uuidv4()
    const newNode = {
      id: nodeId,
      label: 'New Node',
      type: 'concept' as NodeType,
      strength: 75,
      position
    }

    // store에 노드 추가
    addNode(newNode)

    // Cytoscape에 노드 추가
    const cy = cyRef.current
    if (cy) {
      cy.add({
        group: 'nodes',
        data: {
          id: nodeId,
          label: newNode.label,
          type: newNode.type,
          strength: newNode.strength,
        },
        position
      })
    }

    // 노드 편집 모달 열기
    setDialog({
      type: 'node',
      mode: 'edit',
      elementId: nodeId
    })
  }

  // 줌 인 핸들러
  const handleZoomIn = () => {
    const cy = cyRef.current
    if (!cy) return
    
    const currentZoom = cy.zoom()
    const newZoom = currentZoom * 1.2
    cy.animate({
      zoom: Math.min(newZoom, cy.maxZoom()),
      duration: 200
    })
  }

  // 줌 아웃 핸들러
  const handleZoomOut = () => {
    const cy = cyRef.current
    if (!cy) return
    
    const currentZoom = cy.zoom()
    const newZoom = currentZoom / 1.2
    cy.animate({
      zoom: Math.max(newZoom, cy.minZoom()),
      duration: 200
    })
  }

  // 뷰 리셋 핸들러
  const handleResetView = () => {
    const cy = cyRef.current
    if (!cy) return
    
    cy.animate({
      zoom: 1,
      pan: { x: 0, y: 0 },
      duration: 200
    })
  }

  // 레이아웃 리셋 핸들러
  const handleLayoutReset = () => {
    const cy = cyRef.current
    if (!cy) return
    
    const layout = cy.layout(LAYOUT_OPTIONS)
    layout.run()
  }

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current
      
      // 레이아웃 적용
      const layout = cy.layout(LAYOUT_OPTIONS)
      layout.run()

      // 노드 클릭 이벤트
      cy.on('tap', 'node', (evt) => {
        const node = evt.target
        const nodeId = node.id()
        selectNode(nodeId)
        setSelectedNodes([nodeId])
        highlightConnectedNodes(nodeId)
        animateEdges()
      })

      // 엣지 클릭 이벤트
      cy.on('tap', 'edge', (evt) => {
        const edge = evt.target
        const edgeId = edge.id()
        selectEdge(edgeId)
        setSelectedEdges([edgeId])
        cy.elements().addClass('faded')
        edge.removeClass('faded').addClass('selected animated')
        edge.source().removeClass('faded').addClass('highlighted')
        edge.target().removeClass('faded').addClass('highlighted')
        animateEdges()
      })

      // 배경 클릭 이벤트
      cy.on('tap', (evt) => {
        if (evt.target === cy) {
          selectNode(null)
          selectEdge(null)
          setSelectedNodes([])
          setSelectedEdges([])
          cy.elements().removeClass('faded selected highlighted animated')
          setContextMenu(null)
        }
      })

      // 노드 드래그 시작 이벤트
      cy.on('dragstart', 'node', (evt) => {
        const node = evt.target
        dragStartPosition.current = node.position()
        node.addClass('dragging')
      })

      // 노드 드래그 중 이벤트
      cy.on('drag', 'node', (evt) => {
        const node = evt.target
        handleNodeDragFree(node)
      })

      // 노드 드래그 종료 이벤트
      cy.on('dragfree', 'node', (evt) => {
        const node = evt.target
        node.removeClass('dragging')
        handleNodeDragFree(node)
      })

      // 컨텍스트 메뉴 이벤트
      cy.on('cxttap', 'node, edge', handleContextMenu)

      // 줌 변경 이벤트
      cy.on('zoom', () => {
        setZoom(cy.zoom())
      })

      // 위치 변경 이벤트
      cy.on('pan', () => {
        const position = cy.pan()
        setPosition(position)
      })

      // 노드 더블클릭 이벤트 (수정 또는 삭제)
      cy.on('dblclick', 'node', (evt) => {
        const node = evt.target
        const nodeId = node.id()
        const nodeData = TEST_DATA.nodes.find(n => n.data.id === nodeId)
        if (!nodeData) return

        // Shift 키를 누른 상태로 더블클릭하면 삭제 다이얼로그 표시
        if (evt.originalEvent.shiftKey) {
          handleNodeDelete(nodeId)
        } else {
          // 일반 더블클릭은 수정 다이얼로그 표시
          setDialog({
            type: 'node',
            mode: 'edit',
            elementId: nodeId
          })
        }
      })

      // 빈 공간 더블클릭 이벤트 (노드 추가)
      cy.on('dblclick', (evt) => {
        if (evt.target === cy) {
          const position = evt.position || { x: 0, y: 0 }
          handleAddNode(position)
        }
      })

      // 배경 클릭 시 컨텍스트 메뉴 닫기
      document.addEventListener('click', (evt) => {
        if (contextMenu) {
          setContextMenu(null)
        }
      })
    }

    return () => {
      document.removeEventListener('click', () => {
        if (contextMenu) {
          setContextMenu(null)
        }
      })
    }
  }, [selectNode, selectEdge, setZoom, setPosition, setSelectedNodes, setSelectedEdges, updateNodePosition, contextMenu])

  return (
    <div className="relative w-full h-full">
      <CytoscapeComponent
        elements={[...TEST_DATA.nodes, ...TEST_DATA.edges]}
        stylesheet={cytoscapeStylesheet}
        style={{ width: '100%', height: '100%' }}
        cy={(cy) => { cyRef.current = cy }}
        wheelSensitivity={0.1}
        minZoom={0.5}
        maxZoom={2.0}
        className="bg-slate-900"
      />
      <Toolbar
        onAddNode={handleAddNode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onLayoutReset={handleLayoutReset}
      />
      {contextMenu && (
        <SynapticContextMenu
          type={contextMenu.type}
          elementId={contextMenu.elementId}
          elementType={contextMenu.elementType}
          position={contextMenu.position}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddEdge={contextMenu.type === 'node' ? handleAddEdge : undefined}
        />
      )}
      {dialog?.type === 'node' && dialog.mode === 'edit' && (
        <NodeForm
          isOpen={true}
          onClose={() => setDialog(null)}
          onSubmit={handleNodeUpdate}
          onDelete={() => handleNodeDelete(dialog.elementId)}
          initialData={TEST_DATA.nodes.find(n => n.data.id === dialog.elementId)?.data as Partial<SynapticNode>}
        />
      )}
      {dialog?.type === 'edge' && (dialog.mode === 'edit' || dialog.mode === 'add-edge') && (
        <EdgeForm
          isOpen={true}
          onClose={() => setDialog(null)}
          onSubmit={handleEdgeUpdate}
          initialData={dialog.mode === 'edit' ? TEST_DATA.edges.find(e => e.data.id === dialog.elementId)?.data as Partial<SynapticEdge> : undefined}
          sourceNode={dialog.sourceNode}
          targetNode={dialog.targetNode}
        />
      )}
      {dialog?.mode === 'delete' && (
        <DeleteDialog
          isOpen={true}
          onClose={() => setDialog(null)}
          onConfirm={handleDeleteConfirm}
          type={dialog.type}
          title={dialog.type === 'node' 
            ? TEST_DATA.nodes.find(n => n.data.id === dialog.elementId)?.data.label
            : undefined}
          connectedEdgesCount={dialog.connectedEdgesCount}
        />
      )}
    </div>
  )
} 