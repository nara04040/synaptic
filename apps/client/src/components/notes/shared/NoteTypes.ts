export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'concept' | 'implementation' | 'question';
  tags: string[];
  metadata: {
    created: Date;
    updated: Date;
    references: string[];
  };
}

export interface TagCount {
  name: string;
  count: number;
}

export interface TagFilter {
  type: string;
  tag: string;
} 