"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { utapi } from "../api/uploadthing/core";

export type ActionResult = {
  success?: boolean;
  error?: string;
};

/* ==================== PRODUCT ==================== */

export async function createProduct(data: any): Promise<ActionResult> {
  try {
    const price = Number(data.price) || 0;

    await prisma.product.create({
      data: {
        title: data.title,
        description: data.description ?? "",
        price,
        category: data.category,
        stock: Number(data.stock) || 0,
        images: data.images ?? [],
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR:", error);
    return { error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: any): Promise<ActionResult> {
  try {
    const price = Number(data.price) || 0;

    await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        price,
        stock: Number(data.stock) || 0,
        description: data.description ?? "",
        images: data.images ?? [],
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("UPDATE_PRODUCT_ERROR:", error);
    return { error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    const images: string[] = product?.images ?? [];

    if (images.length > 0) {
      const fileKeys: string[] = images.flatMap((url) => {
        if (!url) return [];
        const key = url.split("/").pop();
        return key ? [key] : [];
      });

      if (fileKeys.length > 0) {
        await utapi.deleteFiles(fileKeys);
      }
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR:", error);
    return { error: "Failed to delete product" };
  }
}

export async function deleteImageFromUT(url: string) {
  try {
    const key = url.split("/").pop();
    if (key) await utapi.deleteFiles(key);
    return { success: true };
  } catch {
    return { error: "Failed to remove image" };
  }
}

/* ==================== ORDERS ==================== */

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });

  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: string) {
  try {
    await prisma.orderItem.deleteMany({ where: { orderId } });
    await prisma.order.delete({ where: { id: orderId } });

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("DELETE_ORDER_ERROR:", error);
    return { error: "Failed to delete order" };
  }
}

/* ==================== USERS ==================== */

export async function toggleUserRole(userId: string, currentRole: string) {
  const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole as any },
  });

  revalidatePath("/admin/users");
}
