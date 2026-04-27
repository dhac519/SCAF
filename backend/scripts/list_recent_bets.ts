import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const bets = await prisma.tipsterBet.findMany({
    take: 5,
    orderBy: { date: 'desc' }
  });
  console.log('Recent Bets in DB:', JSON.stringify(bets, null, 2));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
