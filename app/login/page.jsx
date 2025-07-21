"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A160D] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-[#3F552F] mb-6">
          Login Admin
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 text-[#3F552F] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 text-[#3F552F] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}