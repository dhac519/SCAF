"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.findFirst();
    if (!user) {
        console.log('No user found');
        return;
    }
    const userId = user.id;
    await prisma.tipsterBank.upsert({
        where: { userId },
        update: {},
        create: {
            userId,
            initialBank: 100000,
            currentBank: 100000,
            unitValue: 100,
        }
    });
    await prisma.tipsterBet.create({
        data: {
            userId,
            tipster: 'Test',
            event: 'Bet A',
            status: 'WON',
            stake: 1,
            odds: 2.0,
            amountWagered: 100,
            realProfit: 100,
            unitsProfit: 1,
            date: new Date('2026-04-10T10:00:00Z'),
        }
    });
    await prisma.tipsterBet.create({
        data: {
            userId,
            tipster: 'Test',
            event: 'Bet B',
            status: 'LOST',
            stake: 0.5,
            odds: 2.0,
            amountWagered: 50,
            realProfit: -50,
            unitsProfit: -0.5,
            date: new Date('2026-04-12T10:00:00Z'),
        }
    });
    await prisma.tipsterBet.create({
        data: {
            userId,
            tipster: 'Test',
            event: 'Bet C',
            status: 'WON',
            stake: 2,
            odds: 2.0,
            amountWagered: 200,
            realProfit: 200,
            unitsProfit: 2,
            date: new Date('2026-04-11T10:00:00Z'),
        }
    });
    console.log('Test bets added');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=test_recalculation.js.map