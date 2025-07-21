"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const galleryImages = [
  "/images/galeri/1.jpg",
  "/images/galeri/2.jpg",
  "/images/galeri/3.jpg",
  "/images/galeri/4.jpg",
  "/images/galeri/5.jpg",
  "/images/galeri/6.jpg",
  "/images/galeri/7.jpg",
  "/images/galeri/8.jpg",
  "/images/galeri/9.jpg",
  "/images/galeri/10.jpg",
  "/images/galeri/11.jpg",
  "/images/galeri/12.jpg",
  "/images/galeri/13.jpg",
  "/images/galeri/14.jpg",
  "/images/galeri/15.jpg",
  "/images/galeri/16.jpg",
];

export default function GaleriDesaPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

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
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                id={`galeri-img-${idx}`}
                data-animate
                className={`relative w-full h-64 rounded-xs overflow-hidden shadow-md transform transition-all duration-700 ease-out hover:scale-105 cursor-pointer ${
                  isVisible(`galeri-img-${idx}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Image
                  src={src}
                  alt={`Galeri ${idx + 1}`}
                  fill
                  className="object-cover"
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
