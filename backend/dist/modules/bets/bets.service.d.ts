import { PrismaService } from '../../prisma/prisma.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
export declare class BetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createBetDto: CreateBetDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(userId: string, id: string): Promise<{
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
    resolve(userId: string, id: string, resolveBetDto: ResolveBetDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
