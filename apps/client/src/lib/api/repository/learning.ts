import { LearningProgress } from '@/types/store';
import { ApiResponse, UpdateProgressRequest } from '@/types/api';
import { BaseRepository } from './base';

export class LearningRepository extends BaseRepository<LearningProgress, UpdateProgressRequest, UpdateProgressRequest> {
  constructor() {
    super('/learning');
  }

  async getByNode(nodeId: string): Promise<ApiResponse<LearningProgress>> {
    return this.client.get<LearningProgress>(`${this.endpoint}/node/${nodeId}`);
  }

  async getByUser(userId: string): Promise<ApiResponse<LearningProgress[]>> {
    return this.client.get<LearningProgress[]>(`${this.endpoint}/user/${userId}`);
  }
}

export const learningRepository = new LearningRepository(); 