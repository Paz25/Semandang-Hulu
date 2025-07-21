"use client";

import { useEffect, useState } from "react";
import UserFormSidebar from "@/components/UserFormSidebar";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data user
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsSidebarOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null); // Reset form
    setIsSidebarOpen(true);
  };

  return (
    <div className="p-6 relative bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#3F552F]">Manajemen Pengguna</h1>
        <button
          onClick={handleAddUser}
          className="bg-[#3F552F] hover:bg-[#97A202] text-white px-4 py-2 rounded-md"
        >
          Tambah Pengguna
        </button>
      </div>

      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Nama</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        fetchUsers={fetchUsers}
        user={selectedUser}
      />
    </div>
  );
}