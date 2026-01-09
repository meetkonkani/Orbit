const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  await prisma.order.create({
    data: {
      userId: "000000000000000000000000",
      total: 1,
      status: "PENDING",
      paymentMethod: "COD",
      paymentId: null,
    }
  });

  console.log("PASS: paymentId works");
}

test().catch(console.error);
