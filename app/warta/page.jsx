"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WartaDesaPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNewsData(data);
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="font-sans pt-12">
        {/* Hero */}
        <section
          id="warta-hero"
          className="relative bg-cover bg-center h-[70vh] text-white flex justify-center items-center text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 z-[-1]"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <Image
              src="/images/hero.png"
              alt="Warta Desa"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative bg-[#0a160d]/40 z-10 h-full w-full flex items-center justify-center text-center px-6">
            <div className="transition-all duration-1000 ease-out opacity-100 translate-y-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Warta Desa Semandang Hulu
              </h1>
              <p className="text-md md:text-xl">
                Berita dan informasi terbaru dari desa kami
              </p>
            </div>
          </div>
        </section>

        {/* Daftar Berita */}
        <section className="py-20 px-6 md:px-[100px] bg-white">
          <h2
            id="warta-title"
            data-animate
            className={`text-2xl font-semibold mb-10 text-[#0a160d] text-center transition-all duration-700 ease-out ${
              isVisible("warta-title")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            Daftar Berita
          </h2>

          {newsData.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-10">
              Belum ada berita yang tersedia untuk saat ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {newsData.map((item, idx) => (
                <div
                  key={item.id}
                  id={`news-${idx}`}
                  data-animate
                  className={`bg-white border rounded-xl overflow-hidden shadow-md transform transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02] ${
                    isVisible(`news-${idx}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <Image
                    src={item.imageurl}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#0a160d] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/warta/${item.id}`}
                      className="text-[#97A202] mt-3 inline-block text-sm font-semibold hover:underline"
                    >
                      Baca selengkapnya →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}
