"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const tipsters_service_1 = require("../src/modules/tipsters/tipsters.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const service = app.get(tipsters_service_1.TipstersService);
    const users = await service['prisma'].user.findMany();
    for (const user of users) {
        console.log(`Recalculating for user ${user.email}...`);
        await service.recalculateBalances(user.id, service.prisma);
    }
    console.log('Recalculation complete');
    await app.close();
}
bootstrap();
//# sourceMappingURL=trigger_recalculation.js.map