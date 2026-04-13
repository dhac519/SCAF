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

      // Encontrar la billetera de apuestas del usuario
      let bettingWallet = await prisma.wallet.findFirst({
        where: { userId, type: 'BETTING' },
      });
      if (!bettingWallet) {
        bettingWallet = await prisma.wallet.create({
          data: { name: 'Mi Casa de Apuestas', type: 'BETTING', userId }
        });
      }

      // Si hay retorno, abonar a la billetera de apuestas
      if (totalRetornado > 0) {
        await prisma.transaction.create({
          data: {
            amount: totalRetornado,
            description: `Resultado Apuesta: ${bet.event} (${resolveBetDto.status})`,
            type: 'INCOME',
            walletId: bettingWallet.id,
          },
        });
        await prisma.wallet.update({
          where: { id: bettingWallet.id },
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

  async getStats(userId: string) {
    const bets = await this.prisma.bet.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const summary = {
      totalBets: bets.length,
      totalStake: 0,
      totalProfit: 0,
      winRate: 0,
      roi: 0,
    };

    let wonCount = 0;
    let resolvedCount = 0;
    const history: any[] = [];
    let cumulativeProfit = 0;

    const distribution = {
      WON: 0,
      LOST: 0,
      VOID: 0,
      CASHOUT: 0,
      PENDING: 0,
    };

    const sportsMap = new Map();

    bets.forEach((bet) => {
      const stake = Number(bet.stake);
      const result = Number(bet.result || 0);

      if (bet.status !== BetStatus.PENDING) {
        summary.totalStake += stake;
        summary.totalProfit += result;
        resolvedCount++;
        
        if (bet.status === BetStatus.WON || (bet.status === BetStatus.CASHOUT && result > 0)) {
          wonCount++;
        }
      }

      distribution[bet.status]++;

      cumulativeProfit += result;
      history.push({
        date: bet.createdAt,
        profit: Number(cumulativeProfit.toFixed(2)),
        event: bet.event,
      });

      const sportData = sportsMap.get(bet.sport) || { name: bet.sport, profit: 0, count: 0 };
      sportData.profit += result;
      sportData.count++;
      sportsMap.set(bet.sport, sportData);
    });

    summary.winRate = resolvedCount > 0 ? (wonCount / resolvedCount) * 100 : 0;
    summary.roi = summary.totalStake > 0 ? (summary.totalProfit / summary.totalStake) * 100 : 0;

    return {
      summary,
      history,
      distribution: Object.entries(distribution).map(([name, value]) => ({ name, value })),
      sports: Array.from(sportsMap.values()),
    };
  }
}
