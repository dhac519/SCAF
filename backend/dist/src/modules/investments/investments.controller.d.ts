import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { CreateInvestmentTransactionDto } from './dto/create-transaction.dto';
export declare class InvestmentsController {
    private readonly investmentsService;
    constructor(investmentsService: InvestmentsService);
    create(req: any, createInvestmentDto: CreateInvestmentDto): Promise<{
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
    findAll(req: any): Promise<({
        transactions: {
            id: string;
            type: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
            priceAtDate: import("@prisma/client/runtime/library").Decimal;
            investmentId: string;
        }[];
        platform: {
            id: string;
            name: string;
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
    getMarketTrends(): Promise<any>;
    createPlatform(req: any, createPlatformDto: CreatePlatformDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAllPlatforms(req: any): Promise<({
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
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findOne(req: any, id: string): Promise<{
        transactions: {
            id: string;
            type: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
            priceAtDate: import("@prisma/client/runtime/library").Decimal;
            investmentId: string;
        }[];
        platform: {
            id: string;
            name: string;
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
    update(req: any, id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
    addTransaction(req: any, dto: CreateInvestmentTransactionDto): Promise<{
        id: string;
        type: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
        priceAtDate: import("@prisma/client/runtime/library").Decimal;
        investmentId: string;
    }>;
}
