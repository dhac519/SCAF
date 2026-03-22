import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
    findAll(req: any): Promise<({
        wallet: {
            name: string;
            id: string;
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
    findOne(req: any, id: string): Promise<{
        wallet: {
            name: string;
            id: string;
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
    update(req: any, id: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: string;
        description: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        walletId: string;
        targetWalletId: string | null;
        categoryId: string | null;
        date: Date;
    }>;
    remove(req: any, id: string): Promise<{
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
