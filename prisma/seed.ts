import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create a dummy user
  const user = await prisma.users.upsert({
    where: { email: 'dev@jun-oro.com' },
    update: {},
    create: {
      id: 'cl-dev-user-001', // Using a fixed ID for predictability
      email: 'dev@jun-oro.com',
      username: 'dev',
      password: 'password123', // In a real app, this should be hashed
      firstName: 'Dev',
      lastName: 'User',
      updatedAt: new Date(),
    },
  });

  // Create the 'Arkade' application
  const arkade = await prisma.applications.upsert({
    where: { id: 'cl-app-arkade-001' }, // Use ID for unique where clause
    update: {},
    create: {
      id: 'cl-app-arkade-001', // Using a fixed ID
      name: 'Arkade',
      description: 'Retro oyun platformu',
      domain: 'arkade.jun-oro.com',
      userId: user.id,
      icon: '🎮', // Simple emoji icon
      updatedAt: new Date(),
    },
  });

  console.log(`Seeding finished.`);
  console.log({ user, arkade });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
