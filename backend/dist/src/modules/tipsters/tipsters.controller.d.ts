import { TipstersService } from './tipsters.service';
import { CreateTipsterBetDto } from './dto/create-tipster-bet.dto';
import { BetStatus } from '@prisma/client';
export declare class TipstersController {
    private readonly tipstersService;
    constructor(tipstersService: TipstersService);
    create(req: any, createTipsterBetDto: CreateTipsterBetDto): Promise<{
        id: string;
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
        userId: string;
    }>;
    seedFakeData(req: any): Promise<{
        message: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
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
        userId: string;
    }[]>;
    getDashboard(req: any): Promise<{
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
    getRanking(req: any): Promise<any[]>;
    getBank(req: any): Promise<{
        id: string;
        userId: string;
        initialBank: import("@prisma/client/runtime/library").Decimal;
        currentBank: import("@prisma/client/runtime/library").Decimal;
        unitValue: import("@prisma/client/runtime/library").Decimal;
        updatedAt: Date;
    }>;
    updateBank(req: any, updateBankDto: {
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
    update(req: any, id: string, updateData: any): Promise<{
        id: string;
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
        userId: string;
    }>;
    updateStatus(req: any, id: string, status: BetStatus): Promise<{
        id: string;
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
        userId: string;
    }>;
    delete(req: any, id: string): Promise<{
        id: string;
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
        userId: string;
    }>;
}
