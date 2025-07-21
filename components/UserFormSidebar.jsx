"use client";

import { useState, useEffect } from "react";

export default function UserFormSidebar({ isOpen, onClose, fetchUsers, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };

    if (user) {
      // Edit
      await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Tambah
      await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    fetchUsers();
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-100 bg-stone-50 shadow-lg transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-[#0A160D]">
          {user ? "Edit Pengguna" : "Tambah Pengguna"}
        </h2>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-[#0A160D] text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-[#0A160D] text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password {user && "(Kosongkan jika tidak diubah)"}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-[#0A160D] text-sm"
              placeholder={user ? "Opsional" : ""}
              required={!user}
            />
          </div>

          <button
            type="submit"
            className="mt-auto bg-[#3F552F] hover:bg-[#97A202] text-white px-4 py-2 rounded-md text-sm transition-all duration-200"
          >
            {user ? "Simpan Perubahan" : "Tambah Pengguna"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-red-800 mt-1 text-sm px-4 py-2 outline-2 outline-red-800 rounded-md hover:bg-red-800 hover:text-white transition-all duration-200"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
}