import { SynapticNode } from '@/types/synaptic/node'
import { SynapticEdge } from '@/types/synaptic/edge'
import { LayoutOptions } from 'cytoscape'

type CoseBilkentLayoutOptions = {
  name: 'cose-bilkent'
  numIter?: number
  idealEdgeLength?: number
  nodeRepulsion?: number
  nodeOverlap?: number
  edgeElasticity?: number
  gravity?: number
  gravityRange?: number
  nestingFactor?: number
  tile?: boolean
  animate?: boolean
  animationDuration?: number
  nodeDimensionsIncludeLabels?: boolean
  initialTemp?: number
  coolingFactor?: number
  componentSpacing?: number
  padding?: number
} & Record<string, any>

export const LAYOUT_OPTIONS: CoseBilkentLayoutOptions = {
  name: 'cose-bilkent',
  // 반복 횟수
  numIter: 2500,
  // 초기 온도 (높을수록 노드가 많이 움직임)
  initialTemp: 1000,
  // 쿨링 팩터 (낮을수록 천천히 식음)
  coolingFactor: 0.99,
  // 이상적인 엣지 길이
  idealEdgeLength: 50,
  // 노드 간 반발력
  nodeRepulsion: 4500,
  // 노드 간격
  nodeOverlap: 10,
  // 엣지 엘라스틱 강도
  edgeElasticity: 0.45,
  // 중력 강도
  gravity: 0.25,
  // 중력 범위
  gravityRange: 3.8,
  // 네스팅된 노드 간격
  nestingFactor: 0.1,
  // 타일 디스커넥티드 모드 (연결되지 않은 노드들을 격자 형태로 배치)
  tile: true,
  // 애니메이션 설정
  animate: true,
  animationDuration: 500,
  // 레이아웃 패딩
  padding: 30,
  // 컴포넌트 간격
  componentSpacing: 40,
  // 노드 크기에 따른 반발력 조정
  nodeDimensionsIncludeLabels: true
}

export const getNodePosition = (node: SynapticNode) => {
  return node.position || { x: 0, y: 0 }
}

export const calculateEdgeLength = (
  source: SynapticNode,
  target: SynapticNode
) => {
  const sourcePos = getNodePosition(source)
  const targetPos = getNodePosition(target)
  const dx = targetPos.x - sourcePos.x
  const dy = targetPos.y - sourcePos.y
  return Math.sqrt(dx * dx + dy * dy)
} 