const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const products = await prisma.product.findMany();

  for (const p of products) {
    if (typeof p.price !== "number") {
      const clean = Number(p.price);
      console.log("Fixing:", p.title, p.price, "=>", clean);

      await prisma.product.update({
        where: { id: p.id },
        data: { price: clean }
      });
    }
  }

  console.log("✅ PRICE NORMALIZATION COMPLETE");
  process.exit();
}

run().catch(console.error);
