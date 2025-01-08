import { User } from '@/store/slices/authStore'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials extends LoginCredentials {
  name: string
}

interface AuthResponse {
  user: User
  token: string
}

// Mock data for development (remove when backend is ready)
const MOCK_USER: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
}

const MOCK_TOKEN = 'mock_jwt_token'

export class AuthRepository {
  private baseUrl: string

  constructor(baseUrl: string = '/api/auth') {
    this.baseUrl = baseUrl
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: MOCK_USER,
          token: MOCK_TOKEN,
        })
      }, 1000)
    })
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { ...MOCK_USER, email: credentials.email, name: credentials.name },
          token: MOCK_TOKEN,
        })
      }, 1000)
    })
  }

  async verifyToken(token: string): Promise<User> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USER)
      }, 500)
    })
  }
} 