import { SummaryService } from './summary.service';
export declare class SummaryController {
    private readonly summaryService;
    constructor(summaryService: SummaryService);
    getGlobalSummary(req: any): Promise<{
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
        };
        latestTransactions: ({
            wallet: {
                id: string;
                name: string;
                balance: import("@prisma/client/runtime/library").Decimal;
                currency: string;
                type: import(".prisma/client").$Enums.WalletType;
                userId: string;
            };
        } & {
            id: string;
            type: import(".prisma/client").$Enums.TransactionType;
            walletId: string;
            categoryId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            description: string;
            date: Date;
            targetWalletId: string | null;
        })[];
    }>;
}
