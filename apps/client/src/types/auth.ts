export interface JWTToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokens: JWTToken | null;
  autoLogin: boolean;
}

export interface Session {
  deviceId: string;
  lastActive: Date;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
} 