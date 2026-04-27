import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TipstersService } from '../src/modules/tipsters/tipsters.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(TipstersService);
  
  const users = await service['prisma'].user.findMany();
  for (const user of users) {
    console.log(`Recalculating for user ${user.email}...`);
    // Need to access private method or just call a public one that triggers it
    await (service as any).recalculateBalances(user.id, (service as any).prisma);
  }
  
  console.log('Recalculation complete');
  await app.close();
}

bootstrap();
