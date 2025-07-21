"use client";

import "./AdminSidebar.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Newspaper, UsersRound } from "lucide-react";
const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Warta", path: "/admin/warta", icon: Newspaper },
  { name: "Pengguna", path: "/admin/users", icon: UsersRound },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar fixed w-64 h-screen z-50 py-6">
      <h1 className="text-white text-xl text-center font-bold mb-6">Admin Panel</h1>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.name} href={item.path} className="flex items-center">
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
      </nav>
    </aside>
  );
}
