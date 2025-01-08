import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError, ApiResponse } from '@/types/api';

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(this.handleError(error))
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(this.handleError(error))
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response?.data) {
      return error.response.data as ApiError;
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
    };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.put(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient(); 