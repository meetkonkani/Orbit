"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { getUserOrders } from "@/app/actions/get-order";
import { Package, ChevronRight, MapPin, CreditCard, Settings } from "lucide-react";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders only if authenticated
    getUserOrders().then((res) => {
      // Change 2: Fixed variable name
      if (res?.orders) setOrders(res.orders);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white antialiased">
      <section className="max-w-[1200px] mx-auto pt-40 pb-32 px-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-baseline border-b border-black mb-20 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">
              Account<span className="font-black">.</span>
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
              Verified Agent / {session?.user?.name || "Access_Granted"}
            </p>
          </motion.div>

          <div className="flex gap-8 mt-8 md:mt-0">
            <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-all">
              Edit Profile
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-[10px] font-black uppercase tracking-widest text-red-500 border-b-2 border-red-500 pb-1 hover:opacity-50 transition-all"
            >
              Terminate Session
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* LEFT COLUMN: ORDER HISTORY */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-12">
               <Package size={16} />
               <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">
                 Acquisition_Archive
               </h2>
            </div>

            {loading ? (
              <p className="font-mono text-xs animate-pulse text-neutral-400">SYNCING_DATABASE...</p>
            ) : orders.length === 0 ? (
              <div className="border border-dashed border-black/20 p-16 text-center">
                <p className="text-sm font-mono text-neutral-500 mb-6 uppercase">No records found in this sector</p>
                <Link href="/shop" className="inline-block bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition">
                  Initialize Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-12">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ x: 5 }}
                    className="group border-b border-black/5 pb-8"
                  >
                    <Link href={`/orders/${order.id}`} className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                          ID: {order.id.slice(-8)} — {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <h3 className="text-2xl font-medium tracking-tight mt-1 group-hover:underline uppercase">
                          Order Details
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${(order.total / 100).toFixed(2)}</p>
                        <p className="text-[10px] font-black text-green-600 uppercase">{order.status}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: ACCOUNT INFO */}
          <div className="lg:col-span-5 space-y-16">
            <section className="p-8 bg-neutral-50 border border-black/5">
              <div className="flex items-center gap-4 mb-8">
                <MapPin size={16} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment_Address</h2>
              </div>
              <div className="text-sm leading-relaxed text-neutral-600 font-light">
                <p>{session?.user?.name}</p>
                <p>Sector 7G, Cyber District</p>
                <p>Neo-Tokyo, JP</p>
              </div>
              <button className="text-[9px] font-bold uppercase tracking-widest mt-6 underline hover:text-black transition-colors">
                Update Coordinates
              </button>
            </section>

            <section className="px-8">
              <div className="flex items-center gap-4 mb-8">
                <Settings size={16} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">System_Preferences</h2>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-black/5">
                    <span className="text-xs text-neutral-500">Email Notifications</span>
                    <span className="text-[10px] font-bold text-green-500 uppercase">Active</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-black/5">
                    <span className="text-xs text-neutral-500">Security Protocol</span>
                    <span className="text-[10px] font-bold uppercase">2FA_Enabled</span>
                 </div>
              </div>
            </section>
          </div>

        </div>
      </section>
    </main>
  );
}