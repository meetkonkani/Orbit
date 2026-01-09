import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 6);

  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
