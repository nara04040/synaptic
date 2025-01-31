import { IsOptional, IsString, IsObject, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class Position {
  @IsOptional()
  x?: number;

  @IsOptional()
  y?: number;
}

export class UpdateNodeDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  @IsIn(['text', 'image', 'link', 'file'])
  type?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Position)
  position?: Position;

  @IsOptional()
  @IsString()
  content?: string;
} 