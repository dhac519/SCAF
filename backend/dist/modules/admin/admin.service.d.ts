import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    deleteUser(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSystemStats(): Promise<{
        users: number;
        wallets: number;
        collections: number;
        transactions: number;
    }>;
}
