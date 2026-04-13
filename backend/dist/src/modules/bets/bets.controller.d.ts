import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
export declare class BetsController {
    private readonly betsService;
    constructor(betsService: BetsService);
    create(req: any, createBetDto: CreateBetDto): Promise<{
        id: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
        result: import("@prisma/client/runtime/library").Decimal | null;
        createdAt: Date;
        userId: string;
        walletId: string | null;
    }>;
    getStats(req: any): Promise<{
        summary: {
            totalBets: number;
            totalStake: number;
            totalProfit: number;
            winRate: number;
            roi: number;
        };
        history: any[];
        distribution: {
            name: string;
            value: number;
        }[];
        sports: any[];
    }>;
    findAll(req: any): Promise<({
        wallet: {
            id: string;
            userId: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
        } | null;
    } & {
        id: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
        result: import("@prisma/client/runtime/library").Decimal | null;
        createdAt: Date;
        userId: string;
        walletId: string | null;
    })[]>;
    findOne(req: any, id: string): Promise<{
        wallet: {
            id: string;
            userId: string;
            name: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            type: import(".prisma/client").$Enums.WalletType;
        } | null;
    } & {
        id: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
        result: import("@prisma/client/runtime/library").Decimal | null;
        createdAt: Date;
        userId: string;
        walletId: string | null;
    }>;
    resolve(req: any, id: string, resolveBetDto: ResolveBetDto): Promise<{
        id: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
        result: import("@prisma/client/runtime/library").Decimal | null;
        createdAt: Date;
        userId: string;
        walletId: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
        result: import("@prisma/client/runtime/library").Decimal | null;
        createdAt: Date;
        userId: string;
        walletId: string | null;
    }>;
}
