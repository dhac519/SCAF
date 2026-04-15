import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTipsterBetDto } from './dto/create-tipster-bet.dto';
import { BetStatus } from '@prisma/client';

@Injectable()
export class TipstersService {
  constructor(private prisma: PrismaService) {}

  // Inicializar el Banco Ficticio si no existe
  async getOrCreateBank(userId: string) {
    let bank = await this.prisma.tipsterBank.findUnique({ where: { userId } });
    if (!bank) {
      bank = await this.prisma.tipsterBank.create({
        data: {
          userId,
          initialBank: 100000, // Capital ficticio inicial (100k)
          currentBank: 100000,
          unitValue: 100,      // Valor por unidad
        }
      });
    }
    return bank;
  }

  // Permite actualizar configuración del banco
  async updateBank(userId: string, data: { currentBank?: number, unitValue?: number }) {
    const bank = await this.getOrCreateBank(userId);
    return this.prisma.tipsterBank.update({
      where: { id: bank.id },
      data,
    });
  }

  async createBet(userId: string, createTipsterBetDto: CreateTipsterBetDto) {
    return this.prisma.$transaction(async (prisma) => {
      const bank = await this.getOrCreateBank(userId);
      const { stake, odds, status = BetStatus.PENDING, tipster, event, date } = createTipsterBetDto;

      const amountWagered = stake * Number(bank.unitValue);
      let unitsProfit = null;
      let realProfit = null;
      let cumulativeBalance = Number(bank.currentBank);

      if (status === BetStatus.WON) {
        unitsProfit = stake * (odds - 1);
        realProfit = amountWagered * (odds - 1);
      } else if (status === BetStatus.LOST) {
        unitsProfit = -stake;
        realProfit = -amountWagered;
      } else if (status === BetStatus.VOID) {
        unitsProfit = 0;
        realProfit = 0;
      } // Si es PENDING, todo es null (0 ganancia asegurada aún)

      if (realProfit !== null) {
        cumulativeBalance += realProfit;
      }

      const newBet = await prisma.tipsterBet.create({
        data: {
          userId,
          tipster,
          event,
          stake,
          odds,
          status,
          amountWagered,
          unitsProfit,
          realProfit,
          cumulativeBalance,
          date: date ? new Date(date) : new Date(),
        }
      });

      // Actualizar el banco si se resolvió la apuesta (WON/LOST/VOID)
      if (status !== BetStatus.PENDING) {
        await prisma.tipsterBank.update({
          where: { id: bank.id },
          data: { currentBank: cumulativeBalance }
        });
      }

      return newBet;
    });
  }

  async updateBetStatus(userId: string, id: string, status: BetStatus) {
    return this.prisma.$transaction(async (prisma) => {
      const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
      if (!bet) throw new NotFoundException('Pronóstico no encontrado');
      if (bet.status === status) return bet; // Sin cambios

      const bank = await this.getOrCreateBank(userId);
      let newCurrentBank = Number(bank.currentBank);

      // Revertir efecto del estado anterior
      if (bet.status !== BetStatus.PENDING && bet.realProfit !== null) {
        newCurrentBank -= Number(bet.realProfit);
      }

      const stake = Number(bet.stake);
      const odds = Number(bet.odds);
      const amountWagered = Number(bet.amountWagered);
      let unitsProfit = null;
      let realProfit = null;

      if (status === BetStatus.WON) {
        unitsProfit = stake * (odds - 1);
        realProfit = amountWagered * (odds - 1);
      } else if (status === BetStatus.LOST) {
        unitsProfit = -stake;
        realProfit = -amountWagered;
      } else if (status === BetStatus.VOID) {
        unitsProfit = 0;
        realProfit = 0;
      }

      if (realProfit !== null) {
        newCurrentBank += realProfit;
      }

      const updatedBet = await prisma.tipsterBet.update({
        where: { id },
        data: {
          status,
          unitsProfit,
          realProfit,
          cumulativeBalance: newCurrentBank // Refleja el banco en este momento
        }
      });

      // Update Bank
      await prisma.tipsterBank.update({
        where: { id: bank.id },
        data: { currentBank: newCurrentBank }
      });

      return updatedBet;
    });
  }

