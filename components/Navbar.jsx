"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil Desa", path: "/profil" },
    { label: "Galeri", path: "/galeri" },
    { label: "Warta Desa", path: "/warta" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();
        setIsLoggedIn(data.authenticated);
      } catch (err) {
        console.error("Auth check failed", err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleNavClick = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <nav className="fixed z-50 w-full bg-[#3F552F] text-white shadow-md">
        <div className="flex justify-between items-center px-6 md:px-[100px] xs:max-w-75 items-stretch">
          {/* Logo */}
          <div
            className="flex items-center gap-2 font-semibold cursor-pointer my-2"
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
          <div className="hidden lg:flex gap-10 items-center text-base">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer flex items-center px-2 h-full"
                onClick={() => handleNavClick(item.path)}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0A160D]">
                  {item.label}
                </span>
                <span
                  className="absolute inset-0 bg-white opacity-0 -translate-x-full
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300 ease-in-out"
                ></span>
              </div>
            ))}

            {/* Tambahan Login Admin */}
            <div
              className="relative group overflow-hidden cursor-pointer flex items-center px-2 h-full"
              onClick={() => handleNavClick(isLoggedIn ? "/admin" : "/login")}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0A160D]">
                {isLoggedIn ? "Dashboard" : "Login Admin"}
              </span>
              <span
                className="absolute inset-0 bg-white opacity-0 -translate-x-full
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-300 ease-in-out"
              ></span>
            </div>
          </div>

          {/* Hamburger Icon */}
          <button
            className="mt-1 flex justify-center items-center lg:hidden text-white text-2xl top-5 right-6 z-[60] transition-transform duration-300"
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

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0A160D] text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6 space-y-7">
          {menuItems.map((item, index) => (
            <p
              key={index}
              className="cursor-pointer hover:text-[#97A202] text-md"
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </p>
          ))}

          {/* Tambahan Login Admin di mobile */}
          <p
            className="cursor-pointer hover:text-[#97A202] text-md pt-4 border-t border-white/20"
            onClick={() => handleNavClick(isLoggedIn ? "/admin" : "/login")}
          >
            {isLoggedIn ? "Dashboard" : "Login Admin"}
          </p>
        </div>
      </div>
    </>
  );
}
