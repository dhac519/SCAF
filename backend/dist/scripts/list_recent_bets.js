"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const bets = await prisma.tipsterBet.findMany({
        take: 5,
        orderBy: { date: 'desc' }
    });
    console.log('Recent Bets in DB:', JSON.stringify(bets, null, 2));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=list_recent_bets.js.map