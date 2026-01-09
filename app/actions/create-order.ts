"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/auth";
import Razorpay from "razorpay";
import { nanoid } from "nanoid";
import type { CartItem } from "@/app/context/CartContext";
import { transporter } from "@/app/lib/mailer";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/* ==================== INITIATE PAYMENT ==================== */
export async function initiatePayment(total: number) {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `rcpt_${nanoid(10)}`,
    });

    return { orderId: order.id, amount: order.amount };
  } catch (err) {
    console.error("RAZORPAY_INIT_ERROR", err);
    return { error: "PAYMENT_INIT_FAILED" };
  }
}

/* ==================== CREATE ORDER ==================== */
export async function createOrder(
  cart: CartItem[],
  total: number,
  shipping: {
    name: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
  },
  paymentMethod: "RAZORPAY" | "COD",
  paymentId?: string
) {
  const session = await auth();
  if (!session?.user?.email) return { error: "AUTH_REQUIRED" };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "USER_NOT_FOUND" };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: paymentMethod === "COD" ? "PENDING" : "PAID",
          paymentMethod,
          paymentId: paymentId ?? null,
          shippingName: shipping.name,
          shippingPhone: shipping.phone,
          shippingAddress: shipping.address,
          shippingCity: shipping.city,
          shippingPincode: shipping.pincode,
          items: {
            create: cart.map((i) => ({
              productId: String(i.id),
              title: i.title,
              price: i.price,
              size: i.size,
              quantity: i.quantity,
              image: i.image,
            })),
          },
        },
      });

      for (const item of cart) {
        await tx.product.update({
          where: { id: String(item.id) },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    // 📧 SEND EMAIL SAFELY
    try {
      await transporter.sendMail({
        from: `"3DX Store" <${process.env.MAIL_USER}>`,
        to: user.email!,
        subject: "Your 3DX Order Is Confirmed",
        html: `
          <div style="font-family: Arial; max-width:600px; margin:auto; border:1px solid #eee; padding:24px">
            <h2>Order Confirmed</h2>
            <p>Hi ${user.name || "Customer"},</p>
            <p>Your order has been successfully placed.</p>
            <hr/>
            <p><strong>Order ID:</strong> ${result.id}</p>
            <p><strong>Total:</strong> ₹${total}</p>
            <p style="margin-top:24px">Thank you for shopping with <b>3DX</b>.</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error("MAIL_SEND_FAILED", mailErr);
    }

    return { success: true, orderId: result.id };
  } catch (error) {
    console.error("ORDER_TRANSACTION_ERROR", error);
    return { error: "ORDER_PROCESSING_FAILED" };
  }
}
