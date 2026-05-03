import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { amount, description, type, walletId, targetWalletId, categoryId } =
      createTransactionDto;

    const wallet = await this.prisma.wallet.findFirst({
      where: { id: walletId, userId },
    });
    if (!wallet)
      throw new NotFoundException(
        'Billetera origen no encontrada o no pertenece al usuario',
      );

    if (type === TransactionType.TRANSFER) {
      if (!targetWalletId)
        throw new BadRequestException(
          'Billetera destino es requerida para transferencias',
        );
      const targetWallet = await this.prisma.wallet.findFirst({
        where: { id: targetWalletId, userId },
      });
      if (!targetWallet)
        throw new NotFoundException(
          'Billetera destino no encontrada o no pertenece al usuario',
        );
    }

    return this.prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.create({
        data: {
          amount,
          description,
          type,
          walletId,
          targetWalletId,
          categoryId,
        },
      });

      if (type === TransactionType.EXPENSE) {
        await prisma.wallet.update({
          where: { id: walletId },
          data: { balance: { decrement: amount } },
        });
      } else if (type === TransactionType.INCOME) {
        await prisma.wallet.update({
          where: { id: walletId },
          data: { balance: { increment: amount } },
        });
      } else if (type === TransactionType.TRANSFER) {
        await prisma.wallet.update({
          where: { id: walletId },
          data: { balance: { decrement: amount } },
        });
        await prisma.wallet.update({
          where: { id: targetWalletId! },
          data: { balance: { increment: amount } },
        });
      }

      return transaction;
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { wallet: { userId } },
      include: { wallet: true, targetWallet: true, category: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, wallet: { userId } },
      include: { wallet: true, targetWallet: true, category: true },
    });
    if (!transaction) throw new NotFoundException('Transacción no encontrada');
    return transaction;
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(userId, id);
    if (
      updateTransactionDto.amount ||
      updateTransactionDto.type ||
      updateTransactionDto.walletId
    ) {
      throw new BadRequestException(
        'Para actualizar monto, tipo o billetera, elimine la transacción y cree una nueva.',
      );
    }

    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(userId: string, id: string) {
    const transaction = await this.findOne(userId, id);

    return this.prisma.$transaction(async (prisma) => {
      if (transaction.type === TransactionType.EXPENSE) {
        await prisma.wallet.update({
          where: { id: transaction.walletId },
          data: { balance: { increment: transaction.amount } },
        });
      } else if (transaction.type === TransactionType.INCOME) {
        await prisma.wallet.update({
          where: { id: transaction.walletId },
          data: { balance: { decrement: transaction.amount } },
        });
      } else if (transaction.type === TransactionType.TRANSFER) {
        await prisma.wallet.update({
          where: { id: transaction.walletId },
          data: { balance: { increment: transaction.amount } },
        });
        await prisma.wallet.update({
          where: { id: transaction.targetWalletId! },
          data: { balance: { decrement: transaction.amount } },
        });
      }

      return prisma.transaction.delete({
        where: { id },
      });
    });
  }
}
