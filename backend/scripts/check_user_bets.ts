import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const bets = await prisma.tipsterBet.findMany({
    where: { userId: '36b71d57-b1b7-47fc-aacf-17b16120a42d' },
    orderBy: { date: 'asc' }
  });
  console.table(bets.map(b => ({
    date: b.date.toISOString(),
    event: b.event,
    tipster: b.tipster,
    profit: b.realProfit?.toString()
  })));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
