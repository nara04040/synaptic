import { Profile, ProfileSettings } from './profile'

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Profile-related response types
export interface ProfileResponse extends ApiResponse<Profile> {
  data: Profile;
}

export interface ProfileListResponse extends ApiResponse<Profile[]> {
  data: Profile[];
  total: number;
  page: number;
  limit: number;
}

export interface ProfileSettingsResponse extends ApiResponse<ProfileSettings> {
  data: ProfileSettings;
}

// Avatar upload response type
export interface AvatarUploadResponse extends ApiResponse<{imageUrl: string}> {
  data: {
    imageUrl: string;
    thumbnailUrl?: string;
  };
}

// Profile API error codes
export enum ProfileApiErrorCode {
  PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND',
  INVALID_PROFILE_DATA = 'INVALID_PROFILE_DATA',
  AVATAR_UPLOAD_FAILED = 'AVATAR_UPLOAD_FAILED',
  SETTINGS_UPDATE_FAILED = 'SETTINGS_UPDATE_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  INVALID_IMAGE_DIMENSIONS = 'INVALID_IMAGE_DIMENSIONS',
  INVALID_IMAGE_FILE = 'INVALID_IMAGE_FILE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// File upload limits type
export interface FileUploadLimits {
  maxSize: number; // bytes
  allowedTypes: string[]; // e.g., ['image/jpeg', 'image/png']
  maxWidth?: number; // pixels
  maxHeight?: number; // pixels
}

// API Error type
export interface ApiError {
  code: ProfileApiErrorCode;
  message: string;
  details?: {
    field?: string;
    reason?: string;
    [key: string]: unknown;
  };
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