  async updateBet(userId: string, id: string, updateData: any) {
    return this.prisma.$transaction(async (prisma) => {
      const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
      if (!bet) throw new NotFoundException('Pronóstico no encontrado');

      const bank = await this.getOrCreateBank(userId);
      let newCurrentBank = Number(bank.currentBank);

      // Revertir efecto del estado anterior
      if (bet.status !== BetStatus.PENDING && bet.realProfit !== null) {
        newCurrentBank -= Number(bet.realProfit);
      }

      const status = updateData.status !== undefined ? updateData.status : bet.status;
      const stake = updateData.stake !== undefined ? Number(updateData.stake) : Number(bet.stake);
      const odds = updateData.odds !== undefined ? Number(updateData.odds) : Number(bet.odds);
      const tipster = updateData.tipster !== undefined ? updateData.tipster : bet.tipster;
      const event = updateData.event !== undefined ? updateData.event : bet.event;

      const amountWagered = stake * Number(bank.unitValue);
      let unitsProfit = null;
      let realProfit = null;

      if (status === BetStatus.WON) {
        unitsProfit = stake * (odds - 1);
        realProfit = amountWagered * (odds - 1);
      } else if (status === BetStatus.LOST) {
        unitsProfit = -stake;
        realProfit = -amountWagered;
      } else if (status === BetStatus.VOID) {
        unitsProfit = 0;
        realProfit = 0;
      }

      if (realProfit !== null) {
        newCurrentBank += realProfit;
      }

      const updatedBet = await prisma.tipsterBet.update({
        where: { id },
        data: {
          tipster,
          event,
          stake,
          odds,
          status,
          amountWagered,
          unitsProfit,
          realProfit,
          cumulativeBalance: newCurrentBank
        }
      });

      // Update Bank
      await prisma.tipsterBank.update({
        where: { id: bank.id },
        data: { currentBank: newCurrentBank }
      });

      return updatedBet;
    });
  }

  async findAll(userId: string) {
    return this.prisma.tipsterBet.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });
  }

  async deleteBet(userId: string, id: string) {
    return this.prisma.$transaction(async (prisma) => {
      const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
      if (!bet) throw new NotFoundException('Pronóstico no encontrado');

      if (bet.status !== BetStatus.PENDING && bet.realProfit !== null) {
        const bank = await this.getOrCreateBank(userId);
        await prisma.tipsterBank.update({
          where: { id: bank.id },
          data: { currentBank: Number(bank.currentBank) - Number(bet.realProfit) }
        });
      }

      return prisma.tipsterBet.delete({ where: { id } });
    });
  }

  async getDashboard(userId: string) {
    const bank = await this.getOrCreateBank(userId);
    const bets = await this.prisma.tipsterBet.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });

    let totalWagered = 0;
    let totalRealProfit = 0;
    let totalUnits = 0;
    let won = 0;
    let lost = 0;
    let voided = 0;

    const evolution: any[] = []; // Chart data

    bets.forEach(bet => {
      if (bet.status !== BetStatus.PENDING) {
         totalWagered += Number(bet.amountWagered);
      }
      
      if (bet.realProfit !== null) totalRealProfit += Number(bet.realProfit);
      if (bet.unitsProfit !== null) totalUnits += Number(bet.unitsProfit);

      if (bet.status === BetStatus.WON) won++;
      else if (bet.status === BetStatus.LOST) lost++;
      else if (bet.status === BetStatus.VOID) voided++;

      if (bet.status !== BetStatus.PENDING) {
        evolution.push({
          date: bet.date,
          balance: Number(bet.cumulativeBalance) || 0
        });
      }
    });

    const yieldPercent = totalWagered > 0 ? (totalRealProfit / totalWagered) * 100 : 0;
    const resolved = won + lost;
    const winRate = resolved > 0 ? (won / resolved) * 100 : 0;

    return {
      bank: {
        initial: Number(bank.initialBank),
        current: Number(bank.currentBank),
        unitValue: Number(bank.unitValue)
      },
      stats: {
        totalBets: bets.length,
        resolvedBets: resolved + voided,
        totalWagered,
        totalRealProfit,
        totalUnits,
        yieldPercent,
        winRate,
        winLossMatches: { won, lost, voided }
      },
      evolution // for Line Chart
    };
  }

  async getRanking(userId: string) {
    const bets = await this.prisma.tipsterBet.findMany({ where: { userId } });
    
    // Group by tipster
    const map = new Map<string, any>();

    bets.forEach(b => {
      const t = b.tipster;
      if (!map.has(t)) {
        map.set(t, { tipster: t, count: 0, units: 0, wagered: 0, profit: 0, won: 0, lost: 0, voided: 0 });
      }
      const data = map.get(t);
      data.count++;
      
      if (b.status !== BetStatus.PENDING) {
        data.wagered += Number(b.amountWagered);
        data.units += Number(b.unitsProfit || 0);
        data.profit += Number(b.realProfit || 0);
        
        if (b.status === BetStatus.WON) data.won++;
        else if (b.status === BetStatus.LOST) data.lost++;
        else if (b.status === BetStatus.VOID) data.voided++;
      }
    });

    const ranking = Array.from(map.values()).map(r => {
      const resolved = r.won + r.lost;
      return {
        ...r,
        yieldPercent: r.wagered > 0 ? (r.profit / r.wagered) * 100 : 0,
        winRate: resolved > 0 ? (r.won / resolved) * 100 : 0
      };
    });

    // Ordenar por Unidades desc
    ranking.sort((a, b) => b.units - a.units);
    return ranking;
  }
}
