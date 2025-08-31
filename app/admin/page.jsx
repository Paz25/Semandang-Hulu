"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [statistik, setStatistik] = useState({
    penduduk: 534,
    berita: 0,
    galeri: 24,
  });

  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch("/api/admin/news", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Gagal mengambil data berita");
        }
        const data = await res.json();
        setBeritaList(data);
        setStatistik((prev) => ({ ...prev, berita: data.length }));
      } catch (err) {
        console.error("Error fetch berita:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-[#3F552F] mb-8 text-center">
        Dashboard Admin Desa Semandang Hulu
      </h1>

      {/* Statistik Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-[#3F552F]">
            {statistik.penduduk}
          </h2>
          <p className="text-gray-600 mt-2">Jumlah Penduduk</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-[#3F552F]">
            {statistik.berita}
          </h2>
          <p className="text-gray-600 mt-2">Jumlah Berita</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-[#3F552F]">
            {statistik.galeri}
          </h2>
          <p className="text-gray-600 mt-2">Total Galeri</p>
        </div>
      </div>

      {/* Daftar Berita */}
      <h2 className="text-2xl font-semibold text-[#3F552F] mb-4">
        Daftar Berita
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto text-[#3F552F]">
        {loading ? (
          <p>Sedang memuat data berita...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : beritaList.length === 0 ? (
          <p className="text-gray-600">Belum ada berita.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Judul</th>
                <th className="py-2 px-4 border-b">Tanggal Terbit</th>
              </tr>
            </thead>
            <tbody>
              {beritaList.map((berita, index) => (
                <tr key={berita.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{berita.title}</td>
                  <td className="py-2 px-4 border-b">{berita.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
