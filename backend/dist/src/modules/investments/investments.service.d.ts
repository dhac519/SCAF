import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
export declare class InvestmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createInvestmentDto: CreateInvestmentDto): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(userId: string, id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
}
