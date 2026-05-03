import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNetOpsCommandDto } from './dto/create-netops-command.dto';
import { UpdateNetOpsCommandDto } from './dto/update-netops-command.dto';

@Injectable()
export class NetopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createNetOpsCommandDto: CreateNetOpsCommandDto) {
    return this.prisma.netOpsCommand.create({
      data: {
        ...createNetOpsCommandDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.netOpsCommand.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const command = await this.prisma.netOpsCommand.findFirst({
      where: { id, userId },
    });

    if (!command) {
      throw new NotFoundException(`Command with ID ${id} not found`);
    }

    return command;
  }

  async update(
    id: string,
    userId: string,
    updateNetOpsCommandDto: UpdateNetOpsCommandDto,
  ) {
    await this.findOne(id, userId); // Verify ownership and existence

    return this.prisma.netOpsCommand.update({
      where: { id },
      data: updateNetOpsCommandDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // Verify ownership and existence

    return this.prisma.netOpsCommand.delete({
      where: { id },
    });
  }
}
