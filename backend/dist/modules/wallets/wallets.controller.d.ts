import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    create(req: any, createWalletDto: CreateWalletDto): Promise<{
        name: string;
        id: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        name: string;
        id: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    update(req: any, id: string, updateWalletDto: UpdateWalletDto): Promise<{
        name: string;
        id: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
}
