"use client";

import "./AdminSidebar.css";
import { usePathname } from "next/navigation";
import { LayoutDashboard, HeartHandshake } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Warta", path: "/admin/warta", icon: HeartHandshake },
];
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar flex-row fixed w-64 h-screen z-50">
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.name} href={item.path} className="flex justify-end">
              <div
                className={`flex items-center gap-2 px-4 py-3 w-100 ml-6 text-sm ${
                  pathname === item.path
                    ? "sidebar-highlight font-semibold bg-white text-indigo-800"
                    : "text-white hover:font-semibold hover:border-b-2 hover:border-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <h1 className="z-10">{item.name}</h1>
              </div>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
