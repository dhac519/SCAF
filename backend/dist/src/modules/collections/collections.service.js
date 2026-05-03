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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CollectionsService = class CollectionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(dto, userId) {
        return this.prisma.collectionCategory.create({ data: { ...dto, userId } });
    }
    async getCategories(userId) {
        return this.prisma.collectionCategory.findMany({
            where: { userId },
            include: { subcategories: true },
            orderBy: { name: 'asc' },
        });
    }
    async createSubcategory(dto, userId) {
        return this.prisma.collectionSubcategory.create({
            data: { ...dto, userId },
        });
    }
    async createItem(dto, userId) {
        return this.prisma.collectionItem.create({ data: { ...dto, userId } });
    }
    async getItems(userId) {
        return this.prisma.collectionItem.findMany({
            where: { userId },
            include: { category: true, subcategory: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async removeItem(id, userId) {
        const item = await this.prisma.collectionItem.findFirst({
            where: { id, userId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        return this.prisma.collectionItem.delete({ where: { id } });
    }
};
exports.CollectionsService = CollectionsService;
exports.CollectionsService = CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CollectionsService);
//# sourceMappingURL=collections.service.js.map