import { Injectable, ConflictException, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    try {
      const userCount = await this.prisma.user.count();
      if (userCount === 0) {
        this.logger.log('No users found in database. Seeding default admin user...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('adminpassword123', salt);
        
        await this.prisma.user.create({
          data: {
            email: 'admin@scaf.com',
            password: hashedPassword,
            name: 'Administrador Principal',
            role: 'ADMIN',
            modules: ["FINANCE", "BETS", "INVESTMENTS", "COLLECTIONS"],
          },
        });
        this.logger.log('Default admin user created successfully.');
      }
    } catch (error) {
      this.logger.error('Failed to auto-seed admin user:', error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user) {
       const { password, ...result } = user;
       return result;
    }
    return null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...result } = updatedUser;
    return result;
  }
}
