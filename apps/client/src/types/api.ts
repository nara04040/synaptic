// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// API Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

// Roadmap Types
export interface CreateRoadmapRequest {
  title: string;
  description: string;
  nodes: Record<string, RoadmapNodeRequest>;
}

export interface RoadmapNodeRequest {
  title: string;
  description: string;
  children: string[];
}

export interface UpdateRoadmapRequest extends Partial<CreateRoadmapRequest> {
  id: string;
}

// Learning Types
export interface UpdateProgressRequest {
  nodeId: string;
  progress: number;
} 