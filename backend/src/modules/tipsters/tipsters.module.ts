import { Module } from '@nestjs/common';
import { TipstersService } from './tipsters.service';
import { TipstersController } from './tipsters.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TipstersController],
  providers: [TipstersService],
})
export class TipstersModule {}
