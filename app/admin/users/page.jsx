"use client";

import { useEffect, useState } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import UserFormSidebar from "@/components/Forms/UserFormSidebar";
import toast from "react-hot-toast";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      console.log("Fetched data:", data);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Gagal memuat pengguna.");
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsSidebarOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsSidebarOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (users.length <= 1) {
      toast.error("Minimal harus ada satu pengguna yang tersisa.");
      return;
    }

    const confirmDelete = window.confirm("Yakin ingin menghapus pengguna ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus pengguna");
      toast.success("Pengguna berhasil dihapus.");
      fetchUsers();
    } catch (err) {
      console.error("Gagal menghapus pengguna:", err);
      toast.error("Terjadi kesalahan saat menghapus pengguna.");
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#3F552F]">
        Manajemen Pengguna
      </h1>

      <button
        onClick={handleAddUser}
        className="flex items-center gap-2 mb-6 bg-[#3F552F] text-white px-4 py-2 rounded hover:bg-[#97A202] transition"
      >
        <Plus size={18} />
        Tambah Pengguna
      </button>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#748314] text-white">
            <tr>
              <th className="p-3">Nama</th>
              <th className="p-3">Email</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 flex gap-3">
                  <button onClick={() => handleEditUser(user)}>
                    <SquarePen
                      size={18}
                      className="text-blue-600 hover:text-blue-800"
                    />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <Trash2
                      size={18}
                      className="text-red-600 hover:text-red-800"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}

      {/* Sidebar */}
      <UserFormSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        user={selectedUser}
        refreshUsers={fetchUsers}
      />
    </div>
  );
}