"use client";

import "./AdminSidebar.css";
import LogoutButton from "@/components/AdminSidebar/LogoutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Newspaper, UsersRound, Menu, Images } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Warta", path: "/admin/warta", icon: Newspaper },
  { name: "Pengguna", path: "/admin/users", icon: UsersRound },
  { name: "Galeri", path: "/admin/gallery", icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#3F552F] p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 left-0 h-screen w-64 z-40 py-6 transition-transform transform bg-gradient-to-br from-[#3F552F] to-[#97a202] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-white text-xl text-center font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)} className="flex items-center">
                <div
                  className={`flex items-center gap-3 ml-6 px-4 py-3 w-full rounded-r-full text-sm ${
                    isActive
                      ? "sidebar-highlight font-semibold text-[#3F552F]"
                      : "text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#3F552F]" : "text-white"}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
          <LogoutButton />
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}