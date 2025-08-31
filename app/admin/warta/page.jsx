"use client";

import { useState } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";

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

  const [beritaList, setBeritaList] = useState([
    {
      date: "2025-07-02T13:45:00Z",
      title: "Mahasiswa KKN UAJY Resmi Disambut di Desa Semandang Hulu",
      header_img:
        "https://lldikti5.kemdikbud.go.id/assets/images/posts/medium/tn_lldikti5_20240801150010.jpg",
      content:
        "Sebanyak 9 mahasiswa Universitas Atma Jaya Yogyakarta resmi memulai kegiatan KKN di Desa Semandang Hulu...",
    },
    {
      date: "2025-07-15T13:45:00Z",
      title: "Gotong Royong Perbaikan Jalan Antar-Dusun Dimulai",
      header_img:
        "https://th.bing.com/th/id/OIP.-1n_lsGSt_gfU1RypVwd1gHaE8?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
      content:
        "Warga Desa Semandang Hulu bersama-sama memperbaiki jalan yang menghubungkan dusun-dusun utama...",
    },
    {
      date: "2025-07-21T13:45:00Z",
      title: "Pelatihan Digitalisasi UMKM di Balai Desa",
      header_img:
        "https://i.pinimg.com/736x/a1/c3/ec/a1c3eca0021357b9094cd282c09a5800.jpg",
      content:
        "Sebanyak 25 pelaku usaha mengikuti pelatihan digitalisasi untuk memasarkan produk lokal secara online...",
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);

  const handleAddBerita = () => {
    setSelectedBerita(null);
    setIsSidebarOpen(true);
  };

  const handleEditBerita = (berita) => {
    setSelectedBerita(berita);
    setIsSidebarOpen(true);
  };

  const handleDeleteBerita = (id) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      setBeritaList(beritaList.filter((item) => item.id !== id));
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((berita, idx) => (
          <div
            key={idx}
            id={`warta-card-${idx}`}
            data-animate
            className="bg-white rounded shadow-md"
            style={{ transitionDelay: `${idx * 200}ms` }}
          >
            <img
              src={berita.header_img}
              alt={berita.title}
              className="max-h-50 w-full object-cover"
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
              <button className="mt-2 text-[#97a202] text-sm font-semibold">
                Baca Selengkapnya →
              </button>
            </div>
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

      {/* Sidebar (dummy) */}
      {isSidebarOpen && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50 p-6">
          <h2 className="text-lg font-semibold mb-4">
            {selectedBerita ? "Edit Berita" : "Tambah Berita"}
          </h2>
          <p className="text-sm text-gray-500">Form akan dibuat nanti.</p>
          <button
            onClick={handleCloseSidebar}
            className="mt-6 text-sm text-red-600 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
