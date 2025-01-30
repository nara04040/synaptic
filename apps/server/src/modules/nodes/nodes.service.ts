import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodeResponseDto } from './dto/node-response.dto';

@Injectable()
export class NodesService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(mapId: string): Promise<NodeResponseDto[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('nodes')
      .select('*')
      .eq('map_id', mapId);

    if (error) throw error;
    return data;
  }

  async create(mapId: string, createNodeDto: CreateNodeDto): Promise<NodeResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('nodes')
      .insert([{
        map_id: mapId,
        label: createNodeDto.label,
        type: createNodeDto.type,
        position: createNodeDto.position,
        content: createNodeDto.content
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
} 