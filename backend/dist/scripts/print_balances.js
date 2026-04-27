"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const bets = await prisma.tipsterBet.findMany({
        orderBy: { date: 'asc' }
    });
    console.table(bets.map(b => ({
        date: b.date.toISOString(),
        event: b.event,
        profit: b.realProfit?.toString(),
        cumulative: b.cumulativeBalance?.toString()
    })));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=print_balances.js.map