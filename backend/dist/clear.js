"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.tipsterBet.deleteMany({});
    await prisma.tipsterBank.deleteMany({});
    console.log('Todos los datos fueron borrados exitosamente');
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=clear.js.map