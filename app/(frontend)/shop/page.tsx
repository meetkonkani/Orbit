// No changes required to the logic, just ensure it points to the new ShopClient
import { prisma } from "@/app/lib/prisma";
import ShopClient from "./ShopClient";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category ?? "ALL";

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedProducts = products.map((p) => ({
    id: String(p.id),
    title: p.title,
    description: p.description ?? "",
    category: p.category,
    images: Array.isArray(p.images) ? p.images : [],
    stock: Number(p.stock),
    price: Number(p.price),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <ShopClient
      initialProducts={serializedProducts}
      initialCategory={category}
    />
  );
}