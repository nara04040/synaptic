import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodeResponseDto } from './dto/node-response.dto';

@Injectable()
export class NodesService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(mapId: string, type?: string, authToken?: string): Promise<NodeResponseDto[]> {
    let query = this.supabaseService.getClient(authToken)
      .from('nodes')
      .select('*')
      .eq('map_id', mapId);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  async findOne(id: string, authToken?: string): Promise<NodeResponseDto> {
    const { data, error } = await this.supabaseService.getClient(authToken)
      .from('nodes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      throw new NotFoundException('Node not found');
    }
    return data;
  }

  async create(mapId: string, createNodeDto: CreateNodeDto, authToken: string): Promise<NodeResponseDto> {
    console.log('Creating node for map:', mapId);
    console.log('Node data:', createNodeDto);
    
    const { data, error } = await this.supabaseService.getClient(authToken)
      .from('nodes')
      .insert([{
        map_id: mapId,
        ...createNodeDto
      }])
      .select()
      .single();
    
    console.log('Supabase response:', { data, error });
    
    if (error) {
      console.error('Error creating node:', error);
      throw error;
    }
    return data;
  }

  async update(id: string, updateNodeDto: UpdateNodeDto, authToken: string): Promise<NodeResponseDto> {
    const { data, error } = await this.supabaseService.getClient(authToken)
      .from('nodes')
      .update({
        ...updateNodeDto,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Node not found or update failed');
    }
    return data;
  }

  async remove(id: string, authToken: string): Promise<void> {
    const { error } = await this.supabaseService.getClient(authToken)
      .from('nodes')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException('Node not found or delete failed');
    }
  }
} 