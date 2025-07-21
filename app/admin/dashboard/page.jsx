"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [gambar, setGambar] = useState(null);
  const [beritaList, setBeritaList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul || !konten) {
      alert("Judul dan Konten wajib diisi!");
      return;
    }

    const newBerita = {
      id: Date.now(),
      judul,
      konten,
      gambar: gambar ? URL.createObjectURL(gambar) : null,
    };

    setBeritaList([newBerita, ...beritaList]);

    // Reset form
    setJudul("");
    setKonten("");
    setGambar(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-6 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-[#3F552F] mb-8 text-center">
        Dashboard Admin - Input Berita Desa
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-12 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Berita
          </label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
            placeholder="Masukkan judul berita"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konten Berita
          </label>
          <textarea
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
            placeholder="Masukkan isi berita"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Gambar (Opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 px-6 rounded-md transition-all duration-300"
        >
          Tambah Berita
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-[#3F552F] mb-4">
        Daftar Berita Terinput
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((berita) => (
          <div
            key={berita.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all"
          >
            {berita.gambar && (
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-bold text-[#0A160D] mb-2">
              {berita.judul}
            </h3>
            <p className="text-gray-700 text-sm">{berita.konten}</p>
          </div>
        ))}
      </div>
    </div>
  );
}