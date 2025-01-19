'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CytoscapeComponent from 'react-cytoscapejs'
import { useEffect, useRef } from 'react'
import cytoscape, { Core, NodeSingular, EdgeSingular, LayoutOptions, Stylesheet } from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'

// COSE-Bilkent 레이아웃 등록
cytoscape.use(coseBilkent)

// 시냅스 스타일 정의
const cytoscapeStylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': 'rgb(148 163 184 / 0.1)',
      'border-color': 'rgb(148 163 184 / 0.2)',
      'border-width': '2px',
      'width': '160px',
      'height': '60px',
      'font-size': '13px',
      'color': 'rgb(148 163 184)',
      'text-wrap': 'wrap',
      'text-max-width': '100px',
      'text-valign': 'center',
      'text-halign': 'center',
      'label': 'data(label)',
      'shape': 'round-rectangle',
      'transition-property': 'background-color border-color',
      'transition-duration': 0.3,
      'opacity': 1,
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': 'rgb(148 163 184 / 0.3)',
      'target-arrow-color': 'rgb(148 163 184 / 0.3)',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 0.8,
      'line-style': 'dashed',
      'line-dash-pattern': [12, 5],
      'line-dash-offset': 0,
      'opacity': 1,
      'z-index': 10,
      'transition-property': 'line-color target-arrow-color opacity width',
      'transition-duration': 0.3
    }
  },
  {
    selector: '.upstream',
    style: {
      'line-color': 'rgb(234 179 8)',
      'target-arrow-color': 'rgb(234 179 8)',
      'width': 3,
      'line-style': 'dashed',
      'line-dash-pattern': [12, 5],
      'opacity': 1,
      'z-index': 20
    }
  },
  {
    selector: '.downstream',
    style: {
      'line-color': 'rgb(59 130 246)',
      'target-arrow-color': 'rgb(59 130 246)',
      'width': 3,
      'line-style': 'dashed',
      'line-dash-pattern': [12, 5],
      'opacity': 1,
      'z-index': 20
    }
  },
  {
    selector: '.faded',
    style: {
      'opacity': 0.2,
    }
  },
  {
    selector: '.highlighted',
    style: {
      'background-color': 'rgb(148 163 184 / 0.3)',
      'border-color': 'rgb(148 163 184 / 0.5)',
      'border-width': '3px',
      'opacity': 1,
      'z-index': 999,
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': 'rgb(148 163 184 / 0.4)',
      'border-color': 'rgb(148 163 184 / 0.6)',
      'border-width': '4px',
    }
  },
  {
    selector: 'edge:selected',
    style: {
      'line-color': 'rgb(148 163 184 / 0.8)',
      'target-arrow-color': 'rgb(148 163 184 / 0.8)',
      'width': 4,
    }
  }
]

// 시냅스 데이터 정의 (나중에 API로 대체)
const elements = [
  // Nodes
  { 
    data: { 
      id: '1', 
      label: 'JavaScript 기초',
      type: 'concept',
      strength: 85,
      lastReview: '2024-03-15'
    } 
  },
  { 
    data: { 
      id: '2', 
      label: '변수와 스코프',
      type: 'concept',
      strength: 75,
      lastReview: '2024-03-14'
    } 
  },
  { 
    data: { 
      id: '3', 
      label: '클로저',
      type: 'concept',
      strength: 60,
      lastReview: '2024-03-13'
    } 
  },
  { 
    data: { 
      id: '4', 
      label: '실행 컨텍스트',
      type: 'concept',
      strength: 65,
      lastReview: '2024-03-12'
    } 
  },
  { 
    data: { 
      id: '5', 
      label: '호이스팅',
      type: 'concept',
      strength: 70,
      lastReview: '2024-03-11'
    } 
  },
  // Edges
  { 
    data: { 
      id: 'e1-2', 
      source: '1', 
      target: '2',
      strength: 85,
      type: 'prerequisite'
    } 
  },
  { 
    data: { 
      id: 'e1-4', 
      source: '1', 
      target: '4',
      strength: 75,
      type: 'related'
    } 
  },
  { 
    data: { 
      id: 'e2-3', 
      source: '2', 
      target: '3',
      strength: 70,
      type: 'leads_to'
    } 
  },
  { 
    data: { 
      id: 'e2-5', 
      source: '2', 
      target: '5',
      strength: 80,
      type: 'related'
    } 
  },
  { 
    data: { 
      id: 'e4-5', 
      source: '4', 
      target: '5',
      strength: 90,
      type: 'explains'
    } 
  },
  { 
    data: { 
      id: 'e5-3', 
      source: '5', 
      target: '3',
      strength: 85,
      type: 'related'
    } 
  }
]

