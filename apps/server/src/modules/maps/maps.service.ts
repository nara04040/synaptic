import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapResponseDto } from './dto/map-response.dto';

@Injectable()
export class MapsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(isPublic?: boolean, userId?: string): Promise<MapResponseDto[]> {
    let query = this.supabaseService.getClient()
      .from('synaptic_maps')
      .select('*');

    if (isPublic !== undefined) {
      query = query.eq('is_public', isPublic);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  async findOne(id: string): Promise<MapResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      throw new NotFoundException('Map not found');
    }
    return data;
  }

  async create(userId: string, createMapDto: CreateMapDto): Promise<MapResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .insert([{
        user_id: userId,
        title: createMapDto.title,
        description: createMapDto.description,
        is_public: createMapDto.isPublic
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async update(id: string, updateMapDto: UpdateMapDto): Promise<MapResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .update({
        title: updateMapDto.title,
        description: updateMapDto.description,
        is_public: updateMapDto.isPublic,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Map not found or update failed');
    }
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException('Map not found or delete failed');
    }
  }
}