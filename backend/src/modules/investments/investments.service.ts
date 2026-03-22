import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createInvestmentDto: CreateInvestmentDto) {
    const data = {
      ...createInvestmentDto,
      userId,
      currentValue: createInvestmentDto.currentValue ?? createInvestmentDto.initialAmount
    };

    return this.prisma.investment.create({ data });
  }

  async findAll(userId: string) {
    return this.prisma.investment.findMany({
      where: { userId },
      orderBy: { assetName: 'asc' },
    });
  }

  async findOne(userId: string, id: string) {
    const investment = await this.prisma.investment.findFirst({
      where: { id, userId },
    });
    if (!investment) throw new NotFoundException('Inversión no encontrada');
    return investment;
  }

  async update(userId: string, id: string, updateInvestmentDto: UpdateInvestmentDto) {
    await this.findOne(userId, id);

    return this.prisma.investment.update({
      where: { id },
      data: updateInvestmentDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    return this.prisma.investment.delete({
      where: { id },
    });
  }
}
