import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});
prisma
  .$connect()
  .then(() => {
    console.log('Prisma connected to the database.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

export default prisma;
