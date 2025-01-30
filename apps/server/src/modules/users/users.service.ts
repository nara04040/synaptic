import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto, PublicUserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getCurrentUser(userId: string): Promise<UserResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
      .throwOnError();

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  async getPublicUser(userId: string): Promise<PublicUserResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('id, name, avatar_url')
      .eq('id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .update(updateUserDto)
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found or update failed');
    }

    return data;
  }

  async getUserMaps(userId: string, isPublicOnly: boolean = false) {
    const query = this.supabaseService.getClient()
      .from('synaptic_maps')
      .select('*')
      .eq('user_id', userId);

    if (isPublicOnly) {
      query.eq('is_public', true);
    }

    const { data, error } = await query;

    if (error) {
      throw new NotFoundException('Maps not found');
    }

    return data;
  }

  async deleteUser(userId: string): Promise<void> {
    const { error } = await this.supabaseService.getClient()
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      throw new NotFoundException('User not found or delete failed');
    }
  }
}