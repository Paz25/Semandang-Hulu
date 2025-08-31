"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function NewsFormSidebar({
  isOpen,
  onClose,
  refreshNews,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [header_img, setHeader_img] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setDate(initialData.date || "");
      setPreview(initialData.header_img || null);
    } else {
      setTitle("");
      setContent("");
      setDate("");
      setHeader_img(null);
      setPreview(null);
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHeader_img(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Judul dan konten harus diisi.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);

      if (header_img) {
        formData.append("header_img", header_img);
      }

      const res = await fetch(
        initialData ? `/api/admin/news/${initialData.id}` : "/api/admin/news",
        {
          method: initialData ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          error.message || "Terjadi kesalahan saat menyimpan berita."
        );
        return;
      }

      toast.success(
        initialData
          ? "Data berita berhasil diperbarui!"
          : "Berita baru berhasil ditambahkan!"
      );

      refreshNews?.();
      onClose();
    } catch (err) {
      toast.error("Gagal terhubung ke server. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed text-black top-0 right-0 h-full w-120 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">
          {initialData ? "Update Berita" : "Tambah Berita"}
        </h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]"
      >
        {/* Judul */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
            required
          />
        </div>

        {/* Konten */}
        <div>
          <label className="block text-sm font-medium mb-1">Konten</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202] h-32 text-sm"
            required
          />
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Penulisan
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
            required
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm font-medium mb-1">Gambar</label>
          <input
            type="file"
            name="header_img"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202] file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-[#3F552F] file:text-white file:rounded file:cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Tombol */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {loading
            ? "Menyimpan..."
            : initialData
            ? "Simpan Perubahan"
            : "Tambah Berita"}
        </button>
      </form>
    </div>
  );
}
