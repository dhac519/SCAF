import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCategoryDto,
  CreateSubcategoryDto,
  CreateItemDto,
} from './dto/collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  // CATEGORIES
  async createCategory(dto: CreateCategoryDto, userId: string) {
    return this.prisma.collectionCategory.create({ data: { ...dto, userId } });
  }

  async getCategories(userId: string) {
    return this.prisma.collectionCategory.findMany({
      where: { userId },
      include: { subcategories: true },
      orderBy: { name: 'asc' },
    });
  }

  // SUBCATEGORIES
  async createSubcategory(dto: CreateSubcategoryDto, userId: string) {
    return this.prisma.collectionSubcategory.create({
      data: { ...dto, userId },
    });
  }

  // ITEMS
  async createItem(dto: CreateItemDto, userId: string) {
    return this.prisma.collectionItem.create({ data: { ...dto, userId } });
  }

  async getItems(userId: string) {
    return this.prisma.collectionItem.findMany({
      where: { userId },
      include: { category: true, subcategory: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeItem(id: string, userId: string) {
    const item = await this.prisma.collectionItem.findFirst({
      where: { id, userId },
    });
    if (!item) throw new NotFoundException('Item not found');
    return this.prisma.collectionItem.delete({ where: { id } });
  }
}
