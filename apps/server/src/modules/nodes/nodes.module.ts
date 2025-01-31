import { Module } from '@nestjs/common';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { MapsModule } from '../maps/maps.module';

@Module({
  imports: [SupabaseModule, MapsModule],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService],
})
export class NodesModule {} 