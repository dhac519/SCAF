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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createTransactionDto) {
        const { amount, description, type, walletId, targetWalletId, categoryId } = createTransactionDto;
        const wallet = await this.prisma.wallet.findFirst({
            where: { id: walletId, userId },
        });
        if (!wallet)
            throw new common_1.NotFoundException('Billetera origen no encontrada o no pertenece al usuario');
        if (type === client_1.TransactionType.TRANSFER) {
            if (!targetWalletId)
                throw new common_1.BadRequestException('Billetera destino es requerida para transferencias');
            const targetWallet = await this.prisma.wallet.findFirst({
                where: { id: targetWalletId, userId },
            });
            if (!targetWallet)
                throw new common_1.NotFoundException('Billetera destino no encontrada o no pertenece al usuario');
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
            if (type === client_1.TransactionType.EXPENSE) {
                await prisma.wallet.update({
                    where: { id: walletId },
                    data: { balance: { decrement: amount } },
                });
            }
            else if (type === client_1.TransactionType.INCOME) {
                await prisma.wallet.update({
                    where: { id: walletId },
                    data: { balance: { increment: amount } },
                });
            }
            else if (type === client_1.TransactionType.TRANSFER) {
                await prisma.wallet.update({
                    where: { id: walletId },
                    data: { balance: { decrement: amount } },
                });
                await prisma.wallet.update({
                    where: { id: targetWalletId },
                    data: { balance: { increment: amount } },
                });
            }
            return transaction;
        });
    }
    async findAll(userId) {
        return this.prisma.transaction.findMany({
            where: { wallet: { userId } },
            include: { wallet: true, targetWallet: true, category: true },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(userId, id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id, wallet: { userId } },
            include: { wallet: true, targetWallet: true, category: true },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transacción no encontrada');
        return transaction;
    }
    async update(userId, id, updateTransactionDto) {
        const transaction = await this.findOne(userId, id);
        if (updateTransactionDto.amount ||
            updateTransactionDto.type ||
            updateTransactionDto.walletId) {
            throw new common_1.BadRequestException('Para actualizar monto, tipo o billetera, elimine la transacción y cree una nueva.');
        }
        return this.prisma.transaction.update({
            where: { id },
            data: updateTransactionDto,
        });
    }
    async remove(userId, id) {
        const transaction = await this.findOne(userId, id);
        return this.prisma.$transaction(async (prisma) => {
            if (transaction.type === client_1.TransactionType.EXPENSE) {
                await prisma.wallet.update({
                    where: { id: transaction.walletId },
                    data: { balance: { increment: transaction.amount } },
                });
            }
            else if (transaction.type === client_1.TransactionType.INCOME) {
                await prisma.wallet.update({
                    where: { id: transaction.walletId },
                    data: { balance: { decrement: transaction.amount } },
                });
            }
            else if (transaction.type === client_1.TransactionType.TRANSFER) {
                await prisma.wallet.update({
                    where: { id: transaction.walletId },
                    data: { balance: { increment: transaction.amount } },
                });
                await prisma.wallet.update({
                    where: { id: transaction.targetWalletId },
                    data: { balance: { decrement: transaction.amount } },
                });
            }
            return prisma.transaction.delete({
                where: { id },
            });
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map