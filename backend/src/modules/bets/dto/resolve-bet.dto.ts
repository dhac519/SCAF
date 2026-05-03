import { IsEnum, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BetStatus } from '@prisma/client';

export class ResolveBetDto {
  @ApiProperty({
    enum: BetStatus,
    example: BetStatus.WON,
    description: 'Estado resultante de la apuesta',
  })
  @IsEnum(BetStatus)
  @IsNotEmpty()
  status: BetStatus;

  @ApiProperty({
    required: false,
    example: 15.5,
    description: 'Monto total retirado (usado en estado CASHOUT)',
  })
  @IsOptional()
  @IsNumber()
  cashoutAmount?: number;
}
