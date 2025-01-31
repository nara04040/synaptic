export class NodeResponseDto {
  id: string;
  map_id: string;
  label: string;
  type: string;
  position: { x: number; y: number };
  content: string;
  created_at: Date;
  updated_at: Date;
} 