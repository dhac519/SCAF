import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SummaryService {
  constructor(private prisma: PrismaService) {}

  async getGlobalSummary(userId: string) {
    // 1. Asset Distribution
    const wallets = await this.prisma.wallet.findMany({
      where: { userId, type: 'GENERAL' },
    });
    const totalCash = wallets.reduce((acc, w) => acc + Number(w.balance), 0);

    const investments = await this.prisma.investment.findMany({
      where: { userId },
    });
    const totalInvestments = investments.reduce((acc, i) => acc + Number(i.currentValue), 0);

    const pendingBets = await this.prisma.bet.findMany({
      where: { userId, status: 'PENDING' },
    });
    const totalBetsStake = pendingBets.reduce((acc, b) => acc + Number(b.stake), 0);

    const collectionItems = await this.prisma.collectionItem.findMany({
      where: { userId },
    });
    const totalCollectionsValue = collectionItems.reduce((acc, c) => acc + Number(c.estimatedValue || 0), 0);

    // 2. Monthly Pulse (Last 6 Months) using native Date
    const monthlyPulse = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      // Calculate start and end of month i months ago
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

      const txs = await this.prisma.transaction.findMany({
        where: {
          wallet: { userId },
          date: { gte: start, lte: end },
        },
      });

      const income = txs
        .filter((t) => t.type === 'INCOME')
        .reduce((acc, t) => acc + Number(t.amount), 0);
      const expense = txs
        .filter((t) => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + Number(t.amount), 0);

      const monthName = monthDate.toLocaleString('default', { month: 'short' });

      monthlyPulse.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        income,
        expense,
        balance: income - expense,
      });
    }

    // 3. Module Stats & Highlights

    // 3. Module Stats & Highlights
    const totalProfitResult = await this.prisma.bet.aggregate({
      where: { userId, status: { in: ['WON', 'LOST', 'CASHOUT'] } },
      _sum: { result: true },
    });

    return {
      distribution: [
        { label: 'Efectivo', value: totalCash, color: '#3b82f6' },
        { label: 'Inversiones', value: totalInvestments, color: '#10b981' },
        { label: 'Apuestas', value: totalBetsStake, color: '#a855f7' },
        { label: 'Colecciones', value: totalCollectionsValue, color: '#f59e0b' },
      ],
      monthlyPulse,
      stats: {
        totalNetWorth: totalCash + totalInvestments + totalBetsStake + totalCollectionsValue,
        activeInvestments: investments.length,
        pendingBets: pendingBets.length,
        collectionsCount: collectionItems.length,
        totalBettingProfit: Number(totalProfitResult._sum.result || 0),
      },
      latestTransactions: await this.prisma.transaction.findMany({
        where: { wallet: { userId } },
        orderBy: { date: 'desc' },
        take: 5,
        include: { wallet: true },
      }),
    };
  }
}
