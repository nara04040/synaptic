import { IsNotEmpty, IsString, IsObject, ValidateNested, MaxLength } from 'class-validator';
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
  @MaxLength(100)
  label: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Position)
  position: Position;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  content: string;
} 