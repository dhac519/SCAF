import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        email: string;
        name: string | null;
        id: string;
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
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    updateUserModules(id: string, modules: string[]): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    resetUserPassword(id: string, newPassword: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    toggleUserActiveStatus(id: string, isActive: boolean): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
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
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }[]>;
    updateSupportTicketStatus(id: string, status: string): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }>;
    deleteSupportTicket(id: string): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }>;
}
