import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createWalletDto: CreateWalletDto) {
    return this.prisma.wallet.create({
      data: {
        ...createWalletDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    // Aseguramos que la cuenta de apuestas exista
    await this.getBettingWallet(userId);

    return this.prisma.wallet.findMany({
      where: { userId },
    });
  }

  async getBettingWallet(userId: string) {
    let wallet = await this.prisma.wallet.findFirst({
      where: { userId, type: 'BETTING' },
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          name: 'Mi Casa de Apuestas',
          userId,
          type: 'BETTING',
        },
      });
    }

    return wallet;
  }

  async findOne(userId: string, id: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id, userId },
    });
    if (!wallet) {
      throw new NotFoundException('Billetera no encontrada o no pertenece al usuario');
    }
    return wallet;
  }

  async update(userId: string, id: string, updateWalletDto: UpdateWalletDto) {
    await this.findOne(userId, id); // Verify ownership

    return this.prisma.wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Verify ownership

    return this.prisma.wallet.delete({
      where: { id },
    });
  }
}
