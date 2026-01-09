import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { category: true, images: true },
    });

    const grouped: Record<string, any> = {};

    products.forEach(p => {
      if (!grouped[p.category]) {
        grouped[p.category] = {
          name: p.category,
          slug: p.category.toLowerCase().replace(/\s+/g, "-"),
          images: p.images?.slice(0, 3) || [],
        };
      }
    });

    return NextResponse.json(Object.values(grouped));
  } catch (e) {
    console.error("CATEGORY_API_ERROR:", e);
    return NextResponse.json([]);
  }
}
