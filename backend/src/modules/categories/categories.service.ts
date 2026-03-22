import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  async findOne(userId: string, id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
    });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada o no pertenece al usuario');
    }
    return category;
  }

  async update(userId: string, id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(userId, id); // Verifica si existe y es del usuario

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Verifica si existe y es del usuario

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