// COSE 레이아웃 설정
const layoutOptions = {
  name: 'cose-bilkent' as const,
  // 노드 간격과 레이아웃 품질
  idealEdgeLength: 200,
  nodeRepulsion: 8000,
  nodeOverlap: 40,
  // 레이아웃 동작
  refresh: 30,
  fit: true,
  padding: 50,
  randomize: true,
  // 컴포넌트 설정
  componentSpacing: 150,
  nestingFactor: 1.2,
  gravity: 1.0,
  // 계산 반복 설정
  numIter: 2500,
  initialTemp: 400,
  coolingFactor: 0.99,
  minTemp: 1.0,
  // 타일 옵션
  tile: true,
  tilingPaddingVertical: 10,
  tilingPaddingHorizontal: 10,
  // 정렬 옵션
  gravityRangeCompound: 1.5,
  gravityCompound: 1.0,
  gravityRange: 3.8,
  // 초기 배치 개선
  initialEnergyOnIncremental: 0.3,
}

function SynapticMap() {
  const cyRef = useRef<Core | null>(null)

  // 연결된 노드 하이라이트 함수
  const highlightConnectedNodes = (node: NodeSingular) => {
    const cy = cyRef.current
    if (!cy) return

    // 모든 요소를 흐리게 처리
    cy.elements().addClass('faded')

    // 선택된 노드 하이라이트
    node.removeClass('faded')
    node.addClass('highlighted')

    // 상위 개념 하이라이트 (노란색)
    // 선택된 노드로 들어오는 엣지와 그 소스 노드들
    const incomers = node.incomers()
    incomers.edges().forEach(edge => {
      if (edge.source().id() !== node.id()) {
        edge.removeClass('faded').addClass('upstream')
        edge.source().removeClass('faded').addClass('highlighted')
      }
    })

    // 하위 개념 하이라이트 (파란색)
    // 선택된 노드에서 나가는 엣지와 그 타겟 노드들
    const outgoers = node.outgoers()
    outgoers.edges().forEach(edge => {
      if (edge.target().id() !== node.id()) {
        edge.removeClass('faded').addClass('downstream')
        edge.target().removeClass('faded').addClass('highlighted')
      }
    })
  }

  // 하이라이트 초기화 함수
  const resetHighlight = () => {
    const cy = cyRef.current
    if (!cy) return

    cy.elements().removeClass('faded highlighted upstream downstream')
  }

  // 엣지 애니메이션 함수 추가
  const animateEdges = () => {
    const cy = cyRef.current
    if (!cy) return

    cy.edges().style({ 'line-dash-offset': 0 })
    cy.edges().animate({
      style: { 'line-dash-offset': -24 },
      duration: 1000,
      complete: () => animateEdges()
    })
  }

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current
      
      // COSE 레이아웃 적용
      const layout = cy.layout(layoutOptions)
      layout.run()

      // 엣지 애니메이션 시작
      animateEdges()

      // 노드 클릭 이벤트
      cy.on('tap', 'node', (evt) => {
        const node = evt.target as NodeSingular
        console.log('Node clicked:', node.data())
        highlightConnectedNodes(node)
      })

      // 배경 클릭 이벤트
      cy.on('tap', (evt) => {
        if (evt.target === cy) {
          resetHighlight()
        }
      })

      // 엣지 클릭 이벤트
      cy.on('tap', 'edge', (evt) => {
        const edge = evt.target as EdgeSingular
        console.log('Edge clicked:', edge.data())
        resetHighlight()
      })
    }
  }, [])

  return (
    <CytoscapeComponent
      elements={elements}
      stylesheet={cytoscapeStylesheet}
      style={{ width: '100%', height: '100%' }}
      cy={(cy: Core) => { cyRef.current = cy }}
      wheelSensitivity={0.1}
      minZoom={0.5}
      maxZoom={2.0}
      className="bg-slate-900"
    />
  )
}

export default function SynapticMapPage() {
  return (
    <div className="mx-auto py-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-300">Synaptic Map</CardTitle>
          <CardDescription className="text-slate-400">
            지식을 시냅스처럼 연결하여 더 깊은 이해를 만드는 상호작용형 학습 맵입니다.
            노드를 드래그하여 재배치하고, 노드 간 새로운 연결을 만들어보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[900px] border border-slate-800 rounded-lg overflow-hidden">
            <SynapticMap />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 