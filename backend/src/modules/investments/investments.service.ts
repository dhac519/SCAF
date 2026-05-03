import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { CreateInvestmentTransactionDto } from './dto/create-transaction.dto';
import { PriceService } from './services/price.service';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly priceService: PriceService,
  ) {}

  // PLATFORMS
  async createPlatform(userId: string, createPlatformDto: CreatePlatformDto) {
    return this.prisma.investmentPlatform.create({
      data: { ...createPlatformDto, userId },
    });
  }

  async findAllPlatforms(userId: string) {
    return this.prisma.investmentPlatform.findMany({
      where: { userId },
      include: { investments: true },
    });
  }

  // INVESTMENTS
  async create(userId: string, createInvestmentDto: CreateInvestmentDto) {
    const { platformId, ...rest } = createInvestmentDto;

    const data: any = {
      ...rest,
      userId,
      currentValue:
        createInvestmentDto.currentValue ?? createInvestmentDto.initialAmount,
    };

    if (platformId) {
      data.platformId = platformId;
    }

    return this.prisma.investment.create({ data });
  }

  async findAll(userId: string) {
    const investments = await this.prisma.investment.findMany({
      where: { userId },
      include: { platform: true, transactions: true },
      orderBy: { assetName: 'asc' },
    });

    // Optionally update real-time prices if coingeckoId exists
    const cryptoIds = investments
      .filter((i) => i.type === 'CRIPTO' && i.coingeckoId)
      .map((i) => i.coingeckoId as string);

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

  async findOne(userId: string, id: string) {
    const investment = await this.prisma.investment.findFirst({
      where: { id, userId },
      include: { platform: true, transactions: { orderBy: { date: 'desc' } } },
    });
    if (!investment) throw new NotFoundException('Inversión no encontrada');
    return investment;
  }

  async update(
    userId: string,
    id: string,
    updateInvestmentDto: UpdateInvestmentDto,
  ) {
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

  // TRANSACTIONS
  async addTransaction(userId: string, dto: CreateInvestmentTransactionDto) {
    const investment = await this.findOne(userId, dto.investmentId);

    // Create transaction
    const transaction = await this.prisma.investmentTransaction.create({
      data: {
        type: dto.type,
        amount: dto.amount,
        priceAtDate: dto.priceAtDate,
        investmentId: dto.investmentId,
      },
    });

    // Update investment currentValue logic could go here or be calculated on the fly
    // For now, let's just record it.

    return transaction;
  }

  async getMarketTrends() {
    return this.priceService.getMarketTrends();
  }
}
