"use client";

import { useEffect, useRef, useState } from "react";
import { PiPlantFill, PiTreePalmFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";

import Image from "next/image";
import PetaDesaSection from "@/components/PetaDesaSection";
import PerangkatDesaSection from "@/components/PerangkatDesaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilDesa() {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [sectionStates, setSectionStates] = useState({});
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [heroTextParallaxEnabled, setHeroTextParallaxEnabled] = useState(true);
  const observerRef = useRef(null);

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
            setVisibleElements((prev) => new Set([...prev, sectionId]));
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

  const handleHeroTextTransitionEnd = () => {
    setHeroTextParallaxEnabled(false);
  };

  const isVisible = (id) => visibleElements.has(id);
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
          id="profil-hero"
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
              alt="Profil Desa"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative bg-[#0a160d]/35 z-10 h-full w-full flex items-center justify-center text-center text-white px-6">
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
                Profil Desa Semandang Hulu
              </h1>
              <p className="text-md md:text-xl">
                Mengenal Sejarah, Visi, dan Potensi Desa Kami
              </p>
            </div>
          </div>
        </section>

        {/* Sejarah */}
        <section
          id="sejarah"
          data-animate
          className="py-20 px-6 md:px-[100px] flex flex-col items-center bg-white"
        >
          <h2
            id="sejarah-title"
            data-animate
            className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center ${getAnimationClass(
              "sejarah-title"
            )}`}
            style={{ transitionDelay: "0ms" }}
          >
            Sejarah Singkat
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-12">
            <div
              id="sejarah-subtitle"
              data-animate
              className={`md:col-span-10 md:col-start-2 ${getAnimationClass(
                "sejarah-subtitle"
              )}`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-center text-[#0a160d] leading-relaxed">
                Desa Semandang Hulu berdiri secara administratif sejak tahun
                1990. Nama desa ini berasal dari aliran Sungai Semandang yang
                menjadi pusat kehidupan masyarakat pada masa itu.
                <br />
                <br />
                Desa Semandang Hulu terdiri dari 14 RT dan 3 dusun: Dusun
                Kesiau, Dusun Pateh Ada, dan Dusun Muara Kasai. Dalam
                perjalanannya, desa ini telah mengalami banyak perkembangan baik
                dari sisi sosial maupun ekonomi.
              </p>
            </div>
          </div>
        </section>

        {/* Letak Geografis */}
        <section
          id="letak"
          className={`pb-20 pt-10 px-6 md:px-[100px] bg-white`}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center`}
          >
            {/* Kolom Kiri: Deskripsi */}
            <div
              id="lokasi-desc"
              data-animate
              className={`md:col-span-6 ${getAnimationClass("lokasi-desc")}`}
              style={{ transitionDelay: "0ms" }}
            >
              <h2
                id="lokasi-title"
                data-animate
                className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center md:text-left ${getAnimationClass(
                  "lokasi-title"
                )}`}
                style={{ transitionDelay: "0ms" }}
              >
                Letak Geografis
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Desa Semandang Hulu terletak di Kecamatan Simpang Hulu,
                Kabupaten Ketapang, Kalimantan Barat. Berbatasan dengan:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                <li>Sebelah Utara: Desa Kualan Hulu</li>
                <li>Sebelah Selatan: Desa Semandang Kiri</li>
                <li>Sebelah Timur: Desa Kenanga</li>
                <li>Sebelah Barat: Desa Balai Pinang Hulu</li>
              </ul>
            </div>

            <div
              id="lokasi-map"
              data-animate
              className={`md:col-span-6 ${getAnimationClass("lokasi-map")}`}
              style={{
                transitionDelay: "200ms",
                maxHeight: "400px",
                overflow: "hidden",
              }}
            >
              <PetaDesaSection getAnimationClass={getAnimationClass} />
            </div>
          </div>
        </section>

        <section
          id="visi-misi"
          className="relative bg-cover bg-center text-white flex flex-col justify-center items-center text-center overflow-hidden"
        >
          {/* Parallax Background */}
          <div
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              top: "-200%",
              height: "200%",
            }}
          >
            <Image
              src="/images/bg3.png"
              alt="Background Visi Misi"
              width={1920}
              height={1080}
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay & Content */}
          <div className="relative bg-[#0a160d]/35 z-10 py-20 px-6 h-full w-full flex items-center justify-center text-center text-white">
            <div
              id="visi-misi-content"
              data-animate
              className={`max-w-3xl mx-auto p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-md ${getAnimationClass(
                "visi-misi-content"
              )}`}
              style={{ transitionDelay: "0ms" }}
            >
              <h2
                id="visi-title"
                data-animate
                className={`text-2xl md:text-3xl font-semibold mb-6 text-white ${getAnimationClass(
                  "visi-title"
                )}`}
                style={{ transitionDelay: "0ms" }}
              >
                Visi & Misi
              </h2>

              <h3 className="font-bold text-white mb-2">Visi:</h3>
              <p
                id="visi-text"
                data-animate
                className={`text-gray-200 leading-relaxed mb-4 italic ${getAnimationClass(
                  "visi-text"
                )}`}
                style={{ transitionDelay: "200ms" }}
              >
                "Terwujudnya Desa Semandang Hulu yang Mandiri, Sejahtera, dan
                Berbudaya."
              </p>

              <h3 className="font-bold text-white mb-2">Misi:</h3>
              <ul
                id="misi-list"
                data-animate
                className={`list-disc list-inside text-gray-200 leading-relaxed text-left ${getAnimationClass(
                  "misi-list"
                )}`}
                style={{ transitionDelay: "400ms" }}
              >
                <li>Meningkatkan kualitas sumber daya manusia desa</li>
                <li>Mengembangkan potensi lokal secara berkelanjutan</li>
                <li>
                  Meningkatkan pelayanan publik yang transparan dan akuntabel
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="potensi"
          data-animate
          className="py-20 px-6 md:px-[100px] bg-white"
        >
          <h2
            id="potensi-title"
            data-animate
            className={`text-2xl font-semibold mb-2 text-[#0a160d] text-center ${getAnimationClass(
              "potensi-title"
            )}`}
            style={{ transitionDelay: "0ms" }}
          >
            Potensi Desa
          </h2>

          <p
            id="potensi-subtitle"
            data-animate
            className={`text-center text-[#0a160d] mb-10 ${getAnimationClass(
              "potensi-subtitle"
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            Potensi lokal yang menjadi penggerak utama ekonomi masyarakat
            Semandang Hulu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PiTreePalmFill />,
                title: "Perkebunan Kelapa Sawit",
                text: "Komoditas utama yang menjadi tumpuan ekonomi masyarakat.",
                id: "potensi-sawit",
                delay: "400ms",
              },
              {
                icon: <PiPlantFill />,
                title: "Pertanian Padi Ladang",
                text: "Sumber pangan lokal yang diolah secara tradisional dan lestari.",
                id: "potensi-padi",
                delay: "600ms",
              },
              {
                icon: <BsStars />,
                title: "Hasil Hutan Non-Kayu",
                text: "Seperti rotan, madu hutan, dan getah menjadi sumber pendapatan tambahan.",
                id: "potensi-hutan",
                delay: "800ms",
              },
            ].map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-animate
                className={`p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-md hover:shadow-lg transition-all ${getAnimationClass(
                  item.id
                )}`}
                style={{ transitionDelay: item.delay }}
              >
                <div className="text-4xl mb-4 text-[#97A202] flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#0a160d] text-center">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Struktur Pemerintahan */}
        <section
          id="perangkat-desa"
          data-animate
          className="py-20 px-6 md:px-[100px] bg-white"
        >
          <h2
            id="perangkat-title"
            data-animate
            className={`text-2xl font-semibold mb-10 text-[#0a160d] text-center ${
              getAnimationClass ? getAnimationClass("perangkat-title") : ""
            }`}
          >
            Perangkat Desa
          </h2>
          <PerangkatDesaSection getAnimationClass={getAnimationClass} />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
