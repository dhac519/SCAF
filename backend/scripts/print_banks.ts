import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
