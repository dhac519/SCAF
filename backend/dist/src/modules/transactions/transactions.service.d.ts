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
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        };
        category: {
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.TransactionType;
            userId: string;
        } | null;
        targetWallet: {
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
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
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        };
        category: {
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.TransactionType;
            userId: string;
        } | null;
        targetWallet: {
            name: string;
            id: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
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
