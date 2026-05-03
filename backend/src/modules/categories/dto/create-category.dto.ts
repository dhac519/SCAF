import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Sueldo', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.INCOME,
    description: 'Tipo de transacción para esta categoría',
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
