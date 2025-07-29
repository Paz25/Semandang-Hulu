"use client";

import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaLeaf } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";
import HighlightCard from "@/components/HighlightCard";
import Navbar from "@/components/Navbar";
import PetaDesaSection from "@/components/PetaDesaSection";
import Footer from "@/components/Footer";

export default function BerandaPage() {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sectionStates, setSectionStates] = useState({});
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [heroTextParallaxEnabled, setHeroTextParallaxEnabled] = useState(true);
  const observerRef = useRef(null);

  const [berita, setBerita] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function formatTanggal(dateString) {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroTextVisible(true);
    }, 300);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            setSectionStates((prev) => ({
              ...prev,
              [sectionId]: "visible",
            }));
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && berita.length > 0) {
      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el) => observerRef.current?.observe(el));
    }
  }, [isLoading, berita]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setBerita(data);
      } catch (err) {
        console.error("Gagal memuat berita:", err);
        setBerita([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBerita();
  }, []);

  const handleHeroTextTransitionEnd = () => {
    setHeroTextParallaxEnabled(false);
  };

  const getSectionState = (id) => sectionStates[id] || "hidden";

  const getAnimationClass = (id) => {
    const state = getSectionState(id);

    if (state === "visible") {
      return `opacity-100 translate-y-0 transition-all duration-800 ease-out`;
    } else {
      return `opacity-0 translate-y-12 transition-all duration-800 ease-out`;
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
              className={`px-6 transition-all duration-1000 ease-out ${
                heroTextVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-12"
              }`}
              style={{
                transform: heroTextParallaxEnabled
                  ? `translateY(${scrollY * 0.2}px)`
                  : "translateY(0px)",
              }}
              onTransitionEnd={handleHeroTextTransitionEnd}
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
        <section
          id="about-us"
          data-animate
          className="py-20 px-6 md:px-[100px] bg-white"
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${getAnimationClass(
              "about-us"
            )}`}
          >
            <div className="md:col-span-5">
              <div className="relative bg-gray-300 h-60 md:h-100 w-full rounded overflow-hidden">
                <Image
                  src="/images/home/image1.jpg"
                  alt="Tentang Desa"
                  fill
                  className="object-cover rounded object-[0%_70%]"
                />
              </div>
            </div>

            <div className="hidden md:block md:col-span-1"></div>

            <div className="md:col-span-6">
              <h2
                id="about-title"
                data-animate
                className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center md:text-left ${getAnimationClass(
                  "about-title"
                )}`}
                style={{ transitionDelay: "0ms" }}
              >
                Tentang Desa Semandang Hulu
              </h2>
              <p
                id="stats-subtitle"
                data-animate
                className={`text-gray-700 leading-relaxed text-center md:text-left ${getAnimationClass(
                  "stats-subtitle"
                )}`}
                style={{ transitionDelay: "200ms" }}
              >
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
        <section
          id="highlights"
          className="pb-20 pt-10 px-6 md:px-[100px] bg-white"
        >
          <h2
            id="highlight-title"
            data-animate
            className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center ${getAnimationClass(
              "highlight-title"
            )}`}
            style={{ transitionDelay: "0ms" }}
          >
            Kenali Desa Semandang Hulu Lebih Dekat
          </h2>

          <p
            id="highlight-subtitle"
            data-animate
            className={`text-center text-[#0a160d] mb-10 ${getAnimationClass(
              "highlight-subtitle"
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            Berbagai sisi kehidupan desa yang membentuk identitas dan potensi
            kami.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <HighlightCard
              icon={<FaMapMarkerAlt />}
              title="Lokasi"
              text="Berada di Kabupaten Ketapang dengan akses yang semakin terbuka berkat pembangunan infrastruktur desa."
              id="highlight-lokasi"
              dataAnimate={true}
              animationDelay="400ms"
              getAnimationClass={getAnimationClass}
            />
            <HighlightCard
              icon={<FaUsers />}
              title="Komunitas"
              text="Warga hidup dengan semangat gotong royong, menjunjung nilai kebersamaan dan tradisi lokal yang kuat."
              id="highlight-komunitas"
              dataAnimate={true}
              animationDelay="600ms"
              getAnimationClass={getAnimationClass}
            />
            <HighlightCard
              icon={<FaLeaf />}
              title="Alam"
              text="Dikelilingi hutan tropis, sungai kecil, dan perkebunan sawit yang menjadi tumpuan mata pencarian."
              id="highlight-alam"
              dataAnimate={true}
              animationDelay="800ms"
              getAnimationClass={getAnimationClass}
            />
            <HighlightCard
              icon={<BsStars />}
              title="Potensi"
              text="Perkebunan kelapa sawit, hasil pertanian, dan produk lokal menjadi sumber daya unggulan masyarakat."
              id="highlight-potensi"
              dataAnimate={true}
              animationDelay="1000ms"
              getAnimationClass={getAnimationClass}
            />
          </div>
        </section>

        {/* Statistik Section */}
        <section
          id="stats"
          className="relative bg-cover bg-center text-white flex flex-col justify-center items-center text-center overflow-hidden "
        >
          <div
            className="absolute inset-0 z-0 will-change-transform top-[-235%] h-[150%] md:top-[-200%] md:h-[200%]"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
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
          <div className="relative bg-[#0a160d]/35 z-10 py-20 px-6 h-full w-full flex items-center justify-center text-center text-white">
            <div
              id="stats-header"
              data-animate
              className={`w-full h-full ${getAnimationClass("stats-header")}`}
              style={{ transitionDelay: "0ms" }}
            >
              <h2 className="text-2xl font-semibold text-center mb-2">
                Semandang Hulu Dalam Angka
              </h2>
              <p className="text-center mb-10">
                Statistik utama Desa Semandang Hulu.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center max-w-4xl mx-auto text-white">
                {[
                  { number: "1.842", label: "Penduduk" },
                  { number: "529", label: "Keluarga" },
                  { number: "11.500 ha", label: "Luas wilayah" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    id={`stats-card-${index}`}
                    className={`flex-1 p-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-md ${getAnimationClass(
                      `stats-card-${index}`
                    )}`}
                    data-animate
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="text-2xl md:text-3xl font-semibold mb-2 text-white text-center">
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
        <section className="py-15 px-6 md:px-[100px] bg-white">
          <h2
            id="peta-title"
            data-animate
            className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center ${getAnimationClass(
              "peta-title"
            )}`}
            style={{ transitionDelay: "0ms" }}
          >
            Peta Desa Semandang Hulu
          </h2>

          <p
            id="peta-subtitle"
            data-animate
            className={`text-center text-[#0a160d] mb-10 ${getAnimationClass(
              "peta-subtitle"
            )}`}
            style={{ transitionDelay: "100ms" }}
          >
            Lokasi geografis Desa Semandang Hulu dan batas-batas wilayahnya.
          </p>
          <PetaDesaSection getAnimationClass={getAnimationClass} />
        </section>

        {/* Warta Desa */}
        <section id="warta-desa" className="py-20 px-6 md:px-[100px] bg-white">
          <h2
            id="warta-title"
            data-animate
            className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center ${getAnimationClass(
              "warta-title"
            )}`}
            style={{ transitionDelay: "0ms" }}
          >
            Warta Desa
          </h2>
          <p
            id="warta-subtitle"
            data-animate
            className={`text-center text-[#0a160d] mb-10 ${getAnimationClass(
              "warta-subtitle"
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            Informasi terbaru seputar kegiatan, pengumuman, dan kehidupan warga
            Semandang Hulu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {isLoading ? (
              <p className="col-span-3 text-center text-gray-600">
                Memuat berita...
              </p>
            ) : berita.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">
                Belum ada berita untuk saat ini.
              </p>
            ) : (
              berita.map((item, idx) => (
                <div
                  key={item.id || idx}
                  id={`warta-card-${idx}`}
                  data-animate
                  className={`bg-white rounded shadow-md ${getAnimationClass(
                    `warta-card-${idx}`
                  )}`}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <img
                    src={item.header_img || "/placeholder.jpg"}
                    alt={item.title}
                    className="max-h-60 w-full object-cover"
                  />
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-1 text-[#0a160d]">
                      {formatTanggal(item.date)}
                    </p>
                    <h3 className="font-semibold text-lg mb-2 text-[#0a160d]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#0a160d]">
                      {item.content?.slice(0, 100)}...
                    </p>
                    <Link href={`/warta/${item.id}`}>
                      <button className="mt-2 text-[#97a202] text-sm font-semibold cursor-pointer hover:underline transition-all duration-800 ease-out">
                        Baca Selengkapnya →
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          {berita.length >= 4 && (
            <div
              id="warta-button"
              data-animate
              className={`text-center mt-8 ${getAnimationClass(
                "warta-button"
              )}`}
              style={{ transitionDelay: "400ms" }}
            >
              <button className="relative px-6 py-2 border-2 border-[#3F552F] hover:border-[#97A202] text-[#3F552F] rounded overflow-hidden group cursor-pointer">
                <span className="absolute inset-0 w-0 bg-[#97A202] transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Lihat Berita Lainnya
                </span>
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
