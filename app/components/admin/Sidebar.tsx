"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react"; // 👈 Import signOut

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Users", href: "/admin/users" },
  { label: "Products", href: "/admin/products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-black/60 border-r border-white/10 p-6 h-screen sticky top-0 flex flex-col" // 👈 Added flex flex-col
    >
      <h2 className="text-xl font-bold mb-10 tracking-widest">3DX ADMIN</h2>

      <nav className="space-y-3 flex-1"> {/* 👈 Added flex-1 to push footer down */}
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={`px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* --- Logout Section --- */}
      <div className="pt-6 border-t border-white/10 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
}