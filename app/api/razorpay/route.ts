import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/app/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { cart, userId, shippingDetails } = await req.json();

    // 1. Validate Cart Status
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "CART_EMPTY" }, { status: 400 });
    }

    // 2. FEATURE: Real-time Stock Verification
    // Prevents payment initiation if stock was depleted while the user was browsing.
    for (const item of cart) {
      const product = await prisma.product.findUnique({ 
        where: { id: item.productId } 
      });
      
      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ 
          error: `OUT_OF_STOCK: ${item.title}` 
        }, { status: 400 });
      }
    }

    const total = cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity, 
      0
    );

    // 3. Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // Razorpay expects sub-units (paise)
      currency: "INR",
    });

    // 4. FEATURE LOAD: Immediate Database Synchronization
    // Creates a PENDING record so the order exists even if the user drops off mid-payment.
    await prisma.order.create({
      data: {
        userId: userId,
        total: total,
        paymentId: razorpayOrder.id, // Maps local order to Razorpay ID
        status: "PENDING",
        shippingName: shippingDetails.name,
        shippingEmail: shippingDetails.email, // Now synced with schema
        shippingAddress: shippingDetails.address,
        shippingCity: shippingDetails.city,
        shippingPhone: shippingDetails.phone,
        items: {
          create: cart.map((item: any) => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            size: item.size,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
    });

    return NextResponse.json(razorpayOrder);
  } catch (err) {
    console.error("RAZORPAY_ORDER_ERROR:", err);
    return NextResponse.json({ error: "RAZORPAY_DOWN" }, { status: 500 });
  }
}