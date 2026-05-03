import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { NetOpsPlatform, NetOpsCategory } from '@prisma/client';

export class CreateNetOpsCommandDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  command: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(NetOpsPlatform)
  @IsNotEmpty()
  platform: NetOpsPlatform;

  @IsEnum(NetOpsCategory)
  @IsNotEmpty()
  category: NetOpsCategory;

  @IsBoolean()
  @IsOptional()
  isGenerator?: boolean;

  @IsOptional()
  variables?: any;
}
