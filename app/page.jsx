"use client";

import Image from "next/image";
import HighlightCard from "@/components/HighlightCard";
import Navbar from "@/components/Navbar";
import { FaMapMarkerAlt, FaUsers, FaLeaf, FaSeedling } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";

export default function Beranda() {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [sectionStates, setSectionStates] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, sectionId]));
            setSectionStates((prev) => ({
              ...prev,
              [sectionId]: "visible",
            }));
          } else {
            setVisibleElements((prev) => {
              const newSet = new Set(prev);
              newSet.delete(sectionId);
              return newSet;
            });
            setSectionStates((prev) => ({
              ...prev,
              [sectionId]: "exit",
            }));
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const isVisible = (id) => visibleElements.has(id);
  const getSectionState = (id) => sectionStates[id] || "hidden";

  const getAnimationClass = (id) => {
    const state = getSectionState(id);

    if (state === "visible") {
      return `opacity-100 translate-y-0 transition-all duration-800 ease-out`;
    } else if (state === "exit") {
      return scrollDirection === "down"
        ? `opacity-0 -translate-y-12 transition-all duration-600 ease-in`
        : `opacity-0 translate-y-12 transition-all duration-600 ease-in`;
    } else {
      return scrollDirection === "down"
        ? `opacity-0 translate-y-12 transition-all duration-800 ease-out`
        : `opacity-0 -translate-y-12 transition-all duration-800 ease-out`;
    }
  };

  return (
    <div>
      <Navbar />
      <main className="font-sans pt-12">
        {/* Hero Section */}
        <section
          id="home"
          className="relative bg-cover bg-center h-[100vh] text-white flex flex-col justify-center items-center text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 z-[-1]"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <Image
              src="/images/hero.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative bg-[#0a160d]/35 z-10 h-full w-full flex items-center justify-center text-center text-white">
            <div
              className="px-6"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Semandang Hulu Dalam Genggaman
              </h1>
              <p className="text-md md:text-xl">
                Mewujudkan Transparansi, Pelayanan, dan Pembangunan
              </p>
            </div>
          </div>
        </section>

        {/* Tentang Desa */}
        <section className="py-15 px-6 md:px-[100px] bg-stone-50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="bg-gray-300 h-60 md:h-80 w-full rounded"></div>
            </div>

            <div className="hidden md:block md:col-span-1"></div>

            <div className="md:col-span-6">
              <h2 className="text-2xl font-semibold mb-2 text-[#0a160d]">
                Tentang Desa Semandang Hulu
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Desa Semandang Hulu adalah salah satu desa yang terletak di
                Kecamatan Simpang Hulu, Kabupaten Ketapang, Kalimantan Barat.
                Dikelilingi oleh hutan dan perkebunan sawit, desa ini memiliki
                potensi besar di sektor pertanian, kehutanan, dan kearifan lokal
                masyarakatnya. Warga dikenal dengan semangat gotong royong dan
                nilai kebersamaan yang kuat.
              </p>
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="py-15 px-6 md:px-[100px] bg-stone-50">
          <h2 className="text-2xl font-semibold mb-2 text-[#0a160d] text-center">
            Kenali Desa Semandang Hulu Lebih Dekat
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Berbagai sisi kehidupan desa yang membentuk identitas dan potensi
            kami.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <HighlightCard
              icon={<FaMapMarkerAlt />}
              title="Lokasi"
              text="Berada di Kabupaten Ketapang dengan akses yang semakin terbuka berkat pembangunan infrastruktur desa."
            />
            <HighlightCard
              icon={<FaUsers />}
              title="Komunitas"
              text="Warga hidup dengan semangat gotong royong, menjunjung nilai kebersamaan dan tradisi lokal yang kuat."
            />
            <HighlightCard
              icon={<FaLeaf />}
              title="Alam"
              text="Dikelilingi hutan tropis, sungai kecil, dan perkebunan sawit yang menjadi tumpuan mata pencaharian."
            />
            <HighlightCard
              icon={<BsStars />}
              title="Potensi"
              text="Perkebunan kelapa sawit, hasil pertanian, dan produk lokal menjadi sumber daya unggulan masyarakat."
            />
          </div>
        </section>

        {/* Statistik Section */}
        <section
          id="stats"
          className="relative bg-cover bg-center text-white flex flex-col justify-center items-center text-center overflow-hidden "
        >
          <div
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              top: "-300%",
              height: "200%",
            }}
          >
            <Image
              src="/images/bg3.png"
              alt="Background Statistik"
              width={1920}
              height={1080}
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative bg-[#0a160d]/35 z-10 py-15 h-full w-full flex items-center justify-center text-center text-white">
            <div
              id="stats-header"
              data-animate
              className={`w-full h-full ${getAnimationClass("stats-header")}`}
              style={{ transitionDelay: "0ms" }}
            >
              <h2 className="text-2xl font-semibold text-center mb-2">
                Semandang Hulu Dalam Angka
              </h2>
              <p className="text-center mb-8">
                Statistik utama Desa Semandang Hulu.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center max-w-4xl mx-auto text-white">
                {[
                  { number: "516", label: "Penduduk" },
                  { number: "219", label: "Keluarga" },
                  { number: "217.430 ha", label: "Luas wilayah" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    id={`stats-${index}`}
                    className={`flex-1 p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-md ${getAnimationClass(
                      `stats-${index}`
                    )}`}
                    data-animate
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="text-3xl md:text-4xl font-semibold mb-2 text-white text-center">
                      {stat.number}
                    </div>
                    <div className="text-base text-gray-300 text-center">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Peta Desa */}
        <section className="py-12 px-6 md:px-20">
          <h2 className="text-2xl font-bold text-center mb-2">Peta Desa</h2>
          <p className="text-center text-gray-600 mb-6">
            Lihat posisi strategis desa dalam satu tampilan
          </p>
          <div className="bg-gray-300 h-80 w-full rounded"></div>
        </section>

        {/* Warta Desa */}
        <section className="py-12 px-6 md:px-20">
          <h2 className="text-2xl font-bold text-center mb-2">Warta Desa</h2>
          <p className="text-center text-gray-600 mb-6">
            Informasi terbaru seputar kegiatan, pengumuman, dan kehidupan warga
            Semandang Hulu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                date: "02 Juli 2025",
                title:
                  "Mahasiswa KKN UAJY Resmi Disambut di Desa Semandang Hulu",
                content:
                  "Sebanyak 9 mahasiswa Universitas Atma Jaya Yogyakarta resmi memulai kegiatan KKN di Desa Semandang Hulu...",
              },
              {
                date: "15 Juli 2025",
                title: "Gotong Royong Perbaikan Jalan Antar-Dusun Dimulai",
                content:
                  "Warga Desa Semandang Hulu bersama-sama memperbaiki jalan yang menghubungkan dusun-dusun utama...",
              },
              {
                date: "21 Juni 2025",
                title: "Pelatihan Digitalisasi UMKM di Balai Desa",
                content:
                  "Sebanyak 25 pelaku usaha mengikuti pelatihan digitalisasi untuk memasarkan produk lokal secara online...",
              },
            ].map((berita, idx) => (
              <div key={idx} className="bg-white rounded shadow-md p-4">
                <p className="text-sm text-gray-500 mb-1">{berita.date}</p>
                <h3 className="font-semibold text-lg mb-2">{berita.title}</h3>
                <p className="text-sm text-gray-600">{berita.content}</p>
                <button className="mt-2 text-green-700 text-sm font-semibold">
                  Baca Selengkapnya →
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white">
              Lihat Berita Lainnya
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-20 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-2">Desa Semandang Hulu</h4>
            <p>
              Desa Semandang Hulu, Kecamatan Simpang Hulu, Kabupaten Ketapang,
              Provinsi Kalimantan Barat, 78850
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Navigasi Cepat</h4>
            <ul className="space-y-1">
              <li>Beranda</li>
              <li>Profil Desa</li>
              <li>Warta Desa</li>
              <li>Galeri</li>
              <li>Download Area</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Informasi Kontak</h4>
            <p>📞 (+62) 812-3456-7890</p>
            <p>✉️ semandang.hulu@ketapang.go.id</p>
          </div>
          <div className="md:col-span-3 text-center text-gray-400 mt-8">
            <p>© 2025 Desa Semandang Hulu. All rights reserved.</p>
            <p>
              Dikembangkan oleh <strong>KKN 89 Semandang Hulu UAJY</strong>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
