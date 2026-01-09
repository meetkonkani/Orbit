"use server";

import Razorpay from "razorpay";
import { nanoid } from "nanoid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function initiatePayment(amount: number) {
  try {
    const options = {
      amount: amount * 100, // Razorpay works in paise (100 paise = 1 INR)
      currency: "INR",
      receipt: `receipt_${nanoid()}`,
    };

    const order = await razorpay.orders.create(options);
    return { orderId: order.id, amount: order.amount };
  } catch (error) {
    console.error("RAZORPAY_INIT_ERROR:", error);
    return { error: "Failed to initiate payment" };
  }
}