import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  // 1. HMAC Signature Verification
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  try {
    // 2. ATOMIC TRANSACTION: Ensuring Database Consistency
    // This prevents "Double-spending" or stock errors
    const updatedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirst({
        where: { paymentId: razorpay_order_id },
        include: { items: true },
      });

      if (!order) throw new Error("ORDER_NOT_FOUND");
      
      // If already paid (webhook might have beat us to it), just return the order
      if (order.status === "PAID") return order;

      // Update Order Status
      const updated = await tx.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });

      // Synchronize Inventory
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return updated;
    });

    // 3. TRIGGER AUTOMATED NOIR MANIFEST (Email)
    // We do this AFTER the transaction is successful
    if (updatedOrder) {
      try {
        await fetch(`${process.env.NEXTAUTH_URL}/api/send-order-mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: updatedOrder.shippingEmail, // From your updated schema
            orderId: updatedOrder.id,
            total: updatedOrder.total,
          }),
        });
      } catch (mailErr) {
        // We don't fail the response if mail fails, but we log it
        console.error("POST_PAYMENT_MAIL_ERROR:", mailErr);
      }
    }

    return NextResponse.json({ verified: true });
  } catch (err: any) {
    console.error("VERIFY_DB_ERROR:", err);
    return NextResponse.json(
      { verified: true, dbError: err.message || "SYNC_ISSUE" },
      { status: 500 }
    );
  }
}