const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const orders = await prisma.order.findMany({
    include: { user: true }
  });

  const broken = orders.filter(o => !o.user);

  console.log("Broken orders:", broken.length);

  for (const order of broken) {
    await prisma.order.update({
      where: { id: order.id },
      data: { userId: null }
    });
  }

  console.log("Fixed orphan orders");
}

run().catch(console.error);
