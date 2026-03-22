import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BetStatus } from '@prisma/client';

export class ResolveBetDto {
  @ApiProperty({ enum: BetStatus, example: BetStatus.WON, description: 'Estado resultante de la apuesta' })
  @IsEnum(BetStatus)
  @IsNotEmpty()
  status: BetStatus;
}
