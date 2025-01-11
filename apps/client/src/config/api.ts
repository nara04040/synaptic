const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/auth`,
  USERS: `${API_BASE_URL}/users`,
  ROADMAPS: `${API_BASE_URL}/roadmaps`,
  LEARNING: `${API_BASE_URL}/learning`,
  REVIEW: `${API_BASE_URL}/review`,
} as const 