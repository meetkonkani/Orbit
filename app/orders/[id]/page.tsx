"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getOrderById } from "@/app/actions/get-order-by-id"; // ✅ Fixed import
import CustomCursor from "@/app/components/CustomCursor"; // Use absolute path
import Link from "next/link";

interface OrderItem {
  id: string;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string | Date;
  items: OrderItem[];
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params?.id as string;

  useEffect(() => {
    if (!id) {
      router.replace("/dashboard");
      return;
    }

    getOrderById(id).then((res) => {
      if (res?.error) {
        console.error("Order error:", res.error);
        router.replace("/dashboard");
        return;
      }
      if (res?.order) {
        setOrder(res.order);
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Fetch failed:", error);
      router.replace("/dashboard");
      setLoading(false);
    });
  }, [id, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white font-mono text-xs uppercase tracking-widest">
        Loading_Order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white font-mono text-xs uppercase tracking-widest">
        Order not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-20 pt-32 pb-20">
      {/* If CustomCursor doesn't exist, remove or comment this line */}
      {/* <CustomCursor /> */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-12 border-b border-white/10 pb-6">
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            Order #{order.id.slice(-6)}
          </p>
          <h1 className="text-5xl font-bold tracking-tighter uppercase mt-2">
            Order Details
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-2">
            Status: {order.status}
          </p>
        </div>

        {/* ITEMS */}
        <div className="space-y-6 mb-12">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-white/10 pb-4"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-cover border border-white/10"
                />
                <div>
                  <p className="font-medium uppercase">{item.title}</p>
                  <p className="text-xs font-mono text-neutral-500">
                    Size {item.size} × {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-mono">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-6 mb-12">
          <span>Total</span>
          <span className="font-mono">₹{order.total}</span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between">
          <Link
            href="/dashboard"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Placed on {new Date(order.createdAt).toDateString()}
          </span>
        </div>
      </motion.div>
    </main>
  );
}