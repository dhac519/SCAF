import { PrismaService } from '../../prisma/prisma.service';
export declare class SummaryService {
    private prisma;
    constructor(prisma: PrismaService);
    getGlobalSummary(userId: string): Promise<{
        distribution: {
            label: string;
            value: number;
            color: string;
        }[];
        monthlyPulse: {
            month: string;
            income: number;
            expense: number;
            balance: number;
        }[];
        stats: {
            totalNetWorth: number;
            activeInvestments: number;
            pendingBets: number;
            collectionsCount: number;
            totalBettingProfit: number;
            tipsterCurrentBank: number;
        };
        latestTransactions: ({
            wallet: {
                name: string;
                id: string;
                type: import(".prisma/client").$Enums.WalletType;
                balance: import("@prisma/client/runtime/library").Decimal;
                currency: string;
                userId: string;
            };
        } & {
            id: string;
            description: string;
            type: import(".prisma/client").$Enums.TransactionType;
            amount: import("@prisma/client/runtime/library").Decimal;
            walletId: string;
            targetWalletId: string | null;
            categoryId: string | null;
            date: Date;
        })[];
    }>;
}
