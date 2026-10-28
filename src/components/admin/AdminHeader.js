"use client";

import { usePathname } from "next/navigation";
import { useAdminSettings, useSession } from "@/lib/hooks";

const titles = [
  ["/admin/berita/tambah", "Tambah Berita"],
  ["/admin/berita/edit", "Edit Berita"],
  ["/admin/berita", "Kelola Berita"],
  ["/admin/profil", "Profil Sekolah"],
  ["/admin/pengaturan", "Pengaturan"],
  ["/admin", "Dashboard"],
];

export default function AdminHeader({ onMenu, onLogout }) {
  const pathname = usePathname();
  const { session } = useSession();
  const settings = useAdminSettings();
  const title = titles.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? "Admin";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Buka menu admin"
          className="rounded-lg border border-slate-300 p-2 text-slate-700 lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-900">{settings.displayName}</p>
          <p className="text-xs text-slate-500">{session?.email}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white" aria-hidden="true">
          {settings.displayName.charAt(0).toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
