import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
