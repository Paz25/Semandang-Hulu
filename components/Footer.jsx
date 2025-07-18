"use client";

import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil Desa", path: "/profil" },
    { label: "Galeri", path: "/galeri" },
    { label: "Warta Desa", path: "/warta" },
    { label: "Download Area", path: "/download" },
  ];

  return (
    <>
      <footer
        id="footer-section"
        data-animate
        className={`bg-[#3F552F] text-white py-10 px-6 md:px-20 grid md:grid-cols-3 gap-6 text-sm`}
      >
        <div className="flex flex-col gap-3">
          <img
            src="images/logo/logo_semandang.png"
            alt=""
            className="w-20 aspect-auto"
          />
          <h4 className="font-semibold text-xl">Desa Semandang Hulu</h4>
          <p className="text-sm">
            Desa Semandang Hulu, Kecamatan Simpang Hulu, Kabupaten Ketapang,
            Provinsi Kalimantan Barat, 78850
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-lg">Navigasi Cepat</h4>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden cursor-pointer flex items-center h-full"
              onClick={() => router.push(item.path)}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:font-semibold transition-all duration-300 ease-in-out">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-lg">Informasi Kontak</h4>
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <p>(+62) 812-3456-7890</p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <p>semandang.hulu@ketapang.go.id</p>
          </div>
        </div>
      </footer>
      <div className="md:col-span-3 flex flex-col md:flex-row py-4 px-10 justify-between text-center md:text-left items-center text-gray-400 text-xs md:text-sm bg-black">
        <p>© 2025 Desa Semandang Hulu. All rights reserved.</p>
        <p className="md:mt-0">
          Dikembangkan oleh <strong>KKN 87 Kelompok 89 UAJY</strong>
        </p>
      </div>
    </>
  );
}
