"use client";

type Status = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export default function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "border-zinc-800 text-zinc-500",
    PAID: "border-white text-white",
    SHIPPED: "border-blue-900 text-blue-400",
    DELIVERED: "border-green-900 text-green-400",
    CANCELLED: "border-red-900 text-red-500",
  };

  return (
    <span className={`text-[9px] font-black px-2 py-0.5 border uppercase tracking-tighter ${colors[status] || "border-zinc-800 text-zinc-500"}`}>
      {status}
    </span>
  );
}
