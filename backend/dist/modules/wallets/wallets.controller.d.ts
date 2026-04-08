import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    create(req: any, createWalletDto: CreateWalletDto): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    update(req: any, id: string, updateWalletDto: UpdateWalletDto): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
}
