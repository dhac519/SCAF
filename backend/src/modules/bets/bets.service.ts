import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
import { BetStatus } from '@prisma/client';

@Injectable()
export class BetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createBetDto: CreateBetDto) {
    const { walletId, ...betData } = createBetDto;
    
    // Si envían walletId, verificamos que exista y sea del usuario
    if (walletId) {
      const wallet = await this.prisma.wallet.findFirst({
        where: { id: walletId, userId },
      });
      if (!wallet) throw new NotFoundException('Billetera no encontrada');
    }

    return this.prisma.$transaction(async (prisma) => {
      const bet = await prisma.bet.create({
        data: {
          ...betData,
          userId,
          walletId,
        },
      });

      // Registrar deducción de la billetera si está vinculada
      if (walletId) {
        await prisma.transaction.create({
          data: {
            amount: betData.stake,
            description: `Apuesta: ${betData.event}`,
            type: 'EXPENSE',
            walletId,
          },
        });
        await prisma.wallet.update({
          where: { id: walletId },
          data: { balance: { decrement: betData.stake } },
        });
      }

      return bet;
    });
  }

  async findAll(userId: string) {
    return this.prisma.bet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { wallet: true },
    });
  }

  async findOne(userId: string, id: string) {
    const bet = await this.prisma.bet.findFirst({
      where: { id, userId },
      include: { wallet: true },
    });
    if (!bet) throw new NotFoundException('Apuesta no encontrada');
    return bet;
  }

  async resolve(userId: string, id: string, resolveBetDto: ResolveBetDto) {
    const bet = await this.findOne(userId, id);
    if (bet.status !== BetStatus.PENDING) {
      throw new BadRequestException('La apuesta ya ha sido resuelta');
    }

    const stake = Number(bet.stake);
    const odds = Number(bet.odds);
    let result = null;
    let totalRetornado = 0;

    if (resolveBetDto.status === BetStatus.WON) {
      result = (stake * odds) - stake; // Ganancia neta
      totalRetornado = stake * odds;
    } else if (resolveBetDto.status === BetStatus.LOST) {
      result = -stake; // Pérdida total de lo apostado
      totalRetornado = 0;
    } else if (resolveBetDto.status === BetStatus.VOID) {
      result = 0; // Se devuelve el dinero, no hay ganancia ni pérdida
      totalRetornado = stake;
    } else if (resolveBetDto.status === BetStatus.CASHOUT) {
      if (resolveBetDto.cashoutAmount === undefined) {
        throw new BadRequestException('El monto de cashout es requerido');
      }
      totalRetornado = resolveBetDto.cashoutAmount;
      result = totalRetornado - stake; // Ganancia neta de cashout (puede ser negativa)
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedBet = await prisma.bet.update({
        where: { id },
        data: {
          status: resolveBetDto.status,
          result,
        },
      });

      // Si tiene billetera vinculada y hay retorno, abonar el retorno
      if (bet.walletId && totalRetornado > 0) {
        await prisma.transaction.create({
          data: {
            amount: totalRetornado,
            description: `Resultado Apuesta: ${bet.event}`,
            type: 'INCOME',
            walletId: bet.walletId,
          },
        });
        await prisma.wallet.update({
          where: { id: bet.walletId },
          data: { balance: { increment: totalRetornado } },
        });
      }

      return updatedBet;
    });
  }

  async remove(userId: string, id: string) {
    const bet = await this.findOne(userId, id);
    
    return this.prisma.$transaction(async (prisma) => {
      // Si la apuesta estaba pendiente y vinculada a billetera, devolvemos el dinero (Void) y luego eliminamos.
      if (bet.status === BetStatus.PENDING && bet.walletId) {
        await prisma.transaction.create({
          data: {
            amount: Number(bet.stake),
            description: `Anulación/Eliminación Apuesta: ${bet.event}`,
            type: 'INCOME',
            walletId: bet.walletId,
          },
        });
        await prisma.wallet.update({
          where: { id: bet.walletId },
          data: { balance: { increment: Number(bet.stake) } },
        });
      }

      return prisma.bet.delete({
        where: { id },
      });
    });
  }
}
