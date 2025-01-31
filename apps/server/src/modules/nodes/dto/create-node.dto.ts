import { IsNotEmpty, IsString, IsObject, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class Position {
  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;
}

export class CreateNodeDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['text', 'image', 'link', 'file'])
  type: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Position)
  position: Position;

  @IsNotEmpty()
  @IsString()
  content: string;
} 