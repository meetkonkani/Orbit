"use client";

import { motion } from "framer-motion";

interface AdminStatsProps {
  stats: {
    orders: number;
    users: number;
    products: number;
    revenue: number;
  };
  // Add a simple array of recent sales values for the chart
  chartData?: number[]; 
}

export default function AdminStats({ stats, chartData = [20, 40, 35, 50, 45, 70, 60, 90] }: AdminStatsProps) {
  
  // Minimalist SVG Sparkline Generator
  const generatePath = (data: number[]) => {
    const max = Math.max(...data);
    const width = 200;
    const height = 40;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (val / max) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const cardData = [
    { 
      label: "Gross_Revenue", 
      value: `₹${stats.revenue.toLocaleString()}`, 
      color: "text-white",
      showChart: true 
    },
    { label: "Active_Units", value: stats.orders, color: "text-white" },
    { label: "Entity_Nodes", value: stats.users, color: "text-zinc-500" },
    { label: "Stock_Inventory", value: stats.products, color: "text-zinc-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-16">
      {cardData.map((stat, i) => (
        <div key={stat.label} className="bg-black p-10 group hover:bg-zinc-950 transition-colors relative overflow-hidden">
          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4 italic">
            {stat.label}
          </p>
          
          <div className="flex flex-col justify-between h-full">
            <p className={`text-4xl font-black tracking-tighter italic leading-none z-10 ${stat.color}`}>
              {stat.value}
            </p>

            {/* MINIMALIST SPARKLINE FOR REVENUE */}
            {stat.showChart && (
              <div className="mt-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d={generatePath(chartData)}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            )}
          </div>
          
          {/* BACKGROUND DECORATION */}
          <span className="absolute -bottom-2 -right-2 text-6xl font-black text-white/[0.02] italic select-none">
            0{i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}