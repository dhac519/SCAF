import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    getAdminStats(): Promise<{
        users: number;
        wallets: number;
        collections: number;
        transactions: number;
    }>;
    deleteUser(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
