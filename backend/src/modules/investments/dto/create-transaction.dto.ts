import { IsString, IsNotEmpty, IsNumber, IsEnum, IsUUID } from 'class-validator';

export class CreateInvestmentTransactionDto {
  @IsEnum(['BUY', 'SELL'])
  type: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  priceAtDate: number;

  @IsUUID()
  @IsNotEmpty()
  investmentId: string;
}
