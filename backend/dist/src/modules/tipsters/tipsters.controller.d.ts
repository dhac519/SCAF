import { TipstersService } from './tipsters.service';
import { CreateTipsterBetDto } from './dto/create-tipster-bet.dto';
import { BetStatus } from '@prisma/client';
export declare class TipstersController {
    private readonly tipstersService;
    constructor(tipstersService: TipstersService);
    create(req: any, createTipsterBetDto: CreateTipsterBetDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        date: Date;
        event: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        tipster: string;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    seedFakeData(req: any): Promise<{
        message: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        date: Date;
        event: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        tipster: string;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
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
        updatedAt: Date;
        userId: string;
        initialBank: import("@prisma/client/runtime/library").Decimal;
        currentBank: import("@prisma/client/runtime/library").Decimal;
        unitValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateBank(req: any, updateBankDto: {
        initialBank?: number;
        unitValue?: number;
    }): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        initialBank: import("@prisma/client/runtime/library").Decimal;
        currentBank: import("@prisma/client/runtime/library").Decimal;
        unitValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(req: any, id: string, updateData: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        date: Date;
        event: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        tipster: string;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateStatus(req: any, id: string, status: BetStatus): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        date: Date;
        event: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        tipster: string;
        unitsProfit: import("@prisma/client/runtime/library").Decimal | null;
        amountWagered: import("@prisma/client/runtime/library").Decimal;
        realProfit: import("@prisma/client/runtime/library").Decimal | null;
        cumulativeBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
