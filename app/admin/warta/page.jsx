"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminWartaPage() {
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      judul,
      konten,
      gambar,
    });

    alert("Berita berhasil disimpan!");

    setJudul("");
    setKonten("");
    setGambar(null);
    setPreview(null);
  };

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-[#0a160d]">
          Dashboard Admin - Tambah Warta Desa
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Judul Berita
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              placeholder="Masukkan judul berita"
            />
          </div>

          {/* Konten */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Konten / Deskripsi
            </label>
            <textarea
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              required
              className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              placeholder="Tulis konten berita di sini"
            ></textarea>
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gambar Berita
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGambarChange}
              className="w-full p-2 border rounded-md"
            />
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Preview Gambar"
                  width={400}
                  height={250}
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#3F552F] hover:bg-[#97A202] text-white px-6 py-3 rounded-md transition-all"
          >
            Simpan Berita
          </button>
        </form>
      </div>
    </main>
  );
}