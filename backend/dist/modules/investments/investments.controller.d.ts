import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
export declare class InvestmentsController {
    private readonly investmentsService;
    constructor(investmentsService: InvestmentsService);
    create(req: any, createInvestmentDto: CreateInvestmentDto): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(req: any): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(req: any, id: string, updateInvestmentDto: UpdateInvestmentDto): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        type: string;
        userId: string;
        assetName: string;
        initialAmount: import("@prisma/client/runtime/library").Decimal;
        currentValue: import("@prisma/client/runtime/library").Decimal;
    }>;
}
