"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Clearing cached plans in Postgres...');
    try {
        await prisma.$executeRawUnsafe('DISCARD ALL;');
        console.log('Success. Cached plans cleared.');
    }
    catch (err) {
        console.error('Failed to clear plans:', err);
    }
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=clear_cached_plans.js.map