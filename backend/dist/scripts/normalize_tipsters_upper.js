"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const bets = await prisma.tipsterBet.findMany();
    for (const bet of bets) {
        const upper = bet.tipster.trim().toUpperCase();
        if (bet.tipster !== upper) {
            await prisma.tipsterBet.update({
                where: { id: bet.id },
                data: { tipster: upper }
            });
        }
    }
    console.log('All tipsters normalized to UPPERCASE');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=normalize_tipsters_upper.js.map