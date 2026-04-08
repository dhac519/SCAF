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
exports.BetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BetsService = class BetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createBetDto) {
        const { walletId, ...betData } = createBetDto;
        if (walletId) {
            const wallet = await this.prisma.wallet.findFirst({
                where: { id: walletId, userId },
            });
            if (!wallet)
                throw new common_1.NotFoundException('Billetera no encontrada');
        }
        return this.prisma.$transaction(async (prisma) => {
            const bet = await prisma.bet.create({
                data: {
                    ...betData,
                    userId,
                    walletId,
                },
            });
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
    async findAll(userId) {
        return this.prisma.bet.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { wallet: true },
        });
    }
    async findOne(userId, id) {
        const bet = await this.prisma.bet.findFirst({
            where: { id, userId },
            include: { wallet: true },
        });
        if (!bet)
            throw new common_1.NotFoundException('Apuesta no encontrada');
        return bet;
    }
    async resolve(userId, id, resolveBetDto) {
        const bet = await this.findOne(userId, id);
        if (bet.status !== client_1.BetStatus.PENDING) {
            throw new common_1.BadRequestException('La apuesta ya ha sido resuelta');
        }
        const stake = Number(bet.stake);
        const odds = Number(bet.odds);
        let result = null;
        let totalRetornado = 0;
        if (resolveBetDto.status === client_1.BetStatus.WON) {
            result = (stake * odds) - stake;
            totalRetornado = stake * odds;
        }
        else if (resolveBetDto.status === client_1.BetStatus.LOST) {
            result = -stake;
            totalRetornado = 0;
        }
        else if (resolveBetDto.status === client_1.BetStatus.VOID) {
            result = 0;
            totalRetornado = stake;
        }
        else if (resolveBetDto.status === client_1.BetStatus.CASHOUT) {
            if (resolveBetDto.cashoutAmount === undefined) {
                throw new common_1.BadRequestException('El monto de cashout es requerido');
            }
            totalRetornado = resolveBetDto.cashoutAmount;
            result = totalRetornado - stake;
        }
        return this.prisma.$transaction(async (prisma) => {
            const updatedBet = await prisma.bet.update({
                where: { id },
                data: {
                    status: resolveBetDto.status,
                    result,
                },
            });
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
    async remove(userId, id) {
        const bet = await this.findOne(userId, id);
        return this.prisma.$transaction(async (prisma) => {
            if (bet.status === client_1.BetStatus.PENDING && bet.walletId) {
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
};
exports.BetsService = BetsService;
exports.BetsService = BetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BetsService);
//# sourceMappingURL=bets.service.js.map