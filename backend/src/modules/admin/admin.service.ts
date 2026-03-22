import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
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
