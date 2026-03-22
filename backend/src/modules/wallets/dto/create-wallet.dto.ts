import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ example: 'Ahorros BCP', description: 'Nombre de la cuenta o billetera' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 1500.50, description: 'Saldo inicial de la billetera' })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiPropertyOptional({ example: 'PEN', description: 'Moneda de la billetera' })
  @IsString()
  @IsOptional()
  currency?: string;
}
