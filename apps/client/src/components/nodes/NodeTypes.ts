export type NodeType = 'note' | 'concept' | 'implementation' | 'question';

export interface Node {
  id: string;
  type: NodeType;
  data: {
    title: string;
    content: string;
    tags: string[];
    noteId?: string;
    references: string[];
  };
  position: { x: number; y: number };
  style?: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type: 'reference' | 'tag' | 'related';
  data?: {
    strength: number;
    description?: string;
  };
}

export interface NodeMap {
  nodes: Node[];
  edges: Edge[];
} 