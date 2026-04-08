import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
export declare class BetsController {
    private readonly betsService;
    constructor(betsService: BetsService);
    create(req: any, createBetDto: CreateBetDto): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    findAll(req: any): Promise<({
        wallet: {
            name: string;
            id: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    })[]>;
    findOne(req: any, id: string): Promise<{
        wallet: {
            name: string;
            id: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    resolve(req: any, id: string, resolveBetDto: ResolveBetDto): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        walletId: string | null;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
}
