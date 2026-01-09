import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { updateOrderStatus, deleteOrder } from "@/app/actions/admin";
import { Truck, Package, CreditCard, User, MapPin, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) return notFound();

  // Color Mapping for Technical Badges
  const statusStyles: any = {
    PENDING: "border-amber-500/40 text-amber-500 bg-amber-500/5",
    PAID: "border-emerald-500/40 text-emerald-500 bg-emerald-500/5",
    SHIPPED: "border-blue-500/40 text-blue-500 bg-blue-500/5",
    DELIVERED: "border-zinc-500 text-zinc-500 bg-zinc-500/5",
    CANCELLED: "border-red-500 text-red-500 bg-red-500/5",
  };

  return (
    <div className="p-8 md:p-16 bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      
      {/* 1. HEADER SECTION: THE MANIFEST IDENTITY */}
      <div className="border-b border-white/10 pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.5em] mb-4">// ORDER_VERIFICATION_MANIFEST</p>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            {order.id.slice(-6)}
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">Current_Protocol_Status</p>
            <div className={`px-6 py-2 border text-xs font-black uppercase tracking-widest ${statusStyles[order.status]}`}>
              {order.status}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* 2. LEFT: LOGISTICS & TRANSACTION DATA */}
        <div className="lg:col-span-4 space-y-16">
          
          {/* USER IDENTITY */}
          <section>
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-3 italic">
              <User size={14} className="text-neutral-700" /> [01] USER_CREDENTIALS
            </h3>
            <div className="space-y-1">
              <p className="text-2xl font-black italic uppercase">{order.shippingName}</p>
              <p className="text-xs font-mono text-neutral-500 lowercase">{order.shippingEmail}</p>
              <p className="text-xs font-mono text-neutral-500">{order.shippingPhone}</p>
            </div>
          </section>

          {/* SHIPPING COORDINATES */}
          <section>
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-3 italic">
              <MapPin size={14} className="text-neutral-700" /> [02] TARGET_COORDINATES
            </h3>
            <div className="text-xs leading-relaxed uppercase font-medium tracking-tight text-neutral-400">
              {order.shippingAddress}<br />
              {order.shippingCity} // PIN_{order.shippingPincode}
            </div>
          </section>

          {/* TRANSACTIONAL STATUS */}
          <section>
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-3 italic">
              <CreditCard size={14} className="text-neutral-700" /> [03] FINANCIAL_SETTLEMENT
            </h3>
            <div className="space-y-4">
               <div>
                 <p className="text-[9px] font-mono text-neutral-600 mb-1">RAZORPAY_TRANS_ID:</p>
                 <p className="text-[10px] font-mono text-white break-all">{order.paymentId || "N/A"}</p>
               </div>
               <p className="text-5xl font-black italic tracking-tighter">₹{order.total.toLocaleString()}</p>
            </div>
          </section>

          {/* ACTION BUTTONS: INTEGRATED INTO THE COLUMN */}
          <div className="pt-8 border-t border-white/5 space-y-4">
            <form action={async (data) => { 
              "use server"; 
              await updateOrderStatus(id, data.get("status") as string); 
            }} className="flex gap-2">
              <select name="status" defaultValue={order.status} className="flex-1 bg-zinc-900 border border-white/10 p-4 text-[10px] font-bold uppercase tracking-widest outline-none">
                {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="bg-white text-black px-6 font-black uppercase text-[10px] hover:invert transition-all">
                Update
              </button>
            </form>
          </div>
        </div>

        {/* 3. RIGHT: ITEMIZED MANIFEST (THE LIST) */}
        <div className="lg:col-span-8">
          <div className="border border-white/10 p-10 bg-[#050505]">
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-12 italic tracking-[0.4em]">
              // ACQUISITION_UNIT_MANIFEST
            </h3>
            
            <div className="space-y-12">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-10 items-start md:items-center group">
                  <div className="w-24 h-32 bg-neutral-950 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={item.image} alt="" className="object-cover w-full h-full p-2 opacity-80 group-hover:opacity-100" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[9px] font-mono text-neutral-700">UNIT_ID: {item.productId.slice(-6)}</span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <h4 className="text-3xl font-black italic uppercase leading-none mb-3 group-hover:translate-x-2 transition-transform">{item.title}</h4>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                      Size: <span className="text-white">{item.size}</span> // Qty: <span className="text-white">{item.quantity}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-black italic">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[9px] font-mono text-neutral-600 mt-1 uppercase">Unit_Settled</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL FOOTER */}
            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-end">
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.5em]">// TOTAL_MANIFEST_VALUE</p>
                <p className="text-5xl font-black italic tracking-tighter">₹{order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}