"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/auth";

export async function getOrderById(orderId: string) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return { error: "User not found" };

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: { items: true },
  });

  if (!order) return { error: "Order not found" };

  return { order };
}
