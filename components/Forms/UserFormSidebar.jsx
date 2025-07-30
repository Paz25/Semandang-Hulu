"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function UserFormSidebar({
  isOpen,
  onClose,
  user,
  refreshUsers,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
    setPassword("");
    setConfirmPassword("");
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama.");
      return;
    }

    const payload = { name, email };
    if (password) payload.password = password;

    try {
      let response;
      if (user) {
        response = await fetch(`/api/admin/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Terjadi kesalahan saat menyimpan data."
        );
        return;
      }

      toast.success(
        user
          ? "Data pengguna berhasil diperbarui!"
          : "Pengguna baru berhasil ditambahkan!"
      );
      refreshUsers();
      onClose();
    } catch (error) {
      toast.error("Gagal terhubung ke server. Coba lagi nanti.");
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed text-black top-0 right-0 h-full w-120 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">
          {user ? "Edit Pengguna" : "Tambah Pengguna"}
        </h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={user ? "Biarkan kosong jika tidak ingin diubah" : ""}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Konfirmasi Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={user ? "Biarkan kosong jika tidak ingin diubah" : ""}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {user ? "Simpan Perubahan" : "Tambah Pengguna"}
        </button>
      </form>
    </div>
  );
}
