import { PrismaService } from '../../prisma/prisma.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
export declare class BetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createBetDto: CreateBetDto): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(userId: string): Promise<({
        wallet: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        wallet: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.WalletType;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
    }>;
    resolve(userId: string, id: string, resolveBetDto: ResolveBetDto): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        status: import(".prisma/client").$Enums.BetStatus;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
    }>;
    getStats(userId: string): Promise<{
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
}
