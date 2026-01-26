const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const managers = [
    { name: 'Alice Manager', email: 'alice@buena.com' },
    { name: 'Bob Manager', email: 'bob@buena.com' },
  ];

  const accountants = [
    { name: 'Charlie Accountant', email: 'charlie@buena.com' },
    { name: 'Dave Accountant', email: 'dave@buena.com' },
  ];

  for (const m of managers) {
    await prisma.manager.create({ data: m });
  }

  for (const a of accountants) {
    await prisma.accountant.create({ data: a });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
