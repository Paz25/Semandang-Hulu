"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
        <p className="mb-6">Maaf, halaman yang kamu cari tidak tersedia.</p>
        <button
          onClick={() => router.back()}
          className="bg-[#3F552F] hover:bg-[#97A202] text-white px-6 py-2 rounded-md transition-all"
        >
          Kembali ke Halaman Sebelumnya
        </button>
      </main>
    </div>
  );
}