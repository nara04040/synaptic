import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MapsService } from './maps.service';
import { CreateMapDto } from './dto/create-map.dto';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  findAll() {
    return this.mapsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapsService.findOne(id);
  }

  @Post()
  create(@Body() createMapDto: CreateMapDto) {
    return this.mapsService.create(createMapDto);
  }
}