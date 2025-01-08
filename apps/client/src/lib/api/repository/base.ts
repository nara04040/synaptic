import { ApiClient, apiClient } from '../client';
import { ApiResponse, PaginationParams } from '@/types/api';

export abstract class BaseRepository<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  protected client: ApiClient;
  protected endpoint: string;

  constructor(endpoint: string, client: ApiClient = apiClient) {
    this.client = client;
    this.endpoint = endpoint;
  }

  async findAll(params?: PaginationParams): Promise<ApiResponse<T[]>> {
    return this.client.get<T[]>(this.endpoint, { params });
  }

  async findById(id: string): Promise<ApiResponse<T>> {
    return this.client.get<T>(`${this.endpoint}/${id}`);
  }

  async create(data: CreateDTO): Promise<ApiResponse<T>> {
    return this.client.post<T>(this.endpoint, data);
  }

  async update(id: string, data: UpdateDTO): Promise<ApiResponse<T>> {
    return this.client.put<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
} 