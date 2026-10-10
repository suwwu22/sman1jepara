"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Logo SMAN 1 Jepara" width={40} height={40} className="rounded-full" />
          <span className="text-lg font-bold text-blue-900">SMAN 1 Jepara</span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-700 text-white"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          className="rounded-lg border border-blue-200 p-2 text-blue-800 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-blue-100 bg-white px-4 py-3 md:hidden">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive(item.href) ? "bg-blue-700 text-white" : "text-slate-700 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
