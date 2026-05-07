import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { CreateInvestmentTransactionDto } from './dto/create-transaction.dto';
import { PriceService } from './services/price.service';
export declare class InvestmentsService {
    private readonly prisma;
    private readonly priceService;
    constructor(prisma: PrismaService, priceService: PriceService);
    createPlatform(userId: string, createPlatformDto: CreatePlatformDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAllPlatforms(userId: string): Promise<({
        investments: {
            symbol: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            userId: string;
            assetName: string;
            coingeckoId: string | null;
            initialAmount: import("@prisma/client/runtime/library").Decimal;
            currentValue: import("@prisma/client/runtime/library").Decimal;
            platformId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    create(userId: string, createInvestmentDto: CreateInvestmentDto): Promise<{
        symbol: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: string;
        assetName: string;
        coingeckoId: string | null;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        platformId: string | null;
    }>;
    findAll(userId: string): Promise<({
        transactions: {
            id: string;
            type: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
            priceAtDate: import("@prisma/client/runtime/library").Decimal;
            investmentId: string;
        }[];
        platform: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        } | null;
    } & {
        symbol: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: string;
        assetName: string;
        coingeckoId: string | null;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        platformId: string | null;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        transactions: {
            id: string;
            type: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
            priceAtDate: import("@prisma/client/runtime/library").Decimal;
            investmentId: string;
        }[];
        platform: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        } | null;
    } & {
        symbol: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: string;
        assetName: string;
        coingeckoId: string | null;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        platformId: string | null;
    }>;
    update(userId: string, id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<{
        symbol: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: string;
        assetName: string;
        coingeckoId: string | null;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        platformId: string | null;
    }>;
    remove(userId: string, id: string): Promise<{
        symbol: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        userId: string;
        assetName: string;
        coingeckoId: string | null;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
        platformId: string | null;
    }>;
    addTransaction(userId: string, dto: CreateInvestmentTransactionDto): Promise<{
        id: string;
        type: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        priceAtDate: import("@prisma/client/runtime/library").Decimal;
        investmentId: string;
    }>;
    getMarketTrends(): Promise<any>;
}
