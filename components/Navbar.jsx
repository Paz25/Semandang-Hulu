"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil Desa", path: "/profil" },
    { label: "Galeri", path: "/galeri" },
    { label: "Warta Desa", path: "/warta" },
    { label: "Download Area", path: "/download" },
  ];

  const handleNavClick = (path) => {
    router.push(path);
    setIsOpen(false); // close sidebar after click
  };

  return (
    <>
      {/* Navbar Top */}
      <nav className="fixed z-50 w-full bg-[#0A160D] text-white shadow-md">
        <div className="flex justify-between items-center px-6 md:px-[100px] py-4 xs:max-w-75">
          {/* Logo */}
          <div
            className="flex items-center gap-2 font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              src="/images/logo/logo_semandang.png"
              alt="Logo"
              className="w-10"
            />
            <p className="text-md md:text-lg">Desa Semandang Hulu</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center text-base">
            {menuItems.map((item, index) => (
              <p
                key={index}
                className="cursor-pointer hover:text-green-400"
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* Hamburger Icon */}
          <button
            className="mt-1 flex md:hidden text-white text-2xl fixed top-5 right-6 z-[60] transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="transform rotate-180 duration-300" />
            ) : (
              <HiOutlineMenu className="duration-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Menu (slide in from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0A160D] text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6 space-y-7">
          {menuItems.map((item, index) => (
            <p
              key={index}
              className="cursor-pointer hover:text-[#97a202] text-md"
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
