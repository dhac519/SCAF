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
}
