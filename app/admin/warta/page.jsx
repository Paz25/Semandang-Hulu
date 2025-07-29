"use client";

import { useState, useEffect } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import NewsFormSidebar from "@/components/Forms/NewsFormSidebar";
import toast from "react-hot-toast";
import ModalKonfirmasi from "@/components/Forms/ModalKonfirmasi";
import Link from "next/link";

export default function WartaManagementPage() {
  function formatTanggal(dateString) {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  const [beritaList, setBeritaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeritaId, setSelectedBeritaId] = useState(null);

  useEffect(() => {
    fetchBeritaList();
  }, []);

  const fetchBeritaList = async () => {
    try {
      const res = await fetch("/api/admin/news", {
        credentials: "include",
      });
      const data = await res.json();

      console.log("Fetched berita:", data);

      if (Array.isArray(data)) {
        setBeritaList(data);
      } else {
        throw new Error("Data berita tidak berbentuk array");
      }
    } catch (err) {
      console.error("Gagal fetch berita:", err);
      setBeritaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNews = () => {
    setSelectedNews(null);
    setIsSidebarOpen(true);
  };

  const handleEditNews = (berita) => {
    setSelectedNews(berita);
    setIsSidebarOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(
        selectedNews ? `/api/admin/news/${selectedNews.id}` : "/api/admin/news",
        {
          method: selectedNews ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal menyimpan berita");
      }

      toast.success(result.message);
      setIsSidebarOpen(false);
      fetchBeritaList();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.message);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedBeritaId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBeritaId) return;

    try {
      const res = await fetch(`/api/admin/news/${selectedBeritaId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.message || "Gagal menghapus berita");
        return;
      }

      toast.success("Berita berhasil dihapus");
      fetchBeritaList();
    } catch (err) {
      console.error("Error delete berita:", err);
      toast.error("Terjadi kesalahan saat menghapus berita");
    } finally {
      setIsModalOpen(false);
      setSelectedBeritaId(null);
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#3F552F]">
        Manajemen Warta
      </h1>

      <button
        onClick={handleAddNews}
        className="flex items-center gap-2 mb-6 bg-[#3F552F] text-white px-4 py-2 rounded hover:bg-[#97A202] transition"
      >
        <Plus size={18} />
        Tambah Berita
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((berita, idx) => (
          <div
            key={idx}
            id={berita.id}
            data-animate
            className="bg-white rounded shadow-md"
            style={{ transitionDelay: `${idx * 200}ms` }}
          >
            {berita.header_img ? (
              <img
                src={berita.header_img}
                alt={berita.title}
                className="max-h-50 w-full object-cover"
              />
            ) : (
              <div className="min-h-50 w-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                Tidak ada gambar
              </div>
            )}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1 text-[#0a160d]">
                {formatTanggal(berita.date)}
              </p>
              <h3 className="font-semibold text-md mb-2 text-[#0a160d]">
                {berita.title}
              </h3>
              <p className="text-sm text-[#0a160d] line-clamp-3">
                {berita.content}
              </p>
              <Link href={`/warta/${berita.id}`}>
                <button className="mt-2 text-[#97a202] text-sm font-semibold cursor-pointer hover:underline transition-all duration-800 ease-out">
                  Baca Selengkapnya →
                </button>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEditNews(berita)}
                  className="text-sm text-blue-500"
                >
                  ✎ Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(berita.id)}
                  className="text-sm text-red-500"
                >
                  🗑 Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ModalKonfirmasi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Apakah Anda yakin ingin menghapus berita ini?"
      />

      <NewsFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSubmit={handleSubmit}
        selectedNews={selectedNews}
      />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}
    </div>
  );
}
