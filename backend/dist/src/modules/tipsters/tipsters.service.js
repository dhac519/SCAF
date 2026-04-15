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
exports.TipstersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TipstersService = class TipstersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateBank(userId) {
        let bank = await this.prisma.tipsterBank.findUnique({ where: { userId } });
        if (!bank) {
            bank = await this.prisma.tipsterBank.create({
                data: {
                    userId,
                    initialBank: 100000,
                    currentBank: 100000,
                    unitValue: 100,
                }
            });
        }
        return bank;
    }
    async updateBank(userId, data) {
        const bank = await this.getOrCreateBank(userId);
        return this.prisma.tipsterBank.update({
            where: { id: bank.id },
            data,
        });
    }
    async createBet(userId, createTipsterBetDto) {
        return this.prisma.$transaction(async (prisma) => {
            const bank = await this.getOrCreateBank(userId);
            const { stake, odds, status = client_1.BetStatus.PENDING, tipster, event, date } = createTipsterBetDto;
            const amountWagered = stake * Number(bank.unitValue);
            let unitsProfit = null;
            let realProfit = null;
            let cumulativeBalance = Number(bank.currentBank);
            if (status === client_1.BetStatus.WON) {
                unitsProfit = stake * (odds - 1);
                realProfit = amountWagered * (odds - 1);
            }
            else if (status === client_1.BetStatus.LOST) {
                unitsProfit = -stake;
                realProfit = -amountWagered;
            }
            else if (status === client_1.BetStatus.VOID) {
                unitsProfit = 0;
                realProfit = 0;
            }
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
            if (status !== client_1.BetStatus.PENDING) {
                await prisma.tipsterBank.update({
                    where: { id: bank.id },
                    data: { currentBank: cumulativeBalance }
                });
            }
            return newBet;
        });
    }
    async updateBetStatus(userId, id, status) {
        return this.prisma.$transaction(async (prisma) => {
            const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
            if (!bet)
                throw new common_1.NotFoundException('Pronóstico no encontrado');
            if (bet.status === status)
                return bet;
            const bank = await this.getOrCreateBank(userId);
            let newCurrentBank = Number(bank.currentBank);
            if (bet.status !== client_1.BetStatus.PENDING && bet.realProfit !== null) {
                newCurrentBank -= Number(bet.realProfit);
            }
            const stake = Number(bet.stake);
            const odds = Number(bet.odds);
            const amountWagered = Number(bet.amountWagered);
            let unitsProfit = null;
            let realProfit = null;
            if (status === client_1.BetStatus.WON) {
                unitsProfit = stake * (odds - 1);
                realProfit = amountWagered * (odds - 1);
            }
            else if (status === client_1.BetStatus.LOST) {
                unitsProfit = -stake;
                realProfit = -amountWagered;
            }
            else if (status === client_1.BetStatus.VOID) {
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
                    cumulativeBalance: newCurrentBank
                }
            });
            await prisma.tipsterBank.update({
                where: { id: bank.id },
                data: { currentBank: newCurrentBank }
            });
            return updatedBet;
        });
    }
    async updateBet(userId, id, updateData) {
        return this.prisma.$transaction(async (prisma) => {
            const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
            if (!bet)
                throw new common_1.NotFoundException('Pronóstico no encontrado');
            const bank = await this.getOrCreateBank(userId);
            let newCurrentBank = Number(bank.currentBank);
            if (bet.status !== client_1.BetStatus.PENDING && bet.realProfit !== null) {
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
            if (status === client_1.BetStatus.WON) {
                unitsProfit = stake * (odds - 1);
                realProfit = amountWagered * (odds - 1);
            }
            else if (status === client_1.BetStatus.LOST) {
                unitsProfit = -stake;
                realProfit = -amountWagered;
            }
            else if (status === client_1.BetStatus.VOID) {
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
            await prisma.tipsterBank.update({
                where: { id: bank.id },
                data: { currentBank: newCurrentBank }
            });
            return updatedBet;
        });
    }
    async findAll(userId) {
        return this.prisma.tipsterBet.findMany({
            where: { userId },
            orderBy: { date: 'desc' }
        });
    }
    async deleteBet(userId, id) {
        return this.prisma.$transaction(async (prisma) => {
            const bet = await prisma.tipsterBet.findFirst({ where: { id, userId } });
            if (!bet)
                throw new common_1.NotFoundException('Pronóstico no encontrado');
            if (bet.status !== client_1.BetStatus.PENDING && bet.realProfit !== null) {
                const bank = await this.getOrCreateBank(userId);
                await prisma.tipsterBank.update({
                    where: { id: bank.id },
                    data: { currentBank: Number(bank.currentBank) - Number(bet.realProfit) }
                });
            }
            return prisma.tipsterBet.delete({ where: { id } });
        });
    }
    async getDashboard(userId) {
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
        const evolution = [];
        bets.forEach(bet => {
            if (bet.status !== client_1.BetStatus.PENDING) {
                totalWagered += Number(bet.amountWagered);
            }
            if (bet.realProfit !== null)
                totalRealProfit += Number(bet.realProfit);
            if (bet.unitsProfit !== null)
                totalUnits += Number(bet.unitsProfit);
            if (bet.status === client_1.BetStatus.WON)
                won++;
            else if (bet.status === client_1.BetStatus.LOST)
                lost++;
            else if (bet.status === client_1.BetStatus.VOID)
                voided++;
            if (bet.status !== client_1.BetStatus.PENDING) {
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
            evolution
        };
    }
    async getRanking(userId) {
        const bets = await this.prisma.tipsterBet.findMany({ where: { userId } });
        const map = new Map();
        bets.forEach(b => {
            const t = b.tipster;
            if (!map.has(t)) {
                map.set(t, { tipster: t, count: 0, units: 0, wagered: 0, profit: 0, won: 0, lost: 0, voided: 0 });
            }
            const data = map.get(t);
            data.count++;
            if (b.status !== client_1.BetStatus.PENDING) {
                data.wagered += Number(b.amountWagered);
                data.units += Number(b.unitsProfit || 0);
                data.profit += Number(b.realProfit || 0);
                if (b.status === client_1.BetStatus.WON)
                    data.won++;
                else if (b.status === client_1.BetStatus.LOST)
                    data.lost++;
                else if (b.status === client_1.BetStatus.VOID)
                    data.voided++;
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
        ranking.sort((a, b) => b.units - a.units);
        return ranking;
    }
};
exports.TipstersService = TipstersService;
exports.TipstersService = TipstersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TipstersService);
//# sourceMappingURL=tipsters.service.js.map