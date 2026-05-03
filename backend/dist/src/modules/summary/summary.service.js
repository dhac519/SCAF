"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SummaryService = class SummaryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGlobalSummary(userId) {
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
        const monthlyPulse = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
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
        const totalProfitResult = await this.prisma.bet.aggregate({
            where: { userId, status: { in: ['WON', 'LOST', 'CASHOUT'] } },
            _sum: { result: true },
        });
        const tipsterBank = await this.prisma.tipsterBank.findUnique({
            where: { userId },
        });
        return {
            distribution: [
                { label: 'Efectivo', value: totalCash, color: '#3b82f6' },
                { label: 'Inversiones', value: totalInvestments, color: '#10b981' },
                { label: 'Apuestas', value: totalBetsStake, color: '#a855f7' },
                {
                    label: 'Colecciones',
                    value: totalCollectionsValue,
                    color: '#f59e0b',
                },
            ],
            monthlyPulse,
            stats: {
                totalNetWorth: totalCash + totalInvestments + totalBetsStake + totalCollectionsValue,
                activeInvestments: investments.length,
                pendingBets: pendingBets.length,
                collectionsCount: collectionItems.length,
                totalBettingProfit: Number(totalProfitResult._sum.result || 0),
                tipsterCurrentBank: Number(tipsterBank?.currentBank || 0),
            },
            latestTransactions: await this.prisma.transaction.findMany({
                where: { wallet: { userId } },
                orderBy: { date: 'desc' },
                take: 5,
                include: { wallet: true },
            }),
        };
    }
};
exports.SummaryService = SummaryService;
exports.SummaryService = SummaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SummaryService);
//# sourceMappingURL=summary.service.js.map