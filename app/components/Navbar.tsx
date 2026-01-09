"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, LayoutDashboard, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { cn } from "@/app/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cart, openCart } = useCart();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Switch styles if we are on light pages or scrolled down
  const isLightPage = pathname.startsWith("/dashboard") || pathname.startsWith("/auth") || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Archive", href: "/archive" },
    { name: "Editorial", href: "/editorial" },
    { name: "Protocol", href: "/protocol" },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[100] transition-all duration-700",
        isLightPage 
          ? "bg-white/80 backdrop-blur-xl text-black border-b border-black/5" 
          : "bg-transparent text-white"
      )}>
        
        {/* LEFT: LOGO WITH MAGNETIC HOVER */}
        <div className="flex items-center gap-12">
          <Link href="/">
            <motion.h1 
              whileHover={{ scale: 1.05, x: 5 }}
              className="text-2xl font-black tracking-tighter uppercase italic"
            >
              ORBIT<span className="text-red-600">.</span>
            </motion.h1>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="group relative overflow-hidden"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] transition-transform duration-500 group-hover:-translate-y-full block">
                  {link.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full block text-red-500">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: UTILITIES */}
        <div className="flex items-center gap-6">
          
          {/* CART TRIGGER WITH POP ANIMATION */}
          <button onClick={openCart} className="relative group">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ShoppingBag size={20} strokeWidth={2} />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 h-4 w-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center italic"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>

          {/* AUTHENTICATION LOGIC */}
          <div className={cn(
            "hidden md:flex items-center border-l pl-6 gap-6",
            isLightPage ? "border-black/10" : "border-white/20"
          )}>
            {session ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center overflow-hidden">
                    <User size={14} />
                  </div>
                  <ChevronDown size={10} className={cn("transition-transform duration-500", isDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className={cn(
                        "absolute right-0 mt-4 w-56 p-2 border shadow-2xl backdrop-blur-2xl",
                        isLightPage ? "bg-white border-black/5 text-black" : "bg-neutral-900 border-white/5 text-white"
                      )}
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1">Authenticated_As</p>
                        <p className="text-[11px] font-black uppercase italic truncate">{session.user?.name}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                      {session.user?.role === "ADMIN" && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-white/5 transition-colors">
                          <LayoutDashboard size={14} /> Admin_Protocol
                        </Link>
                      )}
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all mt-2 border-t border-white/5"
                      >
                        <LogOut size={14} /> Sign_Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth/login" className="text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">
                Connect_Identity
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-black text-white p-12 flex flex-col justify-center"
          >
            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    className="text-6xl font-black italic uppercase tracking-tighter hover:text-neutral-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}