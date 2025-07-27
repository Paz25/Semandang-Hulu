"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/admin/login");
      } else {
        alert("Gagal logout");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-3 ml-6 px-4 py-3 w-full rounded-r-full text-sm cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
