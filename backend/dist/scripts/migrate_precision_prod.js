"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting manual SQL migration for Tipster precision...');
    const queries = [
        `ALTER TABLE "TipsterBet" ALTER COLUMN stake TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBet" ALTER COLUMN odds TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBet" ALTER COLUMN "unitsProfit" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBet" ALTER COLUMN "amountWagered" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBet" ALTER COLUMN "realProfit" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBet" ALTER COLUMN "cumulativeBalance" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBank" ALTER COLUMN "initialBank" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBank" ALTER COLUMN "currentBank" TYPE numeric(20, 8);`,
        `ALTER TABLE "TipsterBank" ALTER COLUMN "unitValue" TYPE numeric(20, 8);`
    ];
    for (const q of queries) {
        try {
            console.log(`Executing: ${q}`);
            await prisma.$executeRawUnsafe(q);
            console.log('Success.');
        }
        catch (err) {
            console.error(`Error executing query: ${q}`);
            console.error(err.message);
        }
    }
    console.log('Manual migration finished.');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=migrate_precision_prod.js.map