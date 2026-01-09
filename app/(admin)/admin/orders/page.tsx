import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { deleteOrder } from "@/app/actions/admin";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((acc, curr) => acc + Number(curr.total), 0);
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="p-8 text-white min-h-screen bg-black font-sans">
      {/* WORLD CLASS TOP BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
        <div>
          <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
            Archive.
          </h1>
          <div className="flex gap-4 mt-4">
            <span className="text-[10px] border border-white/20 px-2 py-1 font-mono">SYS_VER: 4.0.1</span>
            <span className="text-[10px] border border-white/20 px-2 py-1 font-mono text-green-500">LIVE_SYNC: ON</span>
          </div>
        </div>

        <div className="flex gap-12 border-l border-white/10 pl-12">
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Gross_Revenue</p>
            <p className="text-3xl font-bold italic">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Active_Inquiries</p>
            <p className="text-3xl font-bold italic">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* ADVANCED DATA GRID */}
      <div className="w-full overflow-hidden border border-white/5 bg-zinc-950">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-zinc-900/50 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
          <div className="col-span-2">ID_Reference</div>
          <div className="col-span-3">Entity_Email</div>
          <div className="col-span-2">Volume</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-2">Protocol_Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-white/5">
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/[0.02] transition-all group">
              <div className="col-span-2 font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">
                {order.id.slice(-8).toUpperCase()}
              </div>
              
              <div className="col-span-3 text-xs font-bold truncate pr-4 uppercase tracking-tight">
                {order.user?.email || "GUEST_USER"}
              </div>

              <div className="col-span-2 text-xs text-zinc-500">
                {order.items.length} Units
              </div>

              <div className="col-span-2 text-sm font-bold italic text-white">
                ₹{Number(order.total).toLocaleString()}
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                  order.status === 'PAID' ? 'bg-green-500' : 
                  order.status === 'SHIPPED' ? 'bg-blue-500' : 'bg-zinc-700'
                }`} />
                <span className="text-[10px] font-black tracking-widest uppercase">{order.status}</span>
              </div>

              <div className="col-span-1 flex justify-end gap-6">
                <Link href={`/admin/orders/${order.id}`} className="hover:scale-110 transition-transform">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white"><path d="M8.293 2.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L10.586 6H2a1 1 0 010-2h8.586L8.293 3.707a1 1 0 010-1.414z" fill="currentColor"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}