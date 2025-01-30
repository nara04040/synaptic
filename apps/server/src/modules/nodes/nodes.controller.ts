import { Controller, Get, Post, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { MapsService } from '../maps/maps.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodeResponseDto } from './dto/node-response.dto';
import { AuthGuard } from '../auth.guard';
import { AuthenticatedRequest } from 'src/types/request.interface';

@Controller('maps/:mapId/nodes')
export class NodesController {
  constructor(
    private readonly nodesService: NodesService,
    private readonly mapsService: MapsService,
  ) {}

  @Get()
  async findAll(@Param('mapId') mapId: string): Promise<NodeResponseDto[]> {
    const map = await this.mapsService.findOne(mapId);
    if (!map.is_public) {
      throw new ForbiddenException('This map is private');
    }
    return this.nodesService.findAll(mapId);
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
      throw new ForbiddenException('You can only add nodes to your own maps');
    }
    return this.nodesService.create(mapId, createNodeDto);
  }
} 