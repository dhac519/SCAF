import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDecimal,
  IsUUID,
} from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
  @IsNotEmpty()
  assetName: string;

  @IsString()
  @IsOptional()
  symbol?: string;

  @IsString()
  @IsOptional()
  coingeckoId?: string;

  @IsEnum(['CRIPTO', 'NEGOCIO', 'ACCION', 'FOREX'])
  type: string;

  @IsNumber()
  initialAmount: number;

  @IsNumber()
  @IsOptional()
  currentValue?: number;

  @IsUUID()
  @IsOptional()
  platformId?: string;
}
