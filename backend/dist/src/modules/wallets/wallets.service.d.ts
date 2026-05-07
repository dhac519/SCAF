import { PrismaService } from '../../prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createWalletDto: CreateWalletDto): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }[]>;
    getBettingWallet(userId: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    findOne(userId: string, id: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    update(userId: string, id: string, updateWalletDto: UpdateWalletDto): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.WalletType;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: string;
    }>;
}
