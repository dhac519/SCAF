import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
import { BetStatus } from '@prisma/client';

@Injectable()
export class BetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createBetDto: CreateBetDto) {
    return this.prisma.bet.create({
      data: {
        ...createBetDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.bet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const bet = await this.prisma.bet.findFirst({
      where: { id, userId },
    });
    if (!bet) throw new NotFoundException('Apuesta no encontrada');
    return bet;
  }

  async resolve(userId: string, id: string, resolveBetDto: ResolveBetDto) {
    const bet = await this.findOne(userId, id);
    if (bet.status !== BetStatus.PENDING) {
      throw new BadRequestException('La apuesta ya ha sido resuelta');
    }

    const stake = Number(bet.stake);
    const odds = Number(bet.odds);
    let result = null;

    if (resolveBetDto.status === BetStatus.WON) {
      result = (stake * odds) - stake; // Ganancia neta
    } else if (resolveBetDto.status === BetStatus.LOST) {
      result = -stake; // Pérdida total de lo apostado
    } else if (resolveBetDto.status === BetStatus.VOID) {
      result = 0; // Se devuelve el dinero, no hay ganancia ni pérdida
    }

    return this.prisma.bet.update({
      where: { id },
      data: {
        status: resolveBetDto.status,
        result,
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.bet.delete({
      where: { id },
    });
  }
}
