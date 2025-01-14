import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow'

export type RoadmapNodeData = {
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  group?: string; // 그룹 ID
}

export type RoadmapGroupData = {
  title: string;
  description: string;
  nodes: string[]; // 그룹에 속한 노드 ID 배열
}

export type RoadmapNode = ReactFlowNode<RoadmapNodeData | RoadmapGroupData>
export type RoadmapEdge = ReactFlowEdge

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'devops' | 'cs';
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
} 