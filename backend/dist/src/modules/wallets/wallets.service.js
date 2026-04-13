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
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WalletsService = class WalletsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createWalletDto) {
        return this.prisma.wallet.create({
            data: {
                ...createWalletDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        await this.getBettingWallet(userId);
        return this.prisma.wallet.findMany({
            where: { userId },
        });
    }
    async getBettingWallet(userId) {
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
    async findOne(userId, id) {
        const wallet = await this.prisma.wallet.findFirst({
            where: { id, userId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Billetera no encontrada o no pertenece al usuario');
        }
        return wallet;
    }
    async update(userId, id, updateWalletDto) {
        await this.findOne(userId, id);
        return this.prisma.wallet.update({
            where: { id },
            data: updateWalletDto,
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.wallet.delete({
            where: { id },
        });
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map