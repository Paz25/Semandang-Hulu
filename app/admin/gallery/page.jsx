"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import GalleryFormSidebar from "@/components/Forms/GalleryFormSidebar";

export default function GalleryManagementPage() {
  const [galleries, setGalleries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      console.log("Gallery data:", data); // 👈 tambahkan ini

      setGalleries(data);
    } catch (err) {
      toast.error("Gagal mengambil data galeri");
      console.error(err);
    }
  };

  const handleAddGallery = () => {
    setIsSidebarOpen(true);
  };

  const handleDeleteGallery = async (id) => {
    if (confirm("Yakin ingin menghapus gambar ini?")) {
      try {
        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        toast.success("Gambar berhasil dihapus");
        fetchGalleries();
      } catch {
        toast.error("Gagal menghapus gambar");
      }
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#3F552F]">
        Manajemen Galeri
      </h1>

      <button
        onClick={handleAddGallery}
        className="flex items-center gap-2 mb-6 bg-[#3F552F] text-white px-4 py-2 rounded hover:bg-[#97A202] transition"
      >
        <Plus size={18} />
        Tambah Gambar
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {galleries.map((item) => (
          <div key={item.id} className="border rounded shadow p-4">
            <img
              src={item.imageurl}
              alt={item.title}
              className="aspect-square object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold text-black">{item.title}</h2>
            <button
              onClick={() => handleDeleteGallery(item.id)}
              className="mt-2 text-sm text-red-600 hover:underline flex items-center gap-1"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}

      {/* Sidebar Form */}
      <GalleryFormSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        refreshGalleries={fetchGalleries}
      />
    </div>
  );
}
