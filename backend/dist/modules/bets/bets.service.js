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
        return this.prisma.bet.create({
            data: {
                ...createBetDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.bet.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(userId, id) {
        const bet = await this.prisma.bet.findFirst({
            where: { id, userId },
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
        if (resolveBetDto.status === client_1.BetStatus.WON) {
            result = (stake * odds) - stake;
        }
        else if (resolveBetDto.status === client_1.BetStatus.LOST) {
            result = -stake;
        }
        else if (resolveBetDto.status === client_1.BetStatus.VOID) {
            result = 0;
        }
        return this.prisma.bet.update({
            where: { id },
            data: {
                status: resolveBetDto.status,
                result,
            },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.bet.delete({
            where: { id },
        });
    }
};
exports.BetsService = BetsService;
exports.BetsService = BetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BetsService);
//# sourceMappingURL=bets.service.js.map