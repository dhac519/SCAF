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
exports.NetopsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NetopsService = class NetopsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createNetOpsCommandDto) {
        return this.prisma.netOpsCommand.create({
            data: {
                ...createNetOpsCommandDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.netOpsCommand.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const command = await this.prisma.netOpsCommand.findFirst({
            where: { id, userId },
        });
        if (!command) {
            throw new common_1.NotFoundException(`Command with ID ${id} not found`);
        }
        return command;
    }
    async update(id, userId, updateNetOpsCommandDto) {
        await this.findOne(id, userId);
        return this.prisma.netOpsCommand.update({
            where: { id },
            data: updateNetOpsCommandDto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.netOpsCommand.delete({
            where: { id },
        });
    }
};
exports.NetopsService = NetopsService;
exports.NetopsService = NetopsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NetopsService);
//# sourceMappingURL=netops.service.js.map