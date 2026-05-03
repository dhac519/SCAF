import { Module } from '@nestjs/common';
import { NetopsService } from './netops.service';
import { NetopsController } from './netops.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NetopsController],
  providers: [NetopsService],
})
export class NetopsModule {}
