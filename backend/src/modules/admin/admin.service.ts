import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        modules: true,
        createdAt: true,
        _count: {
          select: { wallets: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserModules(id: string, modules: string[]) {
    return this.prisma.user.update({
      where: { id },
      data: { modules }
    });
  }

  async resetUserPassword(id: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });
  }

  async getSystemStats() {
    const totalUsers = await this.prisma.user.count();
    const totalWallets = await this.prisma.wallet.count();
    const totalCollections = await this.prisma.collectionItem.count();
    const totalTransactions = await this.prisma.transaction.count();
    
    return {
      users: totalUsers,
      wallets: totalWallets,
      collections: totalCollections,
      transactions: totalTransactions
    };
  }
}
