"use client";

import { useState } from "react";
import { register } from "@/app/actions/register";

export default function SignupPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const res = await register({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (res?.error) setMessage(res.error);
    if (res?.success) setMessage(res.success);

    setLoading(false);
  }

  return (
    <div className="relative z-50 min-h-screen flex items-center justify-center">
      {/* Card */}
      <form
        action={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-black/80 p-8 shadow-xl backdrop-blur-md"
      >
        <h1 className="text-2xl font-semibold text-white text-center">
          Create Account
        </h1>

        <input
          name="name"
          placeholder="Name"
          required
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white py-3 font-medium text-black transition hover:bg-neutral-200 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        {message && (
          <p className="text-center text-sm text-neutral-300">{message}</p>
        )}
      </form>
    </div>
  );
}
