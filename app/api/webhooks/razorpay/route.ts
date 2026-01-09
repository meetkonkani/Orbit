import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  // 1. Verify the webhook signature (Security Protocol)
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  // 2. Handle successful payment event
  if (event.event === "order.paid") {
    const paymentEntity = event.payload.payment.entity;
    const razorpayOrderId = paymentEntity.order_id;

    // Find the pending order in our database
    const order = await prisma.order.findFirst({
      where: { paymentId: razorpayOrderId },
      include: { items: true },
    });

    if (!order) return new NextResponse("Order not found", { status: 404 });
    if (order.status === "PAID") return new NextResponse("Already processed");

    try {
      // 3. ATOMIC TRANSACTION: Update Status + Synchronize Stock
      await prisma.$transaction(async (tx) => {
        // Mark Order as PAID
        await tx.order.update({
          where: { id: order.id },
          data: { status: "PAID" },
        });

        // Loop through items to decrement inventory stock
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity, 
              },
            },
          });
        }
      });

      // 4. TRIGGER NOIR ACQUISITION EMAIL
      // Use shippingEmail from the order model (synced from schema)
      const recipientEmail = order.shippingEmail;

      if (recipientEmail) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/send-order-mail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: recipientEmail,
              orderId: order.id,
              total: order.total
            }),
          });
        } catch (mailError) {
          console.error("WEBHOOK_MAIL_DISPATCH_FAILED:", mailError);
        }
      }

      return NextResponse.json({ success: true });

    } catch (error) {
      console.error("TRANSACTION_FAILED:", error);
      return new NextResponse("Internal Database Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}