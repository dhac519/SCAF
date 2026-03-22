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
        userId: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    resolve(userId: string, id: string, resolveBetDto: ResolveBetDto): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        result: import("@prisma/client/runtime/library").Decimal | null;
        userId: string;
        event: string;
        sport: string;
        stake: import("@prisma/client/runtime/library").Decimal;
        odds: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.BetStatus;
    }>;
}
