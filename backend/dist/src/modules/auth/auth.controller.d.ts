import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        modules: string[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        lastActiveAt: Date | null;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string | null;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            modules: string[];
        };
    }>;
    heartbeat(req: any): Promise<{
        id: string;
        lastActiveAt: Date | null;
    }>;
    createSupportTicket(email: string, reason: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        status: string;
    }>;
}
