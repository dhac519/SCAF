"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const banks = await prisma.tipsterBank.findMany();
    console.table(banks.map(b => ({
        userId: b.userId,
        initial: b.initialBank.toString(),
        current: b.currentBank.toString(),
        unit: b.unitValue.toString()
    })));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=print_banks.js.map