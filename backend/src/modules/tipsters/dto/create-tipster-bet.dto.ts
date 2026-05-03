import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { BetStatus } from '@prisma/client';

export class CreateTipsterBetDto {
  @IsString()
  tipster: string;

  @IsString()
  event: string;

  @IsNumber()
  stake: number;

  @IsNumber()
  odds: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(BetStatus)
  status?: BetStatus;
}
