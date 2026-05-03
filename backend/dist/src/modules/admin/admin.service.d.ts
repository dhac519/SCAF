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
        isActive: boolean;
        lastActiveAt: Date | null;
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
        isActive: boolean;
        lastActiveAt: Date | null;
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
        isActive: boolean;
        lastActiveAt: Date | null;
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
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    toggleUserActiveStatus(id: string, isActive: boolean): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    getSystemStats(): Promise<{
        users: number;
        wallets: number;
        collections: number;
        transactions: number;
    }>;
    getAllSupportTickets(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }[]>;
    updateSupportTicketStatus(id: string, status: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }>;
    deleteSupportTicket(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }>;
}
