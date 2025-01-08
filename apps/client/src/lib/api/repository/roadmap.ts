import { Roadmap } from '@/types/store';
import { ApiResponse, CreateRoadmapRequest, UpdateRoadmapRequest } from '@/types/api';
import { BaseRepository } from './base';

export class RoadmapRepository extends BaseRepository<Roadmap, CreateRoadmapRequest, UpdateRoadmapRequest> {
  constructor() {
    super('/roadmaps');
  }

  async getByUser(userId: string): Promise<ApiResponse<Roadmap[]>> {
    return this.client.get<Roadmap[]>(`${this.endpoint}/user/${userId}`);
  }
}

export const roadmapRepository = new RoadmapRepository(); 