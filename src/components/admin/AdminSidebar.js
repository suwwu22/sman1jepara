"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/berita", label: "Kelola Berita" },
  { href: "/admin/profil", label: "Profil Sekolah" },
  { href: "/admin/pengaturan", label: "Pengaturan" },
];

export default function AdminSidebar({ open, onClose, onLogout }) {
  const pathname = usePathname();
  const isActive = (href) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 transform flex-col bg-blue-950 text-blue-100 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-blue-900 px-6 py-5">
          <p className="text-lg font-bold text-white">SMAN 1 Jepara</p>
          <p className="text-xs text-blue-300">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Menu admin">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                isActive(item.href) ? "bg-blue-700 text-white" : "hover:bg-blue-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={onClose}
            className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-blue-300 transition duration-200 hover:bg-blue-900"
          >
            Lihat Website
          </Link>
        </nav>

        <div className="border-t border-blue-900 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition duration-200 hover:bg-blue-900"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
