import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT column_name, data_type, numeric_precision, numeric_scale
    FROM information_schema.columns
    WHERE table_name = 'TipsterBet' AND column_name IN ('stake', 'odds');
  `;
  console.log('Database Columns Info:', JSON.stringify(result, null, 2));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
