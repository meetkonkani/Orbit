import { prisma } from "@/app/lib/prisma";
import AdminStats from "@/app/components/admin/AdminStats";
import { auth } from "@/app/auth";

export default async function AdminDashboard() {
  // 1. Security Clearance Check
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return <div className="p-20 text-red-500 font-mono tracking-widest">ACCESS_DENIED: UNAUTHORIZED_ENTITY</div>;
  }

  // 2. Fetch High-Level Metrics
  const stats = await prisma.order.aggregate({
    _sum: { total: true },
    _count: { id: true },
    where: { status: "PAID" }
  });

  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();

  // 3. FEATURE_LOAD: Bestseller Intelligence
  const bestSellers = await prisma.orderItem.groupBy({
    by: ['productId', 'title', 'image'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });

  // 4. FEATURE_LOAD: Critical Stock Alerts
  const criticalStock = await prisma.product.findMany({
    where: { stock: { lte: 5 } },
    select: { id: true, title: true, stock: true },
    take: 5
  });

  return (
    <div className="p-8 md:p-12 text-white bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-12">
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.5em] mb-4">// SYSTEM_ANALYTICS</p>
          <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Command.</h1>
        </div>
      </div>

      <AdminStats stats={{
        orders: stats._count.id,
        users: userCount,
        products: productCount,
        revenue: stats._sum.total || 0
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* BESTSELLERS MANIFEST */}
        <div className="lg:col-span-8 border border-white/10 bg-zinc-950/50 p-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-10 italic">// TOP_PERFORMING_UNITS</h3>
          <div className="space-y-6">
            {bestSellers.map((item, idx) => (
  <div key={`${item.productId}-${idx}`} className="flex justify-between items-center group border-b border-white/5 pb-4">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-mono text-neutral-700">0{idx + 1}</span>
                  <div className="w-10 h-12 bg-neutral-900 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                     {item.image && <img src={item.image} alt="" className="object-cover w-full h-full" />}
                  </div>
                  <span className="text-lg font-bold uppercase italic group-hover:text-white transition-colors">{item.title}</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-xs font-mono text-white italic">{item._sum.quantity} UNITS_ACQUIRED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRITICAL INVENTORY ALERTS */}
        <div className="lg:col-span-4 border border-red-500/20 bg-red-500/5 p-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-10 italic">// STOCK_CRITICAL</h3>
          <div className="space-y-6">
            {criticalStock.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-xs font-bold uppercase italic">{item.title}</span>
                <span className="text-xs font-mono text-red-400">{item.stock} LEFT</span>
              </div>
            ))}
            {criticalStock.length === 0 && <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">All units stable</p>}
          </div>
        </div>
      </div>
    </div>
  );
}