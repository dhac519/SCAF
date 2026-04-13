import { TransactionType } from '@prisma/client';
export declare class CreateTransactionDto {
    amount: number;
    description: string;
    type: TransactionType;
    walletId: string;
    targetWalletId?: string;
    categoryId?: string;
}
