import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBetDto {
  @ApiProperty({ example: 'Real Madrid vs Barcelona', description: 'Evento deportivo u otro' })
  @IsString()
  @IsNotEmpty()
  event: string;

  @ApiPropertyOptional({ example: 'Fútbol', description: 'Deporte del evento' })
  @IsString()
  @IsOptional()
  sport?: string;

  @ApiProperty({ example: 100.0, description: 'Monto apostado' })
  @IsNumber()
  @IsNotEmpty()
  stake: number;

  @ApiProperty({ example: 1.85, description: 'Cuota de la apuesta (formato decimal)' })
  @IsNumber()
  @IsNotEmpty()
  odds: number;

  @ApiPropertyOptional({ example: 'uuid-billetera', description: 'ID de la billetera origen' })
  @IsString()
  @IsOptional()
  walletId?: string;
}
