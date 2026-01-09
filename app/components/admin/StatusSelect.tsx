"use client";
import { updateOrderStatus } from "@/app/actions/admin";

export default function StatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  return (
    <div className="relative group">
      <select 
        defaultValue={currentStatus}
        onChange={async (e) => await updateOrderStatus(orderId, e.target.value)}
        className="w-full bg-transparent border-b border-white/10 p-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-white transition-colors appearance-none cursor-pointer"
      >
        <option value="PENDING" className="bg-black">Pending</option>
        <option value="PAID" className="bg-black">Paid</option>
        <option value="SHIPPED" className="bg-black">Shipped</option>
        <option value="DELIVERED" className="bg-black">Delivered</option>
        <option value="CANCELLED" className="bg-black text-red-500">Cancelled</option>
      </select>
    </div>
  );
}