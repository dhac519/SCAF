import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    create(req: any, createWalletDto: CreateWalletDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    update(req: any, id: string, updateWalletDto: UpdateWalletDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
}
