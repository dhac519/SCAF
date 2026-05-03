import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.5, description: 'Monto de la transacción' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'Compra de víveres',
    description: 'Descripción de la transacción',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Tipo de transacción',
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    example: 'uuid-billetera-1',
    description: 'ID de la billetera origen',
  })
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @ApiPropertyOptional({
    example: 'uuid-billetera-dest',
    description: 'ID de la billetera destino (requerido si es TRANSFER)',
  })
  @ValidateIf((o) => o.type === TransactionType.TRANSFER)
  @IsString()
  @IsNotEmpty()
  targetWalletId?: string;

  @ApiPropertyOptional({
    example: 'uuid-categoria-1',
    description: 'ID de la categoría (opcional)',
  })
  @IsString()
  @IsOptional()
  categoryId?: string;
}
