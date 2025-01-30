import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMapDto } from './dto/create-map.dto';

@Injectable()
export class MapsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async create(createMapDto: CreateMapDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('synaptic_maps')
      .insert([{
        title: createMapDto.title,
        description: createMapDto.description,
        is_public: createMapDto.isPublic  
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}