import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
    getAdminStats(): Promise<{
        users: number;
        wallets: number;
        collections: number;
        transactions: number;
    }>;
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
    resetPassword(id: string, password: string): Promise<{
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
    updateUserActiveStatus(id: string, isActive: boolean): Promise<{
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
    getSupportTickets(): Promise<{
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
