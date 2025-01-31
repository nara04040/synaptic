import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put, Delete, ForbiddenException } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodeResponseDto } from './dto/node-response.dto';
import { AuthGuard } from '../auth.guard';
import { AuthenticatedRequest } from 'src/types/request.interface';
import { MapsService } from '../maps/maps.service';

@Controller('maps/:mapId/nodes')
export class NodesController {
  constructor(
    private readonly nodesService: NodesService,
    private readonly mapsService: MapsService,
  ) {}

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Param('mapId') mapId: string,
    @Query('type') type?: string,
  ): Promise<NodeResponseDto[]> {
    const authToken = req.headers.authorization?.split(' ')[1];
    return this.nodesService.findAll(mapId, type, authToken);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Param('mapId') mapId: string,
    @Body() createNodeDto: CreateNodeDto,
  ): Promise<NodeResponseDto> {
    const map = await this.mapsService.findOne(mapId);
    if (map.user_id !== req.user.id) {
      throw new ForbiddenException('You can only create nodes in your own maps');
    }
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      throw new ForbiddenException('Authorization token is required');
    }
    return this.nodesService.create(mapId, createNodeDto, authToken);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('mapId') mapId: string,
    @Param('id') id: string,
    @Body() updateNodeDto: UpdateNodeDto,
  ): Promise<NodeResponseDto> {
    const map = await this.mapsService.findOne(mapId);
    if (map.user_id !== req.user.id) {
      throw new ForbiddenException('You can only update nodes in your own maps');
    }
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      throw new ForbiddenException('Authorization token is required');
    }
    return this.nodesService.update(id, updateNodeDto, authToken);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('mapId') mapId: string,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const map = await this.mapsService.findOne(mapId);
    if (map.user_id !== req.user.id) {
      throw new ForbiddenException('You can only delete nodes in your own maps');
    }
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      throw new ForbiddenException('Authorization token is required');
    }
    await this.nodesService.remove(id, authToken);
    return { message: 'Node deleted successfully' };
  }
} 