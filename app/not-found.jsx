"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
        <p className="mb-6">Maaf, halaman yang kamu cari tidak tersedia.</p>
        <Link href="/" className="text-[#3F552F] underline hover:text-[#97A202]">
          Kembali ke Beranda
        </Link>
      </main>
      <Footer />
    </div>
  );
}