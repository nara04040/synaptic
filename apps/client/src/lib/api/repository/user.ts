import { User } from '@/types/store';
import { ApiResponse, LoginRequest, RegisterRequest } from '@/types/api';
import { BaseRepository } from './base';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('/users');
  }

  async login(data: LoginRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.client.post<{ token: string; user: User }>('/auth/login', data);
  }

  async register(data: RegisterRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.client.post<{ token: string; user: User }>('/auth/register', data);
  }

  async me(): Promise<ApiResponse<User>> {
    return this.client.get<User>('/auth/me');
  }
}

export const userRepository = new UserRepository(); 