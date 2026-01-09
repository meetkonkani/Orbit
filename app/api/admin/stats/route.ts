import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const session = await auth();

  // 🔐 Extra safety (API protection)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalOrders,
    pendingOrders,
    deliveredOrders,
    revenueResult,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.aggregate({
      _sum: { total: true },
    }),
  ]);

  return NextResponse.json({
    totalOrders,
    pendingOrders,
    deliveredOrders,
    revenue: revenueResult._sum.total || 0,
  });
}
