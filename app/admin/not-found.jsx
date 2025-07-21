"use client";

import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A160D] text-white px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Halaman Admin Tidak Ditemukan</h1>
      <p className="mb-6">Maaf, halaman admin yang Anda cari tidak tersedia.</p>
      <Link href="/admin" className="bg-[#3F552F] hover:bg-[#97A202] text-white px-6 py-2 rounded-md">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}