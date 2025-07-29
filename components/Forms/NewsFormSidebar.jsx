"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NewsFormSidebar({
  isOpen,
  onClose,
  onSubmit,
  selectedNews,
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    header_img: "",
  });

  useEffect(() => {
    if (selectedNews) {
      const formattedDate = selectedNews.created_at
        ? new Date(selectedNews.created_at).toISOString().split("T")[0]
        : "";

      setFormData({
        title: selectedNews.title || "",
        content: selectedNews.content || "",
        date: formattedDate,
        header_img: selectedNews.header_img || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        date: "",
        header_img: "",
      });
    }
  }, [selectedNews, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataImage,
      });

      const data = await res.json();

      if (data.url) {
        setFormData((prev) => ({
          ...prev,
          header_img: data.url,
        }));
      } else {
        toast.error("Gagal mengunggah gambar");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Terjadi kesalahan saat upload gambar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className={`fixed inset-0 md:inset-y-0 md:right-0 md:left-auto text-black h-full w-full md:w-[700] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } overflow-hidden`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">
          {selectedNews ? "Edit Berita" : "Tambah Berita"}
        </h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="h-[calc(100%-56px)] overflow-auto p-4">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Gambar Header
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#97A202]"
              />
              {formData.header_img && (
                <img
                  src={formData.header_img}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Konten</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded p-2 min-h-[150px] resize-y"
              placeholder="Isi konten berita..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3F552F] hover:bg-[#97A202] text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            {selectedNews ? "Simpan Perubahan" : "Tambah Berita"}
          </button>
        </form>
      </div>
    </div>
  );
}
