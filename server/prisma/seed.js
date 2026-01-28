const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean up existing data
  await prisma.unit.deleteMany();
  await prisma.building.deleteMany();
  await prisma.property.deleteMany();
  await prisma.manager.deleteMany();
  await prisma.accountant.deleteMany();

  console.log('🗑️  Cleared existing data.');

  // Create Managers
  const manager1 = await prisma.manager.create({
    data: { name: 'Sarah Miller', email: 'sarah.miller@example.com' }
  });
  const manager2 = await prisma.manager.create({
    data: { name: 'James Wilson', email: 'james.wilson@example.com' }
  });

  // Create Accountants
  const accountant1 = await prisma.accountant.create({
    data: { name: 'Robert Chen', email: 'robert.chen@finance.com' }
  });
  const accountant2 = await prisma.accountant.create({
    data: { name: 'Emily Davis', email: 'emily.davis@finance.com' }
  });

  // Property 1: Residential Complex in Berlin (WEG)
  await prisma.property.create({
    data: {
      name: 'Sunset Residences Berlin',
      type: 'WEG',
      managerName: manager1.name,
      accountantName: accountant1.name,
      buildings: {
        create: [
            {
                street: 'Hauptstraße',
                number: '12',
                zip: '10827',
                city: 'Berlin',
                country: 'Germany',
                description: 'Main residential building with front garden.',
                units: {
                    create: [
                        { type: 'Apartment', number: '1.01', floor: 1, entrance: 'A', rooms: 3, size: 85.5, constructionYear: 2020, coOwnershipShare: 12.5 },
                        { type: 'Apartment', number: '1.02', floor: 1, entrance: 'A', rooms: 2, size: 60.0, constructionYear: 2020, coOwnershipShare: 9.0 },
                        { type: 'Apartment', number: '2.01', floor: 2, entrance: 'A', rooms: 4, size: 110.0, constructionYear: 2020, coOwnershipShare: 15.0 },
                    ]
                }
            },
            {
                street: 'Hauptstraße',
                number: '12a',
                zip: '10827',
                city: 'Berlin',
                country: 'Germany',
                description: 'Rear building, quieter side.',
                units: {
                    create: [
                         { type: 'Apartment', number: '3.01', floor: 0, entrance: 'B', rooms: 2, size: 55.0, constructionYear: 2021, coOwnershipShare: 8.5 }
                    ]
                }
            }
        ]
      }
    }
  });

  // Property 2: Commercial Center Munich (MV)
  await prisma.property.create({
    data: {
      name: 'Munich Tech Hub',
      type: 'MV',
      managerName: manager2.name,
      accountantName: accountant2.name,
      buildings: {
        create: [
            {
                street: 'Leopoldstraße',
                number: '254',
                zip: '80807',
                city: 'Munich',
                country: 'Germany',
                description: 'Modern office complex with underground parking.',
                units: {
                    create: [
                        { type: 'Office', number: 'O-01', floor: 1, rooms: 10, size: 350.0, constructionYear: 2018 },
                        { type: 'Office', number: 'O-02', floor: 2, rooms: 12, size: 400.0, constructionYear: 2018 },
                        { type: 'Parking', number: 'P-01', floor: -1, rooms: 0, size: 12.5, constructionYear: 2018 },
                        { type: 'Parking', number: 'P-02', floor: -1, rooms: 0, size: 12.5, constructionYear: 2018 },
                    ]
                }
            }
        ]
      }
    }
  });

  // Property 3: Mixed Use Hamburg
  await prisma.property.create({
    data: {
      name: 'HafenCity Mixed Use',
      type: 'WEG',
      managerName: manager1.name,
      accountantName: accountant2.name,
      buildings: {
        create: [
            {
                street: 'Am Sandtorkai',
                number: '48',
                zip: '20457',
                city: 'Hamburg',
                country: 'Germany',
                description: 'Luxury apartments with ground floor retail.',
                units: {
                    create: [
                        { type: 'Commercial', number: 'C-01', floor: 0, entrance: 'Main', rooms: 1, size: 120.0, constructionYear: 2022 },
                        { type: 'Apartment', number: '1.01', floor: 1, entrance: 'Side', rooms: 3, size: 95.0, constructionYear: 2022, coOwnershipShare: 14.2 },
                    ]
                }
            }
        ]
      }
    }
  });

   // Property 4: Single Family Home (Rental)
   await prisma.property.create({
    data: {
      name: 'Villa Grünewald',
      type: 'MV',
      managerName: manager2.name,
      accountantName: accountant1.name,
      buildings: {
        create: [
            {
                street: 'Koenigsallee',
                number: '14',
                zip: '14193',
                city: 'Berlin',
                country: 'Germany',
                description: 'Historical villa, fully renovated.',
                units: {
                    create: [
                        { type: 'Apartment', number: 'Whole House', floor: 0, rooms: 8, size: 280.0, constructionYear: 1910 }
                    ]
                }
            }
        ]
      }
    }
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
