import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Testing production save...');
  try {
    const bet = await prisma.tipsterBet.create({
      data: {
        tipster: 'TEST_SAVE',
        event: 'Test Event',
        stake: 1.2222,
        odds: 1.2222,
        status: 'PENDING',
        userId: '36b71d57-b1b7-47fc-aacf-17b16120a42d', // I saw this ID in previous list
        amountWagered: 0
      }
    });
    console.log('Save successful:', bet.id);
  } catch (err) {
    console.error('Save failed:', err);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
