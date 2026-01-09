"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/auth";

export async function getUserOrders() {
  const session = await auth();
  if (!session?.user?.email) return { error: "AUTH_REQUIRED" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return { error: "USER_NOT_FOUND" };

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return { orders };
}
