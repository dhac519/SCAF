import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  subcategoryId?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsString()
  quality?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  estimatedValue?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  quantity?: number;
}
