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
let InvestmentsService = class InvestmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createInvestmentDto) {
        const data = {
            ...createInvestmentDto,
            userId,
            currentValue: createInvestmentDto.currentValue ?? createInvestmentDto.initialAmount
        };
        return this.prisma.investment.create({ data });
    }
    async findAll(userId) {
        return this.prisma.investment.findMany({
            where: { userId },
            orderBy: { assetName: 'asc' },
        });
    }
    async findOne(userId, id) {
        const investment = await this.prisma.investment.findFirst({
            where: { id, userId },
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
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map