// app/products/[id]/page.tsx
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";
import { Product } from "@prisma/client";

// Define a clean interface for the serialized product
export interface SerializedProduct extends Omit<Product, 'price' | 'createdAt' | 'updatedAt'> {
  price: number;
  createdAt: string;
  updatedAt: string;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, NOT: { id } },
    take: 4,
  });

  const serialize = (p: any): SerializedProduct => ({
    ...p,
    price: Number(p.price),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  });

  return (
    <ProductPageClient 
      product={serialize(product)} 
      relatedProducts={related.map(serialize)} 
    />
  );
}