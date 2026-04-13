import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando actualización de módulos para usuarios existentes...');
  
  const modules = ["FINANCE", "BETS", "INVESTMENTS", "COLLECTIONS"];
  
  const result = await prisma.user.updateMany({
    data: {
      modules: {
        set: modules
      }
    }
  });
  
  console.log(`Actualizados ${result.count} usuarios.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
