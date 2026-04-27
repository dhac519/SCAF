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
        userId: 'f3eaad53-aaaa-46df-ac9e-212d34492cbd', // Valid user from DB
        amountWagered: 0
      }
    });
    console.log('Save successful:', bet.id);
  } catch (err) {
    console.error('Save failed:', err);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
