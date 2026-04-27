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
exports.InvestmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const price_service_1 = require("./services/price.service");
let InvestmentsService = class InvestmentsService {
    prisma;
    priceService;
    constructor(prisma, priceService) {
        this.prisma = prisma;
        this.priceService = priceService;
    }
    async createPlatform(userId, createPlatformDto) {
        return this.prisma.investmentPlatform.create({
            data: { ...createPlatformDto, userId },
        });
    }
    async findAllPlatforms(userId) {
        return this.prisma.investmentPlatform.findMany({
            where: { userId },
            include: { investments: true },
        });
    }
    async create(userId, createInvestmentDto) {
        const { platformId, ...rest } = createInvestmentDto;
        const data = {
            ...rest,
            userId,
            currentValue: createInvestmentDto.currentValue ?? createInvestmentDto.initialAmount,
        };
        if (platformId) {
            data.platformId = platformId;
        }
        return this.prisma.investment.create({ data });
    }
    async findAll(userId) {
        const investments = await this.prisma.investment.findMany({
            where: { userId },
            include: { platform: true, transactions: true },
            orderBy: { assetName: 'asc' },
        });
        const cryptoIds = investments
            .filter((i) => i.type === 'CRIPTO' && i.coingeckoId)
            .map((i) => i.coingeckoId);
        if (cryptoIds.length > 0) {
            const prices = await this.priceService.getCryptoPrices(cryptoIds);
            return investments.map((inv) => {
                if (inv.coingeckoId && prices[inv.coingeckoId]) {
                    return {
                        ...inv,
                        realTimePrice: prices[inv.coingeckoId].usd,
                    };
                }
                return inv;
            });
        }
        return investments;
    }
    async findOne(userId, id) {
        const investment = await this.prisma.investment.findFirst({
            where: { id, userId },
            include: { platform: true, transactions: { orderBy: { date: 'desc' } } },
        });
        if (!investment)
            throw new common_1.NotFoundException('Inversión no encontrada');
        return investment;
    }
    async update(userId, id, updateInvestmentDto) {
        await this.findOne(userId, id);
        return this.prisma.investment.update({
            where: { id },
            data: updateInvestmentDto,
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.investment.delete({
            where: { id },
        });
    }
    async addTransaction(userId, dto) {
        const investment = await this.findOne(userId, dto.investmentId);
        const transaction = await this.prisma.investmentTransaction.create({
            data: {
                type: dto.type,
                amount: dto.amount,
                priceAtDate: dto.priceAtDate,
                investmentId: dto.investmentId,
            },
        });
        return transaction;
    }
    async getMarketTrends() {
        return this.priceService.getMarketTrends();
    }
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        price_service_1.PriceService])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map