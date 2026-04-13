import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        _count: {
            wallets: number;
        };
    }[]>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserModules(id: string, modules: string[]): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    resetUserPassword(id: string, newPassword: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
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
