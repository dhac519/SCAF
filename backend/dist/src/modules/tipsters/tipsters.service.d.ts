import { PrismaService } from '../../prisma/prisma.service';
import { CreateTipsterBetDto } from './dto/create-tipster-bet.dto';
import { BetStatus } from '@prisma/client';
export declare class TipstersService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateBank(userId: string): Promise<{
        id: string;
        userId: string;
        initialBank: import("@prisma/client/runtime/library").Decimal;
        currentBank: import("@prisma/client/runtime/library").Decimal;
        unitValue: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
    }>;
    updateBank(userId: string, data: {
        currentBank?: number;
        unitValue?: number;
    }): Promise<{
        id: string;
        userId: string;
        initialBank: import("@prisma/client/runtime/library").Decimal;
        currentBank: import("@prisma/client/runtime/library").Decimal;
        unitValue: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
    }>;
    createBet(userId: string, createTipsterBetDto: CreateTipsterBetDto): Promise<{
        id: string;
        userId: string;
        date: Date;
        tipster: string;
        event: string;
        status: import(".prisma/client").$Enums.BetStatus;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateBetStatus(userId: string, id: string, status: BetStatus): Promise<{
        id: string;
        userId: string;
        date: Date;
        tipster: string;
        event: string;
        status: import(".prisma/client").$Enums.BetStatus;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateBet(userId: string, id: string, updateData: any): Promise<{
        id: string;
        userId: string;
        date: Date;
        tipster: string;
        event: string;
        status: import(".prisma/client").$Enums.BetStatus;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        userId: string;
        date: Date;
        tipster: string;
        event: string;
        status: import(".prisma/client").$Enums.BetStatus;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    deleteBet(userId: string, id: string): Promise<{
        success: boolean;
    }>;
    getDashboard(userId: string): Promise<{
        bank: {
            initial: number;
            current: number;
            unitValue: number;
        };
        stats: {
            totalBets: number;
            resolvedBets: number;
            totalWagered: number;
            totalRealProfit: number;
            totalUnits: number;
            yieldPercent: number;
            winRate: number;
            winLossMatches: {
                won: number;
                lost: number;
                voided: number;
            };
        };
        evolution: any[];
    }>;
    getRanking(userId: string): Promise<any[]>;
    private recalculateBalances;
}
