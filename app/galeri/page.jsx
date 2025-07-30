"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GaleriDesaPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current.disconnect();
  }, []);

  const isVisible = (id) => visibleElements.has(id);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        console.log("Gallery data:", data); // 👈 tambahkan ini

        setGalleryData(data);
      } catch (err) {
        console.error("Gagal memuat galeri:", err);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="font-sans pt-12">
        {/* Hero Section */}
        <section
          id="galeri-hero"
          className="relative bg-cover bg-center h-[70vh] text-white flex flex-col justify-center items-center text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 z-[-1]"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Galeri Desa"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative bg-[#0a160d]/35 z-10 h-full w-full flex items-center justify-center text-center text-white px-6">
            <div className="px-6 transition-all duration-1000 ease-out opacity-100 translate-y-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Galeri Desa Semandang Hulu
              </h1>
              <p className="text-md md:text-xl">
                Dokumentasi kegiatan dan potret kehidupan desa kami
              </p>
            </div>
          </div>
        </section>

        {/* Galeri Grid */}
        <section className="py-20 px-6 md:px-[100px] bg-white">
          <h2
            id="galeri-title"
            data-animate
            className={`text-2xl font-semibold mb-10 text-[#0a160d] text-center transition-all duration-700 ease-out ${
              isVisible("galeri-title")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            Galeri Kegiatan Desa
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryData.map((item, idx) => (
              <div
                key={item.id}
                id={`galeri-img-${idx}`}
                className="relative rounded-xs flex justify-center align-center overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 cursor-pointer opacity-100 translate-y-0"
              >
                <img
                  src={item.imageurl}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
