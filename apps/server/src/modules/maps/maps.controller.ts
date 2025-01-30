import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put, Delete, ForbiddenException } from '@nestjs/common';
import { MapsService } from './maps.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapResponseDto } from './dto/map-response.dto';
import { AuthGuard } from '../auth.guard';
import { AuthenticatedRequest } from 'src/types/request.interface';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  async findAll(
    @Query('isPublic') isPublic?: boolean,
    @Query('userId') userId?: string,
  ): Promise<MapResponseDto[]> {
    return this.mapsService.findAll(isPublic, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createMapDto: CreateMapDto,
  ): Promise<MapResponseDto> {
    return this.mapsService.create(req.user.id, createMapDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateMapDto: UpdateMapDto,
  ): Promise<MapResponseDto> {
    const map = await this.mapsService.findOne(id);
    if (map.user_id !== req.user.id) {
      throw new ForbiddenException('You can only update your own maps');
    }
    return this.mapsService.update(id, updateMapDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const map = await this.mapsService.findOne(id);
    if (map.user_id !== req.user.id) {
      throw new ForbiddenException('You can only delete your own maps');
    }
    await this.mapsService.remove(id);
    return { message: 'Map deleted successfully' };
  }
}