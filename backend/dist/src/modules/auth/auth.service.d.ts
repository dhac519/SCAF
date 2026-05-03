import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
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
    heartbeat(userId: string): Promise<{
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
