"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useUIStore } from "@/lib/stores/ui.store";

const navItems = [
  { label: "Inicio", href: "/dashboard" },
  { label: "Check-in", href: "/dashboard/checkin" },
  { label: "Progreso", href: "/dashboard/progress" },
  { label: "Perfil", href: "/dashboard/profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-56" : "w-16"
        } transition-all duration-300 border-r border-gray-200 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          {sidebarOpen && <span className="font-semibold text-sm">HabitForge</span>}
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600 text-lg">
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
              }`}>
              {sidebarOpen ? item.label : item.label[0]}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <UserButton />
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
