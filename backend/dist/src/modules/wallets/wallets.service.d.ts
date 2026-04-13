import { PrismaService } from '../../prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createWalletDto: CreateWalletDto): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }[]>;
    getBettingWallet(userId: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    update(userId: string, id: string, updateWalletDto: UpdateWalletDto): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        name: string;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        type: import(".prisma/client").$Enums.WalletType;
        userId: string;
    }>;
}
