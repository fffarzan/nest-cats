import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  // const cat = await prisma.cat.create({
  //   data: {
  //     id: 1,
  //     name: 'Fred',
  //     age: 3,
  //     breed: 'Scottish'
  //   }
  // })
  // console.log(cat)
  const cats = await prisma.cat.findMany()
  console.log(cats)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })