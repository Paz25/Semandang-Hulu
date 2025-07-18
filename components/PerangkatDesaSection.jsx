import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const perangkatDesa = [
  {
    nama: "Ani Anus Santoso",
    jabatan: "Kepala Desa",
  },
  {
    nama: "Markus Edi Kusnadi",
    jabatan: "Sekretaris Desa",
  },
  {
    nama: "Ilmanus Novo Primanto, S. Ak.",
    jabatan: "Kepala Urusan Keuangan",
  },
  {
    nama: "Marta Listia Nona",
    jabatan: "Kepala Urusan Tata Usaha & Umum",
  },
];

const fallbackImage = "/images/perangkat/empty-headshot.jpg";

const PerangkatDesaSection = ({ getAnimationClass }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="flex md:grid md:grid-cols-4 gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide"
      >
        {perangkatDesa.map((item, idx) => (
          <div
            key={idx}
            id={`perangkat-card-${idx}`}
            data-animate
            className={`
                bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0
                md:flex-shrink md:w-auto
                flex flex-col items-center justify-between
                transition-all duration-700 ease-in-out hover:scale-[1.02]
                w-64 md:w-full
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
                ${
                  getAnimationClass
                    ? getAnimationClass(`perangkat-card-${idx}`)
                    : ""
                }
                `}
            style={{ transitionDelay: `${idx * 200}ms` }}
          >
            <div className="w-full h-80 relative">
              <Image
                src={item.foto?.trim() ? item.foto : fallbackImage}
                alt={item.nama}
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-[#3F552F] w-full py-4 px-2 text-center text-white flex flex-col justify-center min-h-[120px]">
              <h3
                className="font-bold text-lg uppercase leading-snug overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.nama}
              </h3>
              <p
                className="text-sm mt-1 leading-snug overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.jabatan}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        id="perangkat-button"
        data-animate
        className={`text-center mt-8 ${
          getAnimationClass ? getAnimationClass(`perangkat-button`) : ""
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <button className="relative px-6 py-2 border-2 border-[#3F552F] hover:border-[#97A202] text-[#3F552F] rounded overflow-hidden group cursor-pointer">
          <span className="absolute inset-0 w-0 bg-[#97A202] transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Lihat Lebih Lengkap
          </span>
        </button>
      </div>
    </>
  );
};

export default PerangkatDesaSection;
