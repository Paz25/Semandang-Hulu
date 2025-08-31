"use client";

import { useEffect, useState } from "react";
import NewsFormSidebar from "@/components/Forms/NewsFormSidebar";
import Image from "next/image";
import { Plus } from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch("/api/admin/news");
      if (!response.ok) throw new Error("Gagal mengambil data berita");
      const data = await response.json();
      setBeritaList(data);
    } catch (err) {
      console.error("Error fetch berita:", err);
      setBeritaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBerita = () => {
    setSelectedNews(null);
    setIsSidebarOpen(true);
  };

  const handleDeleteBerita = async (id) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      try {
        const res = await fetch(`/api/admin/news/${id}`, {
          method: "DELETE",
          credentials: "include", // kalau butuh cookie untuk verifyTokenFromCookie
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        // update state kalau berhasil
        setBeritaList((prev) => prev.filter((item) => item.id !== id));
        alert(data.message);
      } catch (err) {
        console.error("Gagal hapus:", err);
        alert(err.message);
      }
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
        onClick={handleAddBerita}
        className="flex items-center gap-2 mb-6 bg-[#3F552F] text-white px-4 py-2 rounded hover:bg-[#97A202] transition"
      >
        <Plus size={18} />
        Tambah Berita
      </button>

      {/* Loading / Empty State */}
      {isLoading ? (
        <p className="text-gray-600">Memuat berita...</p>
      ) : beritaList.length === 0 ? (
        <p className="text-gray-600">Belum ada berita.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaList.map((berita, idx) => (
            <div
              key={berita.id || idx}
              id={`warta-card-${idx}`}
              data-animate
              className="bg-white rounded shadow-md"
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <Image
                src={berita.header_img || "/images/news/no-image.jpg"}
                alt={berita.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
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
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => {
                      setSelectedNews(berita);
                      setIsSidebarOpen(true);
                    }}
                    className="text-[#97a202] text-sm font-semibold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBerita(berita.id)}
                    className="text-red-500 text-sm font-semibold hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}

      {isSidebarOpen && (
        <NewsFormSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          initialData={selectedNews}
          refreshNews={fetchBerita}
        />
      )}
    </div>
  );
}
