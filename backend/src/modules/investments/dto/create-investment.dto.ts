import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvestmentDto {
  @ApiProperty({ example: 'Bitcoin', description: 'Nombre del activo' })
  @IsString()
  @IsNotEmpty()
  assetName: string;

  @ApiProperty({ example: 'CRIPTO', description: 'Tipo de inversión' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 1000.0, description: 'Monto inicial invertido' })
  @IsNumber()
  @IsNotEmpty()
  initialAmount: number;

  @ApiPropertyOptional({ example: 1200.0, description: 'Valor actual de la inversión (opcional, copia initialAmount al inicio)' })
  @IsNumber()
  @IsOptional()
  currentValue?: number;
}
