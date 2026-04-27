import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { BetsModule } from './modules/bets/bets.module';

import { CollectionsModule } from './modules/collections/collections.module';
import { AdminModule } from './modules/admin/admin.module';
import { SummaryModule } from './modules/summary/summary.module';
import { TipstersModule } from './modules/tipsters/tipsters.module';
import { WikiModule } from './modules/wiki/wiki.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, WalletsModule, CategoriesModule, TransactionsModule, InvestmentsModule, BetsModule, CollectionsModule, AdminModule, SummaryModule, TipstersModule, WikiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
