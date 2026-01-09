"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { createOrder, initiatePayment } from "@/app/actions/create-order";
import { useEffect, useState } from "react";

type ShippingData = {
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
};

export default function CheckoutPage() {
  const { cart, isLoaded } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shippingData, setShippingData] = useState<ShippingData>({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    if (isLoaded && cart.length === 0 && !isPlacingOrder) {
      router.replace("/cart");
    }
  }, [isLoaded, cart, isPlacingOrder, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    if (!shippingData.name || !shippingData.address || !shippingData.phone) {
      setError("PLEASE_FILL_REQUIRED_FIELDS");
      return;
    }

    setIsPlacingOrder(true);
    setError(null);

    try {
      // ---------------- COD FLOW ----------------
      if (paymentMethod === "COD") {
        const res = await createOrder(cart, total, shippingData, "COD");
        if (res?.error) throw new Error(res.error);
        router.push(`/success?orderId=${res.orderId}`);
        return;
      }

      // ---------------- RAZORPAY FLOW ----------------
      const payment = await initiatePayment(total);
      if (payment.error) throw new Error(payment.error);

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payment.amount,
        currency: "INR",
        order_id: payment.orderId,
        name: "3DX PARTICLES",

        handler: async (response: any) => {
          const res = await createOrder(
            cart,
            total,
            shippingData,
            "RAZORPAY",
            response.razorpay_payment_id
          );

          if (res?.error) throw new Error(res.error);
          router.push(`/success?orderId=${res.orderId}`);
        },

        modal: { ondismiss: () => setIsPlacingOrder(false) },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      setError("CHECKOUT_FAILED");
      setIsPlacingOrder(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Loading checkout...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-20 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-black italic uppercase mb-12">Checkout</h1>

        {/* SHIPPING DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {["name", "phone", "city", "pincode", "address"].map((field) => (
            <input
              key={field}
              name={field}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="bg-white/5 border border-white/10 p-4 text-xs font-mono"
            />
          ))}
        </div>

        {/* PAYMENT METHOD */}
        <div className="mb-10 space-y-2">
          <p className="text-xs font-mono uppercase">Payment Method</p>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("RAZORPAY")}
              className={`px-6 py-3 border ${
                paymentMethod === "RAZORPAY" ? "bg-white text-black" : "border-white/20"
              }`}
            >
              Razorpay
            </button>

            <button
              onClick={() => setPaymentMethod("COD")}
              className={`px-6 py-3 border ${
                paymentMethod === "COD" ? "bg-white text-black" : "border-white/20"
              }`}
            >
              Cash On Delivery
            </button>
          </div>
        </div>

        {error && <p className="mb-6 text-red-500 text-xs font-mono">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full py-6 bg-white text-black font-black uppercase tracking-widest"
        >
          {isPlacingOrder ? "PROCESSING..." : "PLACE ORDER"}
        </button>
      </div>
    </main>
  );
}
