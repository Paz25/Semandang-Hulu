"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function GalleryFormSidebar({
  isOpen,
  onClose,
  refreshGalleries,
}) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("");
    setImageFile(null);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageFile) {
      toast.error("Judul dan gambar harus diisi.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile); // ✅ penting: name harus "image"

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Gagal menambahkan gambar.");
        return;
      }

      toast.success("Gambar berhasil ditambahkan!");
      refreshGalleries();
      onClose();
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed text-black top-0 right-0 h-full w-120 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Tambah Gambar Galeri</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul Gambar</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unggah Gambar</label>
          <input
            type="file"
            accept="image/*"
            name="image" // ✅ wajib untuk dikenali di server
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202] file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-[#3F552F] file:text-white file:rounded file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {loading ? "Menyimpan..." : "Tambah Gambar"}
        </button>
      </form>
    </div>
  );
}