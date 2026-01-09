"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Email or Password");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-black/5 p-10 rounded-2xl shadow-sm"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black italic">
            Orbit Member<span className="not-italic">.</span>
          </h2>
          <p className="text-neutral-400 text-[10px] mt-3 tracking-[0.3em] uppercase">
            Authorized Access Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              required
              type="email"
              className="w-full bg-neutral-50 border border-black/5 p-4 rounded-lg focus:outline-none focus:border-black text-black"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">
              Security Key
            </label>
            <input
              required
              type="password"
              className="w-full bg-neutral-50 border border-black/5 p-4 rounded-lg focus:outline-none focus:border-black text-black"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-800"
          >
            Authorize Session
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-black/5 text-center space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full border border-black/10 text-black py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-50"
          >
            Google Identity
          </button>
        </div>
      </motion.div>
    </div>
  );
}
