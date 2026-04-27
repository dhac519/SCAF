import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing cached plans in Postgres...');
  try {
    await prisma.$executeRawUnsafe('DISCARD ALL;');
    console.log('Success. Cached plans cleared.');
  } catch (err) {
    console.error('Failed to clear plans:', err);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
