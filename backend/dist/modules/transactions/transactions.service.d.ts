import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
    findAll(userId: string): Promise<({
        wallet: {
            id: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
            userId: string;
        };
        category: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.TransactionType;
            userId: string;
        } | null;
        targetWallet: {
            id: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
            userId: string;
        } | null;
    } & {
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        wallet: {
            id: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
            userId: string;
        };
        category: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.TransactionType;
            userId: string;
        } | null;
        targetWallet: {
            id: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
            userId: string;
        } | null;
    } & {
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
    update(userId: string, id: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
}